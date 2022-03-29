import mongoose, {Model,Schema} from 'mongoose';
import { Entry } from '../interfaces';

export interface iEntry extends Entry{
}

const entrySchema = new Schema({
    description: {type: String, required: true},
    createdAt: {type: Number, required: true},
    status: {
        type: String, 
        default: 'pending',
        enum: {
            values: ['pending', 'development', 'testing', 'deployed'],
            message: '{VALUE} is not a valid status'
        }
    }
});

const EntryModel: Model<iEntry> = mongoose.models.Entry || mongoose.model('Entry', entrySchema);

export default EntryModel;