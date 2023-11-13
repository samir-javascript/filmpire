import { createSlice } from "@reduxjs/toolkit";

export const genreOrGategory = createSlice({
    name: 'genreOrCategory',
    initialState: {
        genreIdOrCategoryName: '',
        page: 1,
        searchQuery: ''
    },
    reducers: {
        selectGenreOrGategory : (state,action)=> {
           state.genreIdOrCategoryName = action.payload;
           state.searchQuery = ''
        },
       searchMovie: (state,action) => {
            state.searchQuery = action.payload;
        }
    }
})
export const {selectGenreOrGategory, searchMovie} = genreOrGategory.actions;
export default genreOrGategory.reducer;