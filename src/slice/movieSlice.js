import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    movies : [] ,
    searchValue : ""
}

const movieSlice = createSlice({
    name : 'movies',
    initialState,
    reducers : {
        
        setMovies : (state , action) => {
            state.movies = action.payload ;
        },
        
        addMovies : (state, action) => {
            state.movies = [...state.movies, ...action.payload];
        },
        setSearchValue : (state , action) => {
            state.searchValue = action.payload;
        }
    }
})

export const { setMovies, addMovies, setSearchValue } = movieSlice.actions; 

export default movieSlice.reducer;