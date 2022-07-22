const dotenv = require("dotenv")
const { MongoClient } = require('mongodb');

dotenv.config()

const url = process.env.DB_URL
const client = new MongoClient(url)

let _db; // später kommt unsere db referenz hier rein...

function getDB() {
    return new Promise((resolve, reject) => {
        if(!_db) {
            client
            .connect()
            .then(connectedClient => {
                const db = connectedClient.db("super-users-db-intro")
                _db = db; // DATENBANK-REFERENZ ZWISCHENSPEICHERN !!!
                return resolve(_db)
            })
            .catch((error) => reject(error))
        } else {
            return resolve(_db)
        }
    })
}

module.exports = {
    getDB
}