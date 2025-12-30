import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMovies } from "../../api/movies";
import MovieCard from "../../components/MovieCard";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { getMoviesBySearch } from "../../utils/getMoviesBySearch";
import { useSearchParams } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const { movies } = useSelector((state) => state.movies);

  const [page, setPage] = useState(1);

  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") || "";

  const filterByMovieName = getMoviesBySearch(movies || [], searchQuery);

  useEffect(() => {
    dispatch(getMovies(1));
  }, [dispatch]);

  const handleNextPage = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    dispatch(getMovies(nextPage));
  };

  return (
    <>
      <Navbar />
      <Box sx={{ flexGrow: 1, padding: 2, paddingBottom: 4 }}>
        {!movies || movies.length === 0 ? (
          <Typography
            variant="h5"
            align="center"
            sx={{ mt: 4, color: "white" }}
          >
            Loading Movies...
          </Typography>
        ) : (
          <>
            <Grid container spacing={2}>
              {filterByMovieName?.length > 0 ? (
                filterByMovieName.map((movie, index) => (
                  <MovieCard key={`${movie.id}-${index}`} movie={movie} />
                ))
              ) : (
                <Typography
                  variant="h6"
                  sx={{
                    color: "white",
                    width: "100%",
                    textAlign: "center",
                    mt: 4,
                  }}
                >
                  No movies found matching "{searchQuery}"
                </Typography>
              )}
            </Grid>

            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <Button
                variant="contained"
                color="error"
                size="large"
                onClick={handleNextPage}
                sx={{ fontWeight: "bold" }}
              >
                Load More Movies
              </Button>
            </Box>
          </>
        )}
      </Box>
    </>
  );
};

export default Home;
