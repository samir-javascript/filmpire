
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';






export const LinkStyles = styled(Link)(({ theme }) => ({
    color: theme.palette.text.primary,
     textDecoration: 'none'
 }));

 export const ImageGenreStyles = styled("img")(({ theme }) => ({
   filter : theme.palette.mode === 'dark' ? 'invert(1)' : 'brightness(1.2)',
  }));
 


