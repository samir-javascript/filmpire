import { configureStore } from '@reduxjs/toolkit'
import { tmdbApi } from './services/AMDB'
import genreOrGategoryReducer from './features/CurrentGenreOrCategory'
import userReducer from './features/Authenticate'
export const store = configureStore({
  reducer: {
    [tmdbApi.reducerPath] : tmdbApi.reducer,
    currentGenreOrGategory: genreOrGategoryReducer,
    user: userReducer
  },
  middleware: (getDefaultMiddleware)=> getDefaultMiddleware().concat(tmdbApi.middleware),
  devTools: true
})