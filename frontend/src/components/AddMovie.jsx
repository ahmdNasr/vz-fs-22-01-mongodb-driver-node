import { useState } from "react";

const AddMovie = ({ setMovies }) => {
    const [title, setTitle] = useState("")
    const [director, setDirector] = useState("")
    const [year, setYear] = useState("")
    const [rate, setRate] = useState("")
    const [duration, setDuration] = useState("")
    
    const [genre, setGenre] = useState([])
    const [currentGenre, setCurrentGenre] = useState([])

    console.log(genre)

    const addCurrentGenreToArray = (e) => {
        e.preventDefault()

        // abbrechen wenn das input von currentGenre leer ist...
        if(currentGenre === "") return

        setGenre((prevGenreArray) => [...prevGenreArray, currentGenre])
        setCurrentGenre("")
    }

    const deleteGenreFromArray = (genreToBeDeleted) => {
        const newGenreArray = genre.filter(g => g !== genreToBeDeleted)
        setGenre(newGenreArray)
    }

    const addMovie = (event) => {
        event.preventDefault()

        fetch("http://localhost:9000/movies", {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title,
                director,
                year,
                rate,
                duration,
                genre
            })
        })
        .then(res => res.json())
        .then((addedMovie) => setMovies((prevMovies) => [...prevMovies, addedMovie] ))
    }

    return (
        <form>
            <h1>Add your favorite movie to our list!</h1>

            <div style={{display: "grid", gridTemplateColumns: "1fr 2fr"}}>
                <label htmlFor="title">Title</label>
                <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)}/>
                
                <label htmlFor="director">Director</label>
                <input type="text" id="director" value={director} onChange={(e) => setDirector(e.target.value)}/>
                
                <label htmlFor="year">Year</label>
                <input type="text" id="year" value={year} onChange={(e) => setYear(e.target.value)}/>
                
                <label htmlFor="rate">Rate</label>
                <input type="text" id="rate" value={rate} onChange={(e) => setRate(e.target.value)}/>
                
                <label htmlFor="duration">Duration</label>
                <input type="text" id="duration" value={duration} onChange={(e) => setDuration(e.target.value)}/>
                
                <label htmlFor="currentGenre">Genre</label>
                <div>
                    <ul>
                        {genre.map((genreElement, index)=> <li key={index}>
                            {genreElement} <span style={{ cursor: "pointer" }} onClick={() => deleteGenreFromArray(genreElement)}>❌</span>
                        </li>)}
                    </ul>
                    <input type="text" id="currentGenre" value={currentGenre} onChange={(e) => setCurrentGenre(e.target.value)}/>
                    <button onClick={addCurrentGenreToArray}>Add Genre</button>
                </div>
            </div>

            <button 
                style={{
                    border: "none",
                    cursor: "pointer",
                    padding: "16px",
                    borderRadius: 6,
                    backgroundColor: "#bbb"
                }}
                onClick={addMovie}>
                    Add Movie
            </button>
        </form>
    );
}
 
export default AddMovie;