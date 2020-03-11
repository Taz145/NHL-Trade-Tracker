var sqlite3 = require('sqlite3').verbose()
var md5 = require('md5')

const DBSOURCE = "../nhl-trades.db"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        console.log("Error attempting to connect to database")
        console.error(err.message)
        throw err
    } else {
        console.log("Connected to Database succesfully")
    }
});

module.exports = db