
// eslint-disable-next-line
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const tmdbApiKey = process.env.REACT_APP_MOVIE_DB_API_KEY;

export const tmdbApi = createApi({
  reducerPath: 'tmdbApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3' }),
  endpoints: (builder) => ({
    // Get Movies BY [type]
    getMovies: builder.query({
      query: ({genreIdOrCategoryName,page, searchQuery}) => {
         // get movies by [category]
        if(genreIdOrCategoryName && typeof genreIdOrCategoryName === 'string') {
          return `movie/${genreIdOrCategoryName}?page=${page}&api_key=${tmdbApiKey}`
        }
         // get movies by [searchQuery]
         if(searchQuery) {
           return `search/movie?query=${searchQuery}&page=${page}&api_key=${tmdbApiKey}`
        }
         // get movies by [genres]
         if (genreIdOrCategoryName && typeof genreIdOrCategoryName === 'number') {
          return `discover/movie?with_genres=${genreIdOrCategoryName}&page=${page}&api_key=${tmdbApiKey}`
        }
        
        return  `movie/popular?page=${page}&api_key=${tmdbApiKey}`
      }, 
    }),
    // Get Movies
    getGenre: builder.query({
      query: () => `genre/movie/list?api_key=${tmdbApiKey}`
    }),
     // Get Single Movie by ID
     getSingleMovie: builder.query({
      query: (id) => `/movie/${id}?append_to_response=videos,credits&api_key=${tmdbApiKey}`
    }),
     // Get recommended movies
     getRecommendedMovies: builder.query({
      query: ({ movie_id, list }) => `/movie/${movie_id}/${list}?api_key=${tmdbApiKey}`
    }),
     // Get recommended movies
     getPersonDetails: builder.query({
      query: (id) => `/person/${id}?api_key=${tmdbApiKey}`
    }),
    // Get recommended movies
    getActorMovies: builder.query({
      query: ({id,page}) => `/discover/movie?with_cast=${id}&page=${page}&api_key=${tmdbApiKey}`
    }),
     // Get user specific list
     getUserListMovies: builder.query({
      query: ({accountId,sessionId,listName,page}) => `/account/${accountId}/${listName}?api_key=${tmdbApiKey}&session_id=${sessionId}&page=${page}`
    }),
  })
});

export const { useGetMoviesQuery , useGetGenreQuery, useGetSingleMovieQuery,
   useGetRecommendedMoviesQuery, useGetPersonDetailsQuery, useGetActorMoviesQuery ,useGetUserListMoviesQuery} = tmdbApi;