import axios from "axios";

const API_KEY='c4e5c48f';

const MovieService={
    async searchMovies(name)
    {
        const url=`https://www.omdbapi.com/?s=${name}&apikey=${API_KEY}`;
        try{
            const response=await axios.get(url);
            return response.data;
        }catch(error){
            console.error("error fetching movie data",error);
            throw error;
        }
    },

    async getMovieDetails(imdbID)
    {
        const url=`https://www.omdbapi.com/?i=${imdbID}&apikey=${API_KEY}`;
        try{
            const response =await axios.get(url);
            return response.data;
        }catch(error){
            console.error("error fetching details",error);
            throw error;
        }
    }
};

export default MovieService;