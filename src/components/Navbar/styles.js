// MyStyledButton.js

import { styled } from '@mui/system';
import { Drawer, IconButton,  Toolbar } from '@mui/material';
const drawerWidth = 240;
export const ToolbarStyles = styled(Toolbar)(({ theme }) =>({
   height: '80px',
   display: 'flex',
   justifyContent: 'space-between',
   marginLeft: '240px',
   [theme.breakpoints.down('sm')]: {
      marginLeft: "0",
      flexWrap: 'wrap'
   }

}));
export const DrawerStyles = styled("nav")(({ theme }) => ({
   [theme.breakpoints.up('sm')]: {
     width: drawerWidth ,
     flexShrink: 0
   },
   '& .paper': {
     width: drawerWidth,
   },
 }));



export const ButtonStyles = styled(IconButton)(({ theme }) => ({
    marginRight: theme.spacing(2),
    
 }));
 


