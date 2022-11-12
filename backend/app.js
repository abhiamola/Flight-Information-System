import { } from 'dotenv/config'
import express from "express";
import { DBManager } from "./data/DBManager.js";
import { DataGateway } from "./data/gateway.js";

const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;

const app = express()
const port = 8080

const dbManager = DBManager.getDBManager(new DataGateway({
    host: '127.0.0.1',
    user: dbUser,
    password: dbPass,
    database: 'flights_db'
}))

const airlineMapper = dbManager.airlineMapper;
const flightMapper = dbManager.flightMapper;
const airportMapper = dbManager.airportMapper;

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from ; Origin, X-Requested-With, Content-Type, Accept
    res.header("Access-Control-Allow-Headers", "*");
    next();
});


// can be localhost:3000/airlines or localhost:3000/airlines?offset=100
// returns 100 airline objects starting at the given offset (or from beginning)
app.get('/airlines', async (req, res) => {
    const offset = req.query.offset;
    let limit = 5;
    if (req.query.limit)
        limit = req.query.limit;
    
    const airlines = offset ? await airlineMapper.getAllWithOffset(offset, limit) : await airlineMapper.getAllWithOffset(0, limit)
    res.send(airlines)
})


// get single flight
app.get('/flights/:id', async (req, res) => {
    const id = req.params.id;

    if (id) {
        res.send(await flightMapper.getByID(id))
    }
})

// get flights (optionally select offset since we are getting only 100 at a time, or by airport icao (departure or arrival))
app.get('/flights', async (req, res) => {
    const offset = req.query.offset;
    const airport = req.query.airport;

    if (airport) {
        // searching for flights going to or leaving airport
        res.send(await flightMapper.getByAirport(airport))
        return
    }

    const airlines = offset ? await flightMapper.getFlights(offset) : await flightMapper.getFlights(0)
    res.send(airlines)
})

app.get('/airports', async (req, res) => {
    const countryCode = req.query.country;

    if (countryCode) {
        res.send(await airportMapper.getAllForCountry(countryCode));
    }


})

app.listen(port, () => {
    console.log(`Backend app listening on port ${port}`)
})