/* eslint-disable react/no-unescaped-entities */
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import React ,{useEffect, useState} from 'react'


import { MoviesList , Pagination} from '..';
import { useGetUserListMoviesQuery } from '../../services/AMDB';
import { Link, useParams } from 'react-router-dom';
import { ExitToApp } from '@mui/icons-material';

const ProfilePage = () => {
  
   const {id} = useParams()
    const logout = ()=> {
    localStorage.clear()
    window.location.href = '/'
  }
  const [favoritePage,setFavoritePage] = useState(1)
  const [watchlistPage,setWatchListPage] = useState(1)
  const {data:favoriteMovies , isFetching, error, refetch: refetchMovies} = useGetUserListMoviesQuery({listName: '/favorite/movies', accountId: `${id}`, sessionId: `${localStorage.getItem('session_id')}`, page:favoritePage})
  const {data:watchlistMovies, refetch: refetchWatchlist} = useGetUserListMoviesQuery({listName: '/watchlist/movies', accountId: `${id}`, sessionId: `${localStorage.getItem('session_id')}`, page:watchlistPage})
  useEffect(() => {
    refetchMovies()
    refetchWatchlist()
}, [])
  if(isFetching) {
    return (
      <Box display={"flex"}  justifyContent={'center'}>
          <CircularProgress  size={"2.5rem"}/>
      </Box>
    )
   }
     if(error) {
        return (
          <Box display={"flex"} justifyContent={'center'}>
              <Typography variant='h5'>something went Wrong <Link  to='/'>Go Back</Link></Typography>
        </Box>
        )
     }
    
     
   
  return (
   <div>
   <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
       <Typography variant='h4' >My Profile</Typography>
       <Button onClick={logout}>Logout &nbsp; <ExitToApp /></Button>
   </Box>
    <Box  width={'100%'}>
    <Typography gutterBottom variant='body1' align='left'>Watchlist Movies</Typography>
     {favoriteMovies ? (
       <MoviesList movies={favoriteMovies}  />
     ) : (
        <Typography variant='body1'>sorry, there's no movies on your favorite movies section <Link to='/'>Start Adding</Link></Typography>
     )}
         <Pagination currentPage={favoritePage} setPage={setFavoritePage} totalPages={favoriteMovies?.total_pages} />
     </Box> 
      
     <Box marginTop={'3rem'} width={'100%'}>
    <Typography gutterBottom variant='h3' align='left'>Favorite Movies</Typography>
     {watchlistMovies ? (
       <MoviesList movies={watchlistMovies}  />
     ) : (
      <Typography variant='h5'>sorry, there's no movies on your watchlist movies section <Link to='/'>Start Adding</Link></Typography>
     )}
        <Pagination currentPage={watchlistPage} setPage={setWatchListPage} totalPages={watchlistMovies?.total_pages} />
     </Box> 
    
    </div>
  )
}

export default ProfilePage