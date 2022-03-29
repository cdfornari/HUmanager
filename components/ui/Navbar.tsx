import { useContext } from 'react';
import { AppBar, IconButton, Link, Toolbar, Typography } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';
import { UIContext } from '../../context/ui';
import { DeleteSharp } from '@mui/icons-material';
import { EntriesContext } from '../../context/entries';
import styles from './EntryList.module.css';

export const Navbar = () => {
    const {toggleSidebar,isDragging} = useContext(UIContext);
    const {deleteEntry} = useContext(EntriesContext);
    const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
        const id = e.dataTransfer.getData('text');
        if(id) {
            deleteEntry(id);
        }
    }
    const allowDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    }
    return (
        <AppBar position='sticky'>
            <Toolbar>
                <IconButton
                    size='large'
                    edge='start'
                    onClick={toggleSidebar}
                >
                    <MenuIcon />
                </IconButton>
                <Link href="/" underline='none' color='white'>
                    <Typography variant='h6'>
                        HU Manager
                    </Typography>
                </Link>
                <div 
                    onDrop={onDrop} 
                    onDragOver={allowDrop}
                >
                    <IconButton sx={{
                            position: 'fixed',
                            top: 15,
                            right: 45,
                            backgroundColor: 'error.dark'
                        }}
                        className={isDragging ? styles.dragging : ''}
                    >
                        <DeleteSharp />
                    </IconButton>
                </div>
            </Toolbar>
        </AppBar>
    )
}