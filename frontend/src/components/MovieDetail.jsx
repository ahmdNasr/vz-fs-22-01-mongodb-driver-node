import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const MovieDetail = () => {
    const { id } = useParams()
    const [movie, setMovie] = useState()

    console.log(movie)
    useEffect(() => {
        fetch("http://localhost:9000/movies/" + id)
        .then(response => response.json())
        .then(movieObject => setMovie(movieObject))
    }, [id])

    if(movie) return (
        <div>
            <h2>{movie.title}</h2>
            <h3>by {movie.director}</h3>
            <p>Year: {movie.year}</p>
            <p>Duration: {movie.duration} </p> 
            <p>Rating: {movie.rate}</p>

            <ul>
                Genre:
               {movie.genre.map((genreElement) => <li className="genre">{genreElement}</li>)}
            </ul>
        </div>
    )
    else return (
        <h1>Loading...</h1>
    )
}
 
export default MovieDetail;