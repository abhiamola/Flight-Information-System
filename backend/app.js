import {} from 'dotenv/config'
import express from "express";
import {DBManager} from "./data/DBManager.js";

const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;

const app = express()
const port = 3000

const dbManager = DBManager.getDBManager({
    host: '127.0.0.1',
    user: dbUser,
    password: dbPass,
    database: 'flights_db'
})

const airlineMapper = dbManager.airlineMapper;
const flightMapper = dbManager.flightMapper;

// can be localhost:3000/airlines or localhost:3000/airlines?offset=100
// returns 100 airline objects starting at the given offset (or from beginning)
app.get('/airlines', async (req, res) => {
    const offset = req.query.offset;

    const airlines = offset ? await airlineMapper.getAllWithOffset(offset) : await airlineMapper.getAllWithOffset(0)
    res.send(airlines)
})


// get flights along with their airports
app.get('/flights', async (req, res) => {
    const offset = req.query.offset;

    const airlines = offset ? await flightMapper.getFlights(offset) : await flightMapper.getFlights(0)
    res.send(airlines)
})
app.listen(port, () => {
    console.log(`Backend app listening on port ${port}`)
})