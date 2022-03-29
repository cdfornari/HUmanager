import { useSnackbar } from 'notistack';
import { FC, useEffect, useReducer } from 'react';
import { entriesApi } from '../../api';
import { Entry } from '../../interfaces';
import { EntriesContext,entriesReducer } from './';

export interface entriesState {
    entries: Entry[];
}

const initialState: entriesState = {
    entries: []
}

export const EntriesProvider: FC = ({children}) => {
    const {enqueueSnackbar} = useSnackbar();
    const [state,dispatch] = useReducer(entriesReducer, initialState);
    const getEntries = async () => {
        const {data} = await entriesApi.get<Entry[]>('/entries');
        dispatch({type: 'ENTRIES - Load', payload: data});
    }
    useEffect(() => {
        getEntries();
    }, [])
    const addNewEntry = async (description: string) => {
        try {
            const { data } = await entriesApi.post<Entry>('/entries', {description});
            dispatch({
                type: 'ENTRIES - Add',
                payload: data
            });
            enqueueSnackbar('Entry added', {
                variant: 'success',
                autoHideDuration: 2000,
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                }
            });
        } catch (error) {
            console.log(error);
            enqueueSnackbar('Error adding new entry', {
                variant: 'error',
                autoHideDuration: 2000,
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                }
            });
        }
    }
    const updateEntry = async ({_id, description, status}: Entry, showSnackbar = false) => {
        try {
            const { data } = await entriesApi.put<Entry>(`/entries/${_id}`, {description, status})
            dispatch({
                type: 'ENTRIES - Update',
                payload: data
            });
            showSnackbar &&
            enqueueSnackbar('Entry updated', {
                variant: 'success',
                autoHideDuration: 2000,
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                }
            });
        } catch (error) {
            console.log(error);
            enqueueSnackbar('Error updating entry', {
                variant: 'error',
                autoHideDuration: 2000,
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                }
            });
        }
    }
    const deleteEntry = async (id: string) => {
        try {
            await entriesApi.delete(`/entries/${id}`);
            dispatch({
                type: 'ENTRIES - Delete',
                payload: id
            });
            enqueueSnackbar('Entry deleted', {
                variant: 'success',
                autoHideDuration: 2000,
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                }
            });
        } catch (error) {
            console.log(error);
            enqueueSnackbar('Error deleting entry', {
                variant: 'error',
                autoHideDuration: 2000,
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                }
            });
        }
    }
    return (
        <EntriesContext.Provider value={{
            ...state,
            addNewEntry,
            updateEntry,
            deleteEntry
        }}>
            {children}
        </EntriesContext.Provider>
    )
};