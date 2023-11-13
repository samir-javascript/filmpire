import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Search as SearchIcon } from '@mui/icons-material'

import {  useDispatch } from 'react-redux'
import { SearchContainer, SearchDiv, SearchIconWrapper, StyledInputBase} from './styles'
import { searchMovie } from '../../features/CurrentGenreOrCategory'

export default function Search() {
  const [query, setQuery] = useState('')
  const { pathname} = useLocation()
  if(pathname !== '/') return null;
   
  const dispatch = useDispatch()

  const handleKeyPress = (event) => {
    if (event.key === 'Enter'  && query) {
      try {
        dispatch(searchMovie(query))
         setQuery('')
      } catch (error) {
         console.log('something went wrong , try again')
      }
      
    }
  }

  return (
   <SearchContainer>
      <SearchDiv>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search for movies"
              inputProps={{ 'aria-label': 'search' }}
              value={query}
              onChange={(e)=> setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </SearchDiv>
    </SearchContainer>
    
  )
}

