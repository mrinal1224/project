
import { axiosInstance } from "./index";

// Get all the movies added so far
export const getAllMovies = async () => {
    try{
        const response = await axiosInstance.get('/api/movies/get-all-movies');
        return response.data;
    }catch(err){
        console.log(err.message);
    }
}

// Add a single movie
export const addMovie = async (payload) => {
    try{
        const response = await axiosInstance.post('/api/movies/add-movie', payload);
        return response.data;
    }
    catch(err){
        console.log(err.message)
    }
}

// Get a single movie by its id
export const getMovieById = async (id) => {
    try{
        const response = await axiosInstance.post(`/api/movies/movie/${id}`)
        return response.data;
    }catch(err){
        return err.response
    }
}

// Update Movie
export const updateMovie = async (payload) => {
    try{
        const response = await axiosInstance.put('/api/movies/update-movie', payload);
        return response.data;
    }catch(err){
        return err.message
    }
}

// Delete a movie
export const deleteMovie = async (payload) => {
    try{
        const response = await axiosInstance.put('/api/movies/delete-movie', payload);
        return response.data;
    }catch(err){
        return err.message
    }
}
