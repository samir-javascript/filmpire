
import { styled } from '@mui/system';

import { Grid } from '@mui/material';

const MovieContainer = styled(Grid)(({ theme }) =>({
   display: 'flex',
   flexWrap: 'wrap',
   justifyContent: 'space-between',
   overflow: 'auto',
   [theme.breakpoints.down('sm')]: {
       justifyContent : 'center'
   }
}));

export default MovieContainer;