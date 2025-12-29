import Navbar from "../../components/Navbar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMovies } from "../../api/movies";
import  MovieCard  from "../../components/MovieCard";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { getMoviesBySearch } from "../../utils/getMoviesBySearch";

const Home = () => {

    const dispatch = useDispatch();

    const { movies , searchValue } = useSelector(state => state.movies)
    
    const filterByMovieName = getMoviesBySearch(movies , searchValue);

    useEffect(() => {
        dispatch(getMovies());
    },[])

    return (
        <>
            <Navbar />
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                {
                    filterByMovieName?.length > 0 && filterByMovieName.map(movie => <MovieCard key={ movie.id } movie= {movie} />)

                }
                </Grid>
            </Box>
        </>
    )
}

export default Home; 