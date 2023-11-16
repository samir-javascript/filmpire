import React, {useState,useEffect} from 'react'
import { useParams, Link , useNavigate} from 'react-router-dom'
import {  toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux'
import { useGetSingleMovieQuery , useGetRecommendedMoviesQuery, useGetUserListMoviesQuery} from '../../services/AMDB'
import axios from 'axios'
import { ArrowBack, Favorite, FavoriteBorderOutlined, Language, Movie as MovieIcon, PlusOne, Remove, Theaters } from '@mui/icons-material'
import { Box, CircularProgress, Grid, Typography, Button , Modal, Rating, ButtonGroup } from '@mui/material'
import { BtnContainer, BtnsContainer, CastImage, GenreContainer, GridSpaceAround, ImageGenre, LinkStyles, ModalStyles, Poster, VideoStyles } from './styles'
import genreIcons from '../../assets/genres/index'

import { selectGenreOrGategory } from '../../features/CurrentGenreOrCategory'
import MoviesList from '../MoviesList/MoviesList'
import { Helmet } from 'react-helmet-async';
import ErrorBoundary from '../MovieErrorBoundary';
//import Pagination from '../pagination/Pagination'
const MovieDetailsPage = () => {
    const navigate = useNavigate()
    const [open,setOpen] = useState(false)
 // const [page,setPage] = useState(1)
  const dispatch = useDispatch()

 //  const { genreIdOrCategoryName } = useSelector((state)=> state.currentGenreOrGategory)
 const { user } = useSelector((state)=> state.user)
  const {id} = useParams()
  const {data:favoriteMovies,} = useGetUserListMoviesQuery({listName: '/favorite/movies', accountId: `${user.id}`, sessionId: `${localStorage.getItem('session_id')}`, page:1})
  const {data:watchlistMovies, } = useGetUserListMoviesQuery({listName: '/watchlist/movies', accountId: `${user.id}`, sessionId: `${localStorage.getItem('session_id')}`, page:1})
 
  const { data: recommendedMovies } = useGetRecommendedMoviesQuery({ movie_id: id, list: 'recommendations' });
  const {data, isFetching, isError} = useGetSingleMovieQuery(id)
  console.log(data)
  const [isFavorited,setIsFavorited] = useState(false);
  const [isWatchListed,setIsWatchListed] = useState(false);

  const addTofavorites = async ()=> {
    if(user?.id) {
        const apiUrl = `https://api.themoviedb.org/3/account/${user.id}/favorite?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&session_id=${localStorage.getItem('session_id')}`;
    
        try {
          await axios.post(apiUrl, {
            media_type: 'movie',
            media_id: id,
            favorite: !isFavorited
          });
          setIsFavorited((prevState) => !prevState);
          const toastFavoriteMessage = isFavorited
          ? `${data?.title} has been removed from your favorite`
          : `${data?.title} has been added to your favorite`;
  
         toast.success(toastFavoriteMessage);
        } catch (error) {
          console.error('Error adding to favorite movies:', error);
        }
    }else {
        toast.error('Please log in to add to favorite');
    }
   
   }
  
   const addTowatchList = async ()=> {
    if(user?.id) {
        const apiUrl = `https://api.themoviedb.org/3/account/${user.id}/watchlist?api_key=${process.env.REACT_APP_MOVIE_DB_API_KEY}&session_id=${localStorage.getItem('session_id')}`;
    
        try {
          await axios.post(apiUrl, {
            media_type: 'movie',
            media_id: id,
            watchlist: !isWatchListed
          });
          setIsWatchListed((prevState) => !prevState);
          const toastWatchlistMessage = isWatchListed
          ? `${data?.title} has been removed from your watchlist`
          : `${data?.title} has been added to your watchlist`;
  
         toast.success(toastWatchlistMessage);
        } catch (error) {
          console.error('Error adding to watchlist movies:', error);
        }
    }else {
        toast.error('Please log in to add to watchlist');
    }
   
   }

   useEffect(() => {
       setIsFavorited(!!favoriteMovies?.results?.find((movie)=> movie.id === data?.id))

   }, [favoriteMovies, data])
   useEffect(() => {
    setIsWatchListed(!!watchlistMovies?.results?.find((movie)=> movie.id === data?.id))
}, [watchlistMovies, data])
   
  
    const color = ((theme)=> theme.palette.mode === 'dark' ? 'white' : 'black')
  if(isFetching) {
     return (
      
      <Box display={"flex"} justifyContent={'center'}>
          <CircularProgress  size={"3rem"}/>
      </Box>
     )
  }
  if(isError) {
    return (
     <Box display={"flex"} justifyContent={'center'}>
         <Link to='/'>
            Something went wrong - Go Back
         </Link>
     </Box>
    )
 }
  return (
    <ErrorBoundary>
    <GridSpaceAround container>
       <Helmet>
       <meta name='description' content={data?.overview}/>
        <title> {data?.title} - Filmpire</title>
         
        
      </Helmet>
          <Grid item sm={12} lg={4} >
              <Poster src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`} alt={data?.title} />
          </Grid>
          <Grid item container lg={7} direction={'column'}>  
              <Typography variant='h3' align='center' gutterBottom>{data?.title} ({data?.release_date.split('-')[0]}) </Typography>
              <Typography variant='h5' align='center' gutterBottom>{data?.tagline}</Typography>
              <GridSpaceAround item>
                   <Box display={'flex'} align='center'>
                       <Rating readOnly value={data?.vote_average / 2} />
                       <Typography variant='subtitle1' style={{marginLeft: '10px'}} gutterBottom>{data?.vote_average} / 10</Typography>
                   </Box>
                   <Typography gutterBottom variant='h6' align='center'>
                       {data?.runtime} min {`/ ${data?.spoken_languages[0].name}`}
                   </Typography>
              </GridSpaceAround>
              <GenreContainer>
                  {data?.genres.map((genre)=> (
                    <LinkStyles key={genre?.name || genre?.id} to='/' onClick={()=> dispatch(selectGenreOrGategory(genre?.id))}>
                          <ImageGenre src={genreIcons[genre?.name.toLowerCase()]} width={30} alt="genre img" />
                          <Typography variant='subtitle1'  color={color}>
                              {genre?.name}
                          </Typography>
                    </LinkStyles>
                  ))}
              </GenreContainer>
              <Typography variant='h5'style={{marginTop: '10px'}} gutterBottom>Overview</Typography>
              <Typography style={{marginBottom: '2rem'}}>{data?.overview}</Typography>
              <Typography variant='h5' gutterBottom>Top Cast</Typography>
              <Grid item container spacing={2}>
                    {data && data.credits.cast.map((character,i)=> (
                        character.profile_path && 
                        <Grid  key={i} item xs={4} md={2} component={Link} to={`/actors/${character.id}`} style={{textDecoration: 'none'}}>
                              <CastImage  src={`https://image.tmdb.org/t/p/w500/${character.profile_path}`}
                             alt={'character profile'} />
                             <Typography  color={'textPrimary'}>
                                  {character?.name}
                             </Typography>
                             <Typography  color={'textSecondary'}>
                                  {character?.character.split('/')[0]}
                             </Typography>
                        </Grid>
                       
                    )).slice(0,6)
                    }
              </Grid>
                  <Grid item container style={{marginTop:'1rem'}}>
                      <BtnsContainer>
                          <BtnContainer  item xs={12} sm={6}>
                              <ButtonGroup sx={{marginTop: '20px'}} size='small' variant='outlined'>
                                  <Button target='_blank' rel='noreferrer'  href={data?.homepage} endIcon={<Language />}>
                                      website
                                  </Button>
                                  <Button onClick={()=> setOpen(true) }  endIcon={<Theaters />}>
                                      Trailer
                                  </Button>
                                  <Button  target='_blank' rel='noreferrer' href={`https://www.imdb.com/title/${data.imdb_id}`}
                                   endIcon={<MovieIcon />}>
                                      IMDB
                                  </Button>
                              </ButtonGroup>
                              <ButtonGroup sx={{marginTop : '20px'}} size='small' variant='outlined'>
                               
                      <Button onClick={addTofavorites} 
                         endIcon={isFavorited ? <FavoriteBorderOutlined /> : <Favorite />}>
                         {isFavorited ? 'Unfavorite' : 'Favorite'}
                      </Button>
                      <Button onClick={addTowatchList} endIcon={isWatchListed ? <Remove /> : <PlusOne />}>
                           watchlist
                        </Button>
 
                               
                                 
                                  <Button 
                                   onClick={()=> navigate(-1)} endIcon={<ArrowBack />} sx={{borderColor: 'primary.main'}}>
                                      Back
                                  </Button>
                              </ButtonGroup>
                          </BtnContainer>
                      </BtnsContainer>
                  </Grid>
          </Grid>
         <Box  marginTop={'5rem'} width={'100%'}>
              <Typography gutterBottom variant='h3' align='center'>you might Also Like</Typography>
               {recommendedMovies ? (
                 <MoviesList movies={recommendedMovies} numberOfMovies={12} />
               ) : (
                  // eslint-disable-next-line react/no-unescaped-entities
                  <Typography>sorry, there's no recommended movies for this movie</Typography>
               )}
              
         </Box>
        
      <ModalStyles
      open={open}
      onClose={()=> setOpen(false)}
        closeAfterTransition
      >
         {data.videos.results.length > 0 && (
         <VideoStyles
         src={
          
          data?.videos.results[0]
          ? `https://www.youtube.com/embed/${data.videos.results[0].key}`
          : data?.videos.results[1]
          ? `https://www.youtube.com/embed/${data.videos.results[1].key}`
          : `https://www.youtube.com/embed/${data.videos.results[2].key}`
             
         }
         frameBorder="0"
         allow="autoplay"
         title="Trailer"
       />
         )}
       
      </ModalStyles>

    </GridSpaceAround>
    </ErrorBoundary>
   
  )
}

export default MovieDetailsPage 