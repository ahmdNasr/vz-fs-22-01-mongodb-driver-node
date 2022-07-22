const cors = require("cors")
const morgan = require("morgan")
const express = require("express")

const { getAllMovies, getMovieById, addMovieToDB } = require("./db-access/db-access");

const PORT = process.env.PORT || 9000
const app = express()

app.use(cors())
app.use(morgan("dev"))

app.get("/movies", (req, res) => {
    getAllMovies()
    .then(moviesArray => res.json(moviesArray))
})

app.get("/movies/:id", (req, res) => {
    const movieId = req.params.id
    getMovieById(movieId)
    .then(movie => res.json(movie))
})

//  express.json() body parser hier gleich einfügen...
app.post("/movies", express.json(), (req, res) => {
    const newMovie = {
        title: req.body.title,
        director: req.body.director,
        year: req.body.year,
        rate: req.body.rate,
        duration: req.body.duration,
        genre: req.body.genre,
    }

    addMovieToDB(newMovie)
    .then((addedMovie) => res.json(addedMovie)) // addedMovie hat auch eine id...
})

app.listen(PORT, () => console.log("Server listening on PORT", PORT))