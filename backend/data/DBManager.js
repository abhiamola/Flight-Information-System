import { AirlineMapper } from './airlineMapper.js';
import { AirportMapper } from './airportMapper.js';
import { CityMapper } from './cityMapper.js';
import { CountryMapper } from './countryMapper.js';
import { FlightMapper } from './flightMapper.js';

export class DBManager {
    static #instance;

    #tdg;
    airlineMapper;
    airportMapper;
    cityMapper;
    countryMapper;
    flightMapper;
    
    constructor(tdg) {
        if (DBManager.#instance) {
            throw new Error("DBManager can only be instantiated once!")
        }

        DBManager.#instance = this;
        this.#tdg = tdg
        
        this.airlineMapper = new AirlineMapper(this.#tdg);
        this.airportMapper = new AirportMapper(this.#tdg);
        this.cityMapper = new CityMapper(this.#tdg);
        this.countryMapper = new CountryMapper(this.#tdg);
        this.flightMapper = new FlightMapper(this.#tdg);
    }

    static getDBManager(tdg) {
        if (!DBManager.#instance) {
            return new DBManager(tdg);
        } else {
            throw new Error("DBManager is already instantiated")
        }
    }
}