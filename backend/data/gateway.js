import mysql2 from 'mysql2/promise';

const FLIGHT_QUERY = `SELECT * from realTimeFlightData as r inner join airlines a on r.airline_icao = a.icao_code
                                                                             inner join airports arrival on r.arr_icao = arrival.icao_code
                                                                             inner join airports departure on r.dep_icao = departure.icao_code
                                                                             inner join countries cArr on arrival.country_code = cArr.code
                                                                             inner join countries cDep on departure.country_code = cDep.code`;

const AIRLINE_QUERY = `SELECT * FROM airlines`;

export class DataGateway {
    
    #connectionParams;
    #connection;
    constructor(connectionParams) {
        this.#connectionParams = connectionParams;
    }

    // ============
    // COUNTRY CODE
    // ============
    getCountryById(id) {
        return this.#getDBConnection().then(conn => conn.query(`SELECT * FROM countries WHERE code = ?`, [id]))
            .then(res => res[0])
    }

    // ===========
    // AIRLINE CODE
    // ===========

    getAirlines(offset, limit) {

        return this.#getDBConnection().then(conn => conn.query(`${AIRLINE_QUERY} LIMIT ? OFFSET ?`, [parseInt(limit,10), parseInt(offset,10)]))
            .then(res => res[0])
    }

    getAirlineByICAO(icao) {
        return this.#getDBConnection().then(conn => conn.query(`${AIRLINE_QUERY} WHERE icao_code = ?`, [icao]))
            .then(res => res[0])
    }


    // ============
    // FLIGHTS CODE
    // ============

    getFlights(offset = 0) {
        return this.#getDBConnection()
            .then(conn => conn.query({sql: `${FLIGHT_QUERY} LIMIT 100 OFFSET ?`, nestTables: '_'}, [parseInt(offset,10)]))
            .then(res => { return res[0] })
    }

    getFlightForId(id) {
        return this.#getDBConnection()
            .then(conn => conn.query({sql: `${FLIGHT_QUERY} WHERE r.hex = ?`, nestTables: '_'}, [id]))
            .then(res => { return res[0] })
    }

    getFlightsForAirport(airport) {
        return this.#getDBConnection()
            .then(conn => conn.query({sql: `${FLIGHT_QUERY} WHERE r.dep_icao = ? or r.arr_icao = ?`, nestTables: '_'},[airport, airport]))
            .then(res => { return res[0] })
    }

    // =============
    // AIRPORTS CODE
    // =============

    getAirportsForCountry(countryCode) {
        return this.#getDBConnection()
            .then(conn => conn.query({sql: `SELECT * FROM airports AS a INNER JOIN countries c on a.country_code = c.code WHERE a.country_code = ?`, nestTables: '_'}, [countryCode]))
            .then(res => { return res[0] })
    }

    async #getDBConnection() {
        if (!this.#connection) {
            this.#connection = await mysql2.createConnection(this.#connectionParams)
        }
        return this.#connection;
    }
}

