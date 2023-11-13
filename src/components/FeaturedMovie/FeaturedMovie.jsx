import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import React from 'react'
import { Link } from 'react-router-dom';
import { CardContentStyles } from './styles';

const FeaturedMovie = ({movie}) => {
  const truncate = function(str,n) {
     return str > n ? str : str.substring(str,n) + '...';
  }
  if(!movie) return null;
  return (
    <Box className='featured-container' component={Link} to={`/movies/${movie.id}`}>
    <Card className='featured-card'>
       <CardMedia className='card-media' alt={movie?.title}
        title={movie?.title}
         media='picture'
         width='360px'
         image={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`} />
         
          <Box padding={'20px'}>
               <CardContentStyles>
                  <Typography variant='h5' gutterBottom>{movie?.title} </Typography>
                  <Typography variant='body2' >{truncate(movie.overview,155)} </Typography>
               </CardContentStyles>
          </Box>
      </Card>
    </Box>
  )
}

export default FeaturedMovie

//i

