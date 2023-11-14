/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */

import MovieContainer from './styles'
import {Movie} from '../index'
const MoviesList = ({movies,numberOfMovies,excludeFirst}) => {
  const startFrom = excludeFirst ? 1 : 0;
  return (
    <MovieContainer container>
        {movies.results.slice(startFrom,numberOfMovies).map((movie,i)=> (
            <Movie key={i} movie={movie} i={i} />
        ))}
    </MovieContainer>
  )
}

export default MoviesList