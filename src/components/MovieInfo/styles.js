
import { styled } from '@mui/system';

import { Grid, Modal } from '@mui/material';
import { Link } from 'react-router-dom';

export const GridSpaceAround = styled(Grid)(({ theme }) =>({
   display: 'flex',
   margin: '10px 0 !important',
   justifyContent: 'space-around',
   gap: '5px',
   
 
   [theme.breakpoints.down('sm')]: {
       flexDeriction: 'column',
       flexWrap: 'wrap',
    
   }
}));
export const Poster = styled('img')(({ theme }) =>({
    borderRadius: '20px',
    boxShadow: theme.palette.mode === 'light' ? '0.5em 1em 1em rgb(67,67,70)' : 'none',
    width: "80%",
    objectFit: 'cover',
    margin: '0 auto',
    display: 'flex',
    marginBottom: '30px',
    
    
    [theme.breakpoints.down('sm')]: {
        margin: '0 auto !important',
        width: '100% !important',
        marginBottom: "30px",
        height: '360px',  
    },
    
   
 }));

 export const GenreContainer = styled(Grid)(({ theme }) =>({
      display: "flex",
      justifyContent: 'space-around',
      flexWrap: 'wrap',
      margin: '10px 0 !important',
 }));
 export const ImageGenre = styled("img")(({ theme }) => ({
    filter : theme.palette.mode === 'dark' ? 'invert(1)' : 'brightness(1.2)',
    marginRight: '10px',
   }));
   export const LinkStyles = styled(Link)(({ theme }) => ({
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
   textDecoration: 'none',
   color: '#000',
   [theme.breakpoints.down('sm')]: {
      padding: '0.5rem 1rem',
   }
   }));

   export const CastImage = styled('img')(({ theme }) => ({
       width: '100%',
       maxWidth: '7em',
       height:'8em',
       borderRadius:'10px',
       objectFit: 'cover'
      }));
      export const BtnsContainer = styled('div')(({ theme }) => ({
          display: 'flex',
          width: '100%',
          justifyContent: 'space-between',
           flexWrap :'wrap',
          [theme.breakpoints.down('md')]: {
            flexDeriction: 'column',
            flexWrap: 'wrap',
            
           
          }
            
       }));
       export const BtnContainer = styled(Grid)(({ theme }) => ({
        display :'flex',
        width: '100%',
        justifyContent: 'space-between',
        [theme.breakpoints.down('md')]: {
            flexDeriction: 'column',
            flexWrap: 'wrap',
          
        }
         
       
        
     }));

     export const ModalStyles = styled(Modal)(({ theme }) => ({
        display :'flex',
         justifyContent : 'center',
         alignItems: 'center'
     }));
     export const VideoStyles = styled('iframe')(({ theme }) => ({
         width: '50%',
         height: '50%',
         [theme.breakpoints.down('sm')]: {
            width: '90%',
            height: '90%'
         }
     }));



     
      