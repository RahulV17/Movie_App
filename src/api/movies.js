import axios from 'axios';
import { setMovies, addMovies } from '../slice/movieSlice';


const backupMovies = [
  {
    id: "backup-1",
    original_title: "Baahubali: The Beginning",
    overview: "A story of a lost prince who rises to defeat the evil dictator.",
    poster_path: "https://image.tmdb.org/t/p/w500/9BAjt8nSSms62thZOfzCJ4wwB7S.jpg",
    vote_average: 8.5,
    casts: [
      { name: "Prabhas", character: "Hero / Shivudu" },
      { name: "Tamannaah", character: "Heroine / Avanthika" },
      { name: "Anushka Shetty", character: "Second Heroine / Devasena" },
      { name: "Rana Daggubati", character: "Villain / Bhallaladeva" }
    ]
  },
  {
    id: "backup-2",
    original_title: "Avengers: Endgame",
    overview: "The Avengers assemble once more to reverse Thanos' actions.",
    poster_path: "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
    vote_average: 8.9,
    casts: [
      { name: "Robert Downey Jr.", character: "Hero / Iron Man" },
      { name: "Chris Evans", character: "Hero / Captain America" }
    ]
  },
  {
    id: "backup-3",
    original_title: "Titanic",
    overview: "A seventeen-year-old aristocrat falls in love with a kind but poor artist.",
    poster_path: "https://image.tmdb.org/t/p/w500/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg",
    vote_average: 8.0,
    casts: [
      { name: "Leonardo DiCaprio", character: "Hero / Jack" },
      { name: "Kate Winslet", character: "Heroine / Rose" }
    ]
  }
];


export const getMovies = (page = 1) => async dispatch => {
    
    
    const url = `https://jsonfakery.com/movies/paginated?page=${page}`; 
    
    try {
        const response = await axios.get(url);
        
        
        const moviesList = response.data.data || response.data;

        if (!Array.isArray(moviesList) || moviesList.length === 0) {
            throw new Error("API returned empty data");
        }

        console.log(`Fetched Page ${page}:`, moviesList);

        if (page === 1) {
            
            dispatch(setMovies(moviesList));
        } else {
            
            dispatch(addMovies(moviesList));
        }

    } catch (err) {
        console.warn("API Failed. Loading Backup Data...", err.message);
        
        
        if (page === 1) {
            dispatch(setMovies(backupMovies));
        }
    }
}