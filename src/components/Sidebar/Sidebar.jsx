// eslint-disable-next-line
import React, {useEffect} from 'react'
import genreIcons from '../../assets/genres/index'
import { List, Divider, ListItem, Box, CircularProgress, ListItemText, ListSubheader, ListItemIcon, Typography } from '@mui/material'
import { useTheme } from '@mui/system';
import { Link } from 'react-router-dom';
import { ImageGenreStyles, LinkStyles } from './styles';
import { useGetGenreQuery } from '../../services/AMDB';
import { useDispatch, useSelector } from 'react-redux';
import { selectGenreOrGategory } from '../../features/CurrentGenreOrCategory';

// eslint-disable-next-line react/prop-types
export default function Sidebar ({setMobileOpen})  {
    const {genreIdOrCategoryName} = useSelector((state)=> state.currentGenreOrGategory)
    const dispatch = useDispatch()
    const {data , isFetching} = useGetGenreQuery()
    useEffect(() => {
       setMobileOpen(false)
    }, [genreIdOrCategoryName])
    
    const theme = useTheme()
    const redLogo = 'https://fontmeme.com/permalink/210930/8531c658a743debe1e1aa1a2fc82006e.png';
    const blueLogo = 'https://fontmeme.com/permalink/210930/6854ae5c7f76597cf8680e48a2c8a50a.png';
   
    
   
     const categories = [{label: 'Top Rated', value: 'top_rated'},
     {label: 'Popular', value: 'popular'},
     {label: 'Upcoming', value: 'upcoming'},
]
  return (
    <>
       <Link  to='/' className='image-link'>
           <img className='image'
            src={theme.palette.mode ==='light' ? redLogo : blueLogo} alt="filmpire" /> 
       </Link>
       <Divider />
       <List>
           <ListSubheader>
              Categories
           </ListSubheader>
           {categories.map(({label,value})=> (
                <LinkStyles key={value} to='/'>
                     <ListItem  onClick={()=> dispatch(selectGenreOrGategory(value))} button>
                        <ListItemIcon>
                            <ImageGenreStyles src={genreIcons[label.toLowerCase()]} width={30} alt="genre img" />
                        </ListItemIcon>
                        <ListItemText primary={label}/> 
                     </ListItem>
                </LinkStyles>
           ))}
       </List>
       <Divider />
       <List>
           <ListSubheader>
              Genres
           </ListSubheader>
           {isFetching ? (
             <Box display={"flex"} justifyContent={'center'}>
                  <CircularProgress />
             </Box >
           ) : ( data.genres.map(({name,id})=> (
                <LinkStyles key={name} to={``}>
                     <ListItem  onClick={()=> dispatch(selectGenreOrGategory(id))} button>
                        <ListItemIcon>
                            <ImageGenreStyles src={genreIcons[name.toLowerCase()]} width={30} alt="genre img" />
                        </ListItemIcon>
                        <ListItemText primary={name}/> 
                     </ListItem>
                </LinkStyles>
           )))}
       </List>
    </>
  )
}

