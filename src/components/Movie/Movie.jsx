import { Box, Grid, Grow, Rating, Tooltip, } from '@mui/material'
import React from 'react'
import  { Imagestyles, LinksStyles , Title} from './styles'


const Movie = ({movie,i}) => {
  
  
  return (
    <Grid sx={{padding: '10px'}} item xs={12} sm={12} md={4} lg={3} xl={2} >

        <Grow in key={i} timeout={(i + 1) * 250}>
           {movie && (
            <LinksStyles to={movie?.id && `/movies/${movie?.id}`}>
                <Imagestyles src={movie?.poster_path && `https://image.tmdb.org/t/p/w500/${movie?.poster_path}`   }
                 alt={movie?.title} />
                 <Title variant='h5'>
                     {movie?.title}
                </Title>
                    <Tooltip disableTouchListener title={`${movie?.vote_average } / 10`}>
                     <div>
                     <Rating readOnly precision={0.1} value={movie?.vote_average / 2}/>
                     </div>
                 </Tooltip>
               
            </LinksStyles>
           )}
            
          
        </Grow>
        
    </Grid>
  )
}

export default Movie