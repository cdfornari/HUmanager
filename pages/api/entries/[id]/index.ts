import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../../database';
import { Entry, iEntry } from '../../../../models';

type Data = 
|{ message: string }
| iEntry 

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch(req.method) {
        case 'GET':
            return getEntry(req, res);
        case 'PUT':
            return updateEntry(req,res);
        case 'DELETE':
            return deleteEntry(req,res);
        default:
            return res.status(405).json({message: 'Method not allowed'});
    }
}

const getEntry = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    const {id} = req.query;
    await db.connectToMongo();
    const entry = await Entry.findById(id);
    await db.disconnectFromMongo();
    if (!entry) {
        return res.status(404).json({message: 'Entry not found'});
    }
    return res.status(200).json(entry);
}

const updateEntry = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    const {id} = req.query;
    await db.connectToMongo();
    const entryToUpdate = await Entry.findById(id);
    if (!entryToUpdate) {
        await db.disconnectFromMongo();
        return res.status(404).json({message: 'Entry not found'});
    }
    const {
        description = entryToUpdate.description,
        status = entryToUpdate.status
    } = req.body;
    try {
        const updatedEntry = await Entry.findByIdAndUpdate(id, {description, status}, {new: true, runValidators: true});
        await db.disconnectFromMongo();
        return res.status(200).json(updatedEntry!);
    } catch (error: any) {
        console.log(error)
        await db.disconnectFromMongo();
        return res.status(400).json({message: error.errors.status.message});
    }
}

const deleteEntry = async(req: NextApiRequest, res: NextApiResponse<Data>) => {
    const {id} = req.query;
    await db.connectToMongo();
    const entryToDelete = await Entry.findById(id);
    if (!entryToDelete) {
        await db.disconnectFromMongo();
        return res.status(404).json({message: 'Entry not found'});
    }
    try {
        await entryToDelete.remove();
        await db.disconnectFromMongo();
        return res.status(200).json({message: 'Entry deleted'});
    } catch (error) {
        console.log(error)
        await db.disconnectFromMongo();
        return res.status(500).json({message: 'Internal server error'});
    }
}