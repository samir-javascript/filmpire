import React, {useState} from 'react'
import { Grid, Typography , Button,  Box, CircularProgress,  } from '@mui/material'
import { useParams , useNavigate, Link} from 'react-router-dom'
import { useGetPersonDetailsQuery , useGetActorMoviesQuery} from '../../services/AMDB'
import { GridSpaceAround, Poster } from './styles'
import { ArrowBack } from '@mui/icons-material'
import { MoviesList, Pagination } from '..'
import { Helmet } from 'react-helmet-async';
const ActorDetailsPage = () => {
  const navigate = useNavigate()
  const [page,setPage] = useState(1)
  const {id} = useParams()
  const {data, isFetching,error} = useGetPersonDetailsQuery(id)
  const {data:actorMovies} = useGetActorMoviesQuery({id,page})

   console.log(actorMovies)
  if(isFetching) {
    return (
      <Box display={"flex"} justifyContent={'center'}>
         <CircularProgress  size={"2.5rem"}/>
      </Box>
    )
  }
  if(error) {
    return (
      <Box display={"flex"} justifyContent={'center'}>
         <Typography variant='h5'>Something went wrong , <Link to='/'>Go back</Link></Typography>
      </Box>
    )
  }
  return (
    <>
    <GridSpaceAround container >
    <Helmet>
        <title> {data?.name} - Filmpire</title>
        <meta name='description' content={data?.biography}/>
        
      </Helmet>
        <Grid item sm={12} lg={4} >
           <Poster src={`https://image.tmdb.org/t/p/w500/${data?.profile_path}`} alt={data?.name} />
        </Grid>
        <Grid item container lg={7}  direction={'column'}>
             <Typography variant='h2' gutterBottom>
                {data?.name}
             </Typography>
             <Typography variant='h5' gutterBottom>
               Born: {data?.birthday}
             </Typography>
             <Typography variant='body2' gutterBottom paragraph align='justify'>
                {data?.biography}
             </Typography>
             <Grid item container sx={{marginTop: '1rem'}}>
            <Box marginTop={'2rem'} width={'100%'}  display={'flex'} justifyContent={'space-around'}>
                 <Button variant='outlined' onClick={()=> navigate(-1) }  endIcon={<ArrowBack />}>
                    Back
                     </Button>
                    <Button variant='contained' color='primary' target='_blank' rel='noreferrer' href={`https://www.imdb.com/name/${data?.imdb_id}`}           >
                       IMDB
                    </Button>
             </Box>
          </Grid>
          
        </Grid>
       
      
     </GridSpaceAround>

    <Box  marginTop={'3rem'} width={'100%'}>
<Typography gutterBottom variant='h3' align='center'>Movies</Typography>
 {actorMovies ? (
   <MoviesList movies={actorMovies} numberOfMovies={12} />
 ) : (
    <Typography>sorry, there's no recommended movies for this movie</Typography>
 )}
     <Pagination currentPage={page} setPage={setPage} totalPages={actorMovies?.total_pages}/>
</Box>
</>
  )
}

export default ActorDetailsPage