export type EntryStatus = 'pending' | 'development' | 'testing' | 'deployed';
export interface Entry {
    _id: string;
    description: string;
    createdAt: number;
    status: EntryStatus;
}