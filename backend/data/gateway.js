import mysql2 from 'mysql2/promise';
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
        return this.#getConnection().then(conn => conn.query(`SELECT * FROM countries WHERE code = '${id}'`))
            .then(res => res[0])
    }

    // ===========
    // AIRLINE CODE
    // ===========

    getAirlines(offset = 0) {
        return this.#getConnection().then(conn => conn.query(`SELECT * FROM airlines LIMIT 100 OFFSET ${offset}`))
            .then(res => res[0])
    }

    getAirlineByICAO(icao) {
        return this.#getConnection().then(conn => conn.query(`SELECT * FROM airlines WHERE icao_code = '${icao}'`))
            .then(res => res[0])
    }


    // ============
    // FLIGHTS CODE
    // ============

    getFlights(offset = 0) {
        return this.#getConnection()
            .then(conn => conn.query({sql: `SELECT * from realTimeFlightData as r inner join airlines a on r.airline_icao = a.icao_code
                                                                             inner join airports arrival on r.arr_icao = arrival.icao_code
                                                                             inner join airports departure on r.dep_icao = departure.icao_code
                                                                             inner join countries cArr on arrival.country_code = cArr.code
                                                                             inner join countries cDep on departure.country_code = cDep.code LIMIT 100 OFFSET ${offset}`, nestTables: '_'}))
            .then(res => { return res[0] })
    }

    async #getConnection() { 
        if (!this.#connection) {
            this.#connection = await mysql2.createConnection(this.#connectionParams)
        }
        return this.#connection;
    }
}

