// MyStyledButton.js
import React from 'react'
import { styled } from '@mui/system';
import { Drawer, IconButton,  Toolbar } from '@mui/material';
import { useLocation } from 'react-router-dom';

const drawerWidth = 240;
export const ToolbarStyles = styled(Toolbar)(({ theme }) => {
   const { pathname } = useLocation();
   const isHomePage = pathname === '/';
 
   return {
     height: '80px',
     display: 'flex',
     justifyContent: 'space-between',
     marginLeft: '240px',
     [theme.breakpoints.down('sm')]: {
       marginLeft: '0',
       flexWrap: 'wrap',
       height: isHomePage ? '120px' : '80px',
      
     },
   };
 });
 
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
 


