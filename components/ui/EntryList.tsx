import { useContext, useMemo } from 'react';
import { List, Paper } from '@mui/material'
import { EntriesContext } from '../../context/entries';
import { EntryStatus } from '../../interfaces';
import { UIContext } from '../../context/ui';
import { EntryCard } from './';
import styles from './EntryList.module.css';

interface Props{
    status: EntryStatus;
}

export const EntryList = ({status}: Props) => {
    const {entries,updateEntry} = useContext(EntriesContext);
    const {isDragging} = useContext(UIContext)
    const filteredEntries = useMemo(() => entries.filter(entry => entry.status === status), [entries]);

    const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
        const id = e.dataTransfer.getData('text');
        if(id) {
            const entry = entries.find(entry => entry._id === id);
            if(entry) {
                updateEntry({...entry, status},false);
            }
        }
    }
    const allowDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    }

    return (
        <div 
            onDrop={onDrop} 
            onDragOver={allowDrop}
            className={isDragging ? styles.dragging : ''}
        >
            <Paper sx={{height: 'calc(100vh - 160px)', overflow: 'scroll', backgroundColor: 'transparent', padding: '1px 5px'}}>
                <List sx={{opacity: isDragging ? 0.2 : 1, transition: 'all .3s'}}>
                    {
                        filteredEntries.map(entry => (
                            <EntryCard key={entry._id} entry={entry} />
                        ))
                    }
                </List>
            </Paper>
        </div>
    )
}