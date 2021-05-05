const { Client } = require('pg')

let DB_URI

if (process.env.NODE_ENV === "test") {
    DB_URI = "postgresql:///userstest_db"
} else {
    DB_URI = "postgresql:///users_db"
}

let db = new Client ({
    connectionString: DB_URI
})

db.connect()

module.exports = db