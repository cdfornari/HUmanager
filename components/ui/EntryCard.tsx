import { useContext } from 'react'
import { Card, CardActions, CardContent, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'
import { Entry } from '../../interfaces'
import { UIContext } from '../../context/ui';
import { useRouter } from 'next/router';
import { formatDate } from '../../utils/date';

interface Props {
    entry: Entry
}

export const EntryCard = ({entry}: Props) => {
    const {toggleDrag} = useContext(UIContext);
    const router = useRouter();
    const onDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        e.dataTransfer.setData('text', entry._id);
        toggleDrag();
    }
    const onDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
       toggleDrag();
    }
    const onClick = () => {
        router.push(`/entries/${entry._id}`);
    }
    return (
        <Card
            sx={{transition: 'ease-in .2s background-color',marginBottom: 1, ":hover": {cursor: "grab", backgroundColor: grey[900]}}}
            draggable
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onClick={onClick}
        >
            <CardContent>
                <Typography sx={{whiteSpace: 'pre-line'}}>{entry.description}</Typography>
            </CardContent>
            <CardActions sx={{display: 'flex', justifyContent: 'end', paddingRight: 2}}>
                <Typography variant='body2'>{formatDate(new Date(entry.createdAt))}</Typography>
            </CardActions>
        </Card>
    )
}