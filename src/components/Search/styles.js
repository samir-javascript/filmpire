// MyStyledButton.js

import { InputBase, Stack } from '@mui/material';
import { styled } from '@mui/system';

import { alpha } from '@mui/material';
export const SearchContainer = styled(Stack)(({ theme }) =>({
   [theme.breakpoints.down('sm')]: {
      display: 'flex',
      
      width: '100%',
      
   }
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
   color: 'inherit',
   '& .MuiInputBase-input': {
     padding: theme.spacing(1, 1, 1, 0),
     // vertical padding + font size from searchIcon
     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
     transition: theme.transitions.create('width'),
     width: '100%',
     [theme.breakpoints.up('md')]: {
       width: '45ch',
       '&:focus': {
         width: '50ch',
       },
     },
     [theme.breakpoints.down('md')]: {
      width: '16ch',
    },
     
     
   },
 }));

 export const SearchDiv = styled('div')(({ theme }) => ({
   position: 'relative',
   borderRadius: theme.shape.borderRadius,
   backgroundColor: alpha(theme.palette.common.white, 0.15),
   '&:hover': {
     backgroundColor: alpha(theme.palette.common.white, 0.25),
   },
   marginLeft: 0,
   width: '100%',
   [theme.breakpoints.up('sm')]: {
     marginLeft: theme.spacing(1),
     width: 'auto',
   },
   [theme.breakpoints.down('sm')]: {
      marginTop: '-4px',
      marginBottom: '10px'
   }
 }));
 

 export const SearchIconWrapper = styled('div')(({ theme }) => ({
   padding: theme.spacing(0, 2),
   height: '100%',
   position: 'absolute',
   pointerEvents: 'none',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
 }));