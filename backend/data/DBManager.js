import { AirlineMapper } from './airlineMapper.js';
import { AirportMapper } from './airportMapper.js';
import { CountryMapper } from './countryMapper.js';
import { FlightMapper } from './flightMapper.js';

export class DBManager {
    static #instance;

    airlineMapper;
    airportMapper;
    countryMapper;
    flightMapper;
    
    constructor(tdg) {
        if (DBManager.#instance) {
            throw new Error("DBManager can only be instantiated once!")
        }

        DBManager.#instance = this;
        
        this.airlineMapper = new AirlineMapper(tdg);
        this.airportMapper = new AirportMapper(tdg);
        this.countryMapper = new CountryMapper(tdg);
        this.flightMapper = new FlightMapper(tdg);
    }

    static getDBManager(tdg) {
        if (!DBManager.#instance) {
            return new DBManager(tdg);
        } else {
            if (tdg) // if retrieving instance, make sure we aren't using a new tdg
                throw new Error("DBManager is already instantiated")

            return this.#instance;
        }
    }
}