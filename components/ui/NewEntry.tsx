import { useContext, useState } from 'react';
import { Box, Button, TextField } from '@mui/material'
import SaveSharpIcon from '@mui/icons-material/SaveSharp';
import AddCircleOutlineSharpIcon from '@mui/icons-material/AddCircleOutlineSharp';
import { EntriesContext } from '../../context/entries';
import { UIContext } from '../../context/ui';

export const NewEntry = () => {
    const {addNewEntry} = useContext(EntriesContext);
    const {newEntryOpen,toggleNewEntry} = useContext(UIContext);
    const [inputValue, setInputValue] = useState('');
    const [touched, setTouched] = useState(false);
    const onSave = () => {
        if(inputValue.length === 0) return alert('Please enter a description');
        toggleNewEntry();
        setTouched(false);
        setInputValue('');
        addNewEntry(inputValue);
    }
    const onCancel = () => {
        toggleNewEntry();
        setTouched(false);
        setInputValue('');
    }
  return (
    <Box sx={{marginBottom: 2, paddingX: 2 }}>

        {
            newEntryOpen ? (
                <>
                    <TextField 
                        fullWidth
                        sx={{marginBottom: 1, marginTop: 2}}
                        placeholder='Description'
                        autoFocus
                        multiline
                        label='New HU'
                        helperText='Enter your new HU here'
                        error={inputValue.length === 0 && touched}
                        value={inputValue}
                        onChange={({target}) => setInputValue(target.value)}
                        onBlur={() => setTouched(true)}
                    />
                    <Box display='flex' justifyContent='space-between'>
                        <Button
                            variant='text'
                            color='error'
                            onClick={onCancel}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant='outlined'
                            color='secondary'
                            endIcon={<SaveSharpIcon />}
                            onClick={onSave}
                        >
                            Save
                        </Button>
                    </Box>
                </>
            )
            :(
                <Button
                    startIcon={<AddCircleOutlineSharpIcon />}
                    fullWidth
                    variant='outlined'
                    onClick={() => toggleNewEntry()}
                >
                    Add new HU
                </Button>
            )
        }
    </Box>
  )
}