import styled from "@emotion/styled";
import { CardContent } from "@mui/material";

export const CardContentStyles = styled(CardContent)(({ theme }) =>({
    width: '40%',
    color:'white',
    position: 'absolute',
    bottom: '7%',
    cursor:'default',
    zIndex:999,
    [theme.breakpoints.down('lg')]: {
        width: '70%'
   },
    [theme.breakpoints.down('md')]: {
        width: '90%'
   },
    [theme.breakpoints.down('sm')]: {
         width: '95%'
    }
}));