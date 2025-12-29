import axios from 'axios';
import { setMovies } from '../slice/movieSlice';

export const getMovies = () => async dispatch => {
    const url = 'https://jsonfakery.com/movies/paginated';
    try {
        const {data} = await axios.get(url);
        dispatch(setMovies(data.data))
        return data
    } catch (err) {
        return err
    }
}