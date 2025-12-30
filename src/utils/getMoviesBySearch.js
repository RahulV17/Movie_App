export const getMoviesBySearch = (movies = [], value = "") => {
  if (!value || !value.trim()) return movies;

  const searchTerm = value.toLowerCase();

  return movies.filter(movie => {
    const titleMatch = (movie.title || movie.name || movie.original_title || "")
      .toLowerCase()
      .includes(searchTerm);

    
    const castMatch = Array.isArray(movie.casts) && movie.casts.some(cast => 
      (cast.name || "").toLowerCase().includes(searchTerm)
    );

    return titleMatch || castMatch;
  });
};