import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { Entry, iEntry } from '../../../models';

type Data = 
|{ message: string }
| iEntry[] 
| iEntry 

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'GET':
            return getEntries(res);
        case 'POST':
            return createEntry(req, res);
        default:
            return res.status(400).json({ message: 'Not found' })
    }
}

const getEntries = async (res: NextApiResponse<Data>) => {
    await db.connectToMongo();
    const entries = await Entry.find().sort({ createdAt: 'ascending' });
    await db.disconnectFromMongo();
    return res.status(200).json(entries);
}

const createEntry = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    const { description } = req.body;
    if (!description) return res.status(400).json({ message: 'Description is required' });
    const newEntry = new Entry({
        description,
        createdAt: Date.now(),
    })
    try {
        await db.connectToMongo();
        await newEntry.save();
        await db.disconnectFromMongo();
        return res.status(201).json(newEntry);
    } catch (error) {
        await db.disconnectFromMongo();
        console.log(error);
        return res.status(500).json({ message: 'Something went wrong' });
    }
}