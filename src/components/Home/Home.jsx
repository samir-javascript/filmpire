/* eslint-disable react/react-in-jsx-scope */

import { Box, CircularProgress, Typography, useMediaQuery } from '@mui/material'

import { useGetMoviesQuery } from '../../services/AMDB'
import { MoviesList , Pagination , FeaturedMovie} from '../index'
import { useSelector } from 'react-redux'
import { useState } from 'react'

const Home = () => {
  const [page,setPage]= useState(1)
  const {genreIdOrCategoryName} = useSelector((state)=> state.currentGenreOrGategory)
  const {searchQuery} = useSelector((state)=> state.currentGenreOrGategory)
  const lg = useMediaQuery((theme)=> theme.breakpoints.only('lg'));
  const numberOfMovies = lg ? 18 : 16;
  const {data, isFetching, isError} = useGetMoviesQuery({genreIdOrCategoryName, page, searchQuery})
   if(isFetching) {
    return (
      <Box display={"flex"} justifyContent={'center'}>
          <CircularProgress  size={"2.5rem"}/>
      </Box>
    )
   }
   
   if (!data || data.length === 0) {
    return (
      <Typography variant="h6" align="center">
            something went wrong , please try again
      </Typography>
    );
  }

   if(isError) {
      return (
         <Typography variant='h5' align='center'>
            Something went wrong, try again
         </Typography>
      )
   }
    
  return (
    <div>
       <FeaturedMovie movie={data?.results[0]}/>
       <MoviesList movies={data} numberOfMovies={numberOfMovies} excludeFirst/>
       <Pagination currentPage={page} setPage={setPage} totalPages={data?.total_pages} />
    </div>
  )
}

export default Home