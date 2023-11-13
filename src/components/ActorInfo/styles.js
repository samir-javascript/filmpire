import styled from "@emotion/styled";
import { Grid } from "@mui/material";

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
    boxShadow: theme.palette.mode === 'light' ? '0.5em 1em 1em rgb(67,67,70)': 'none' ,
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