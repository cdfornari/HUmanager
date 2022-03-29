import { useContext } from 'react';
import { Drawer, List, Typography, Box, ListItem, ListItemIcon, ListItemText, Divider } from '@mui/material'
import InboxRoundedIcon from '@mui/icons-material/InboxRounded';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import { UIContext } from '../../context/ui';

const menuItems: string[] = ['Inbox','Starred','Send Email','Draft']

export const Sidebar = () => {
    const {sidebarOpen,toggleSidebar} = useContext(UIContext);
    return (
        <Drawer
            anchor='left'
            open={sidebarOpen}
            onClose={toggleSidebar}
        >
            <Box sx={{width: 250}}>
                <Box sx={{padding: '5px 10px'}}>
                    <Typography variant='h4'>Menu</Typography>
                </Box>
                <List>
                    {
                        menuItems.map((text,i) => (
                            <ListItem button key={text}>
                                <ListItemIcon>
                                    {i % 2 ? <InboxRoundedIcon/> : <EmailRoundedIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text}/>
                            </ListItem>
                        ))
                    }
                </List>
                <Divider />
                <List>
                    {
                        menuItems.map((text,i) => (
                            <ListItem button key={text}>
                                <ListItemIcon>
                                    {i % 2 ? <InboxRoundedIcon/> : <EmailRoundedIcon />}
                                </ListItemIcon>
                                <ListItemText primary={text}/>
                            </ListItem>
                        ))
                    }
                </List>
            </Box>
        </Drawer>
    )
}