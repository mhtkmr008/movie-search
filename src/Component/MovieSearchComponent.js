import React from "react";
import { useState } from "react";
import MovieService from "../Service/MovieService";
import '../CSS/MovieComponent.css';
const MovieSearchComponent=()=>{

    const [movie,setMovie]=useState('');
    const [movieList,setMovieList]=useState([]);
    const [selectedMovieData,setSelectedMovieData]=useState(null);

    const handleSearch=async (e)=>{
        e.preventDefault();

        try{
            const response= await MovieService.searchMovies(movie);
            if (response.Search && response.Search)
                {
                if(response.Search.length>0)
                    
                    {
                        setMovieList(response.Search);
                        setMovie('');
                    }
                    else
                    {
                        setMovieList(null);
                        alert("No movie found ");
                        setMovie('');
                    }
                
                }
            else
                {
                    setSelectedMovieData(null);
                    alert("Error: movie NotFound");
                    setMovie('');
                }
                
            
        }catch(error){
            console.error("error fetching movie data",error);
        }

        };

        const handleFetchDetails=async (imdbID)=>{
            try{
                const movieDetails= await MovieService.getMovieDetails(imdbID);
                setSelectedMovieData(movieDetails);
            }catch(error){
                console.error("Error geting movie Detaisl",error);
            }
        };
    

    return(
        <div className="movie-component">
            <h1>Movie Dashboard</h1>
            <form onSubmit={handleSearch}>
                <input type="text" value={movie} onChange={(e)=>setMovie(e.target.value)} placeholder="enter movie name"></input>
                {/* <input type="text" value={year} onChange={(e)=>setYear(e.target.value)} placeholder="year"></input> */}
                <button type="submit">Search</button>
            </form>

            {movieList.length > 0 && (
                <div className="movie-list">
                    <h2>Search Results:</h2>
                    <ol>
                        {movieList.map((movieItem) => (
                            <li key={movieItem.imdbID} className="movie-item">
                                <span className="movie-title">
                                {movieItem.Title} ({movieItem.Year}) - {movieItem.Country ? movieItem.Country : 'Unknown Country'}
                                </span>
                                <button onClick={() => handleFetchDetails(movieItem.imdbID)} className="details-button">Get Details</button>
                            </li>
                        ))}
                    </ol>
                </div>
            )}

{selectedMovieData && (
                <div className="movie-details">
                    <h2>{selectedMovieData.Title} ({selectedMovieData.Year})</h2>
                    <p><strong>Director:</strong> {selectedMovieData.Director}</p>
                    <p><strong>Actors:</strong> {selectedMovieData.Actors}</p>
                    <p><strong>Plot:</strong> {selectedMovieData.Plot}</p>
                </div>
            )}
        </div>
    );
};

export default MovieSearchComponent;