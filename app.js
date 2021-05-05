const express = require('express')
const app = express()
const ExpressError = require('./expressError')

app.use(express.json())

const userRoutes = require("./routes/users")
app.use("/users", userRoutes)

app.use((req, res, next) => {
    const err = new ExpressError("Not Found", 404)

    // pass error to middleware

    return next(err)
})

app.use((err, req, res, next) => {
    let status = err.status || 500

    return res.status(status).json({
        error: {
            message: err.message,
            status: status
        }
    })
})

module.exports = app