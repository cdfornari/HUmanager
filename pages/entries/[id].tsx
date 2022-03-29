import { FC, useContext, useMemo, useState } from 'react';
import { GetServerSideProps } from 'next'
import mongoose from 'mongoose';
import { Button, capitalize, Card, CardActions, CardContent, CardHeader, FormControl, FormControlLabel, FormLabel, Grid, IconButton, Radio, RadioGroup, TextField } from '@mui/material';
import { DeleteSharp, SaveAltSharp } from '@mui/icons-material';
import { Layout } from '../../components/layouts/Layout';
import { Entry, EntryStatus } from '../../interfaces';
import { getEntryById } from '../../database/getEntry';
import { EntriesContext } from '../../context/entries/EntriesContext';
import { formatDate } from '../../utils/date';
import { useRouter } from 'next/router';

const validStatus: EntryStatus[] = ['pending', 'development', 'testing', 'deployed'];

interface Props {
    entry: Entry;
}

const EntryPage: FC<Props> = ({entry}) => {
    const router = useRouter();
    const {updateEntry,deleteEntry} = useContext(EntriesContext);
    const [description, setDescription] = useState(entry.description);
    const [status, setStatus] = useState<EntryStatus>(entry.status);
    const [touched, setTouched] = useState(false);
    const isError = useMemo(() => description.length === 0 && touched, [description, touched]);
    const onSave = () => {
        if (description.length === 0) return alert('Please enter a description');
        setTouched(false);
        updateEntry({
            ...entry,
            description,
            status
        },true)
    }
    const onDelete = () => {
        if (window.confirm('Are you sure you want to delete this entry?')) {
            deleteEntry(entry._id);
            router.replace('/');
        }
    }
    return (
        <Layout title='HU Page'>
            <Grid
                container
                justifyContent='center'
                sx={{marginTop: 2}}
            >
                <Grid item xs={12} sm={8} md={6}>
                    <Card>
                        <CardHeader
                            title={`HU: ${description}`}
                            subheader={formatDate(new Date(entry.createdAt))}
                        />
                        <CardContent>
                            <TextField 
                                sx={{marginTop: 2, marginBottom: 1}}
                                fullWidth
                                placeholder='Description'
                                label='New HU'
                                helperText={isError ? 'Please enter a description' : ''}
                                autoFocus
                                multiline
                                value={description}
                                onChange={({target}) => setDescription(target.value)}
                                onBlur={() => setTouched(true)}
                                error={isError}
                            />
                            <FormControl>
                                <FormLabel>Status</FormLabel>
                                <RadioGroup 
                                    row
                                    value={status}
                                    onChange={({target}) => setStatus(target.value as EntryStatus)}
                                >
                                    {
                                        validStatus.map(status => (
                                            <FormControlLabel 
                                                key={status}
                                                value={status}
                                                control={<Radio />}
                                                label={capitalize(status)}
                                            />
                                        ))
                                    }
                                </RadioGroup>
                            </FormControl>
                        </CardContent>
                        <CardActions>
                            <Button
                                startIcon={<SaveAltSharp />}
                                variant='contained'
                                fullWidth
                                onClick={onSave}
                                disabled={description.length === 0}
                            >
                                Save
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
            <IconButton sx={{
                    position: 'fixed',
                    bottom: 30,
                    right: 30,
                    backgroundColor: 'error.dark'
                }}
                onClick={onDelete}
            >
                <DeleteSharp />
            </IconButton>
        </Layout>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { id } = ctx.params as { id: string };
    if(!mongoose.isValidObjectId(id)){
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }
    const entry = await getEntryById(id);
    if(!entry){
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }
    return {
        props: {
            entry
        }
    }
}

export default EntryPage;