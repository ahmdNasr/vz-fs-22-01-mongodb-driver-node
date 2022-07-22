const { ObjectId } = require("mongodb");
const { getDB } = require("./getDB");

function getAllMovies() {
    return getDB()
    .then(db => db.collection("movies").find().toArray())
}

function getMovieById(id) {
    return getDB().then(db => db.collection("movies").findOne({ _id: ObjectId(id) }))
}

function addMovieToDB(movieObject) {
    return getDB()
    .then(db => db.collection("movies").insertOne(movieObject))
    .then(result => ({ ...movieObject, id: result.insertedId }))
}

function getAllUsers() {
    return getDB()
    .then(db => db.collection("users").find().toArray())
}

module.exports = {
    getAllMovies,
    getMovieById,
    addMovieToDB,
    getAllUsers
}