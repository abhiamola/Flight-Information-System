import { AirlineMapper } from './airlineMapper.js';
import { AirportMapper } from './airportMapper.js';
import { CityMapper } from './cityMapper.js';
import { CountryMapper } from './countryMapper.js';
import { FlightMapper } from './flightMapper.js';
import { DataGateway } from './gateway.js';

export class DBManager {
    static #instance;

    #tdg;
    airlineMapper;
    airportMapper;
    cityMapper;
    countryMapper;
    flightMapper;
    
    constructor(dbConnectionParams) {
        if (DBManager._instance) {
            throw new Error("DBManager can only be instantiated once!")
        }

        DBManager.#instance = this;
        this.#tdg = new DataGateway(dbConnectionParams);
        
        this.airlineMapper = new AirlineMapper(this.#tdg);
        this.airportMapper = new AirportMapper(this.#tdg);
        this.cityMapper = new CityMapper(this.#tdg);
        this.countryMapper = new CountryMapper(this.#tdg);
        this.flightMapper = new FlightMapper(this.#tdg);
    }

    static getDBManager(initialParams) {
        if (!DBManager._instance) {
            return new DBManager(initialParams);
        } else {
            throw new Error("DBManager is already instantiated")
        }
    }
}