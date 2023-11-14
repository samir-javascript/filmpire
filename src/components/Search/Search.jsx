import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Search as SearchIcon } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { SearchContainer, SearchDiv, SearchIconWrapper, StyledInputBase } from './styles';
import { searchMovie } from '../../features/CurrentGenreOrCategory';

export default function Search() {
  const [query, setQuery] = useState('');
  const [noResults, setNoResults] = useState(false); // New state to track no results
  const { pathname } = useLocation();
  if (pathname !== '/') return null;

  const dispatch = useDispatch();

  const handleKeyPress = async (event) => {
    if (event.key === 'Enter' && query) {
      try {
        await dispatch(searchMovie(query));
        setQuery('');
        setNoResults(false); // Reset noResults state on successful search
      } catch (error) {
        console.log('Something went wrong. Please try again.');
        setNoResults(true); // Set noResults to true on error
      }
    }
  };

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
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
        />
      </SearchDiv>
      {noResults && <div>No movies found for {query}</div>}
    </SearchContainer>
  );
}

