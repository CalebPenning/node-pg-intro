/** Routes for users of our express app */ 

const express = require("express")
const router = new express.Router()
const db = require("../db")

router.get("/", async (req, res, next) => {
    // db calls are asynchronous!!
    try { 
        const results = await db.query(
            `SELECT * FROM users;`)
        return res.json(results.rows)
    } catch (e) {
        return next(e)
    }
})

router.post("/", async (req, res, next) => {
    try {
        const { name, type } = req.body
        // Though the insert statement works and creates an employee,
        // it does not return any information to use.
        // The RETURNING clause is added at the end to a. end the statement and
        // b. return the information about the inserted data
        const results = await db.query(`INSERT INTO users (name, type) VALUES ($1, $2) RETURNING id, name, type`, [name, type])
        return res.status(201).json(results.rows)
    }
    catch(e) {
        return next(e)
    }
})

router.patch("/:id", async (req, res, next) => {
    try {
        const { id } = req.params
        const {name, type} = req.body
        const results = await db.query(
            `UPDATE users 
            SET name=$1, type=$2 
            WHERE id=$3 
            RETURNING id, name, type`, [name, type, id])
        return res.send(results.rows[0])
    } 

    catch(e) {
        return next(e)
    }
})

router.delete("/:id", async (req, res, next) => {
    try {
        const results = await db.query(
            `DELETE FROM users
            WHERE id = $1`, [req.params.id])
            return res.json({ success: {message: "Your query was successful."}})
    }

    catch(e) {
        return next(e)
    }
})

router.get("/search", async (req, res, next) => {
    try {
        const { type } = req.query.type
        const results = await db.query(`SELECT * FROM users WHERE type=$1`)
        return res.json(results.rows)
    } catch(e) {
        return res.json({
            error: {
                msg: e
            }
        })
    }
})

router.get("/good-search",
    async (req, res, next) => {
        try {
            const type = req.body.type

            const results = await db.query(
                `SELECT id, name, type
                FROM users
                WHERE type=$1`, [type])

            return res.json(results.rows)
        }

        catch(e) {
            return next(e)
        }
    })


module.exports = router