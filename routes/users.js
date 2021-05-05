/** Routes for users of our express app */ 

const express = require("express")
const router = new express.Router()
const db = require("../db")

router.get("/", async (req, res) => {
    // db calls are asynchronous!!
    try { 
        const results = await db.query(
            `SELECT * FROM users;`)
        return res.json(results.rows)
    } catch (e) {
        return next(e)
    }
})


module.exports = router