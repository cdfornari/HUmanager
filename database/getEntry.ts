import mongoose from 'mongoose';
import { db } from '.';
import { Entry, iEntry } from '../models';

export const getEntryById = async (id: string): Promise<iEntry | null> => {
    if(!mongoose.isValidObjectId(id)) return null;
    await db.connectToMongo();
    const entry = await Entry.findById(id).lean();
    await db.disconnectFromMongo();
    return JSON.parse(JSON.stringify(entry));
}