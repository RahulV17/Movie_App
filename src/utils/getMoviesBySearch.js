export const getMoviesBySearch = (movies = [], value = "") => {
  if (!value.trim()) return movies;

  return movies.filter(movie =>
    movie.name?.toLowerCase().includes(value.toLowerCase())
  );
};
