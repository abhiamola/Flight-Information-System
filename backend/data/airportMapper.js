import { DataMapper } from "./dataMapper.js";
import {Airport} from "../models/airport.js";
export class AirportMapper extends DataMapper {
    
    constructor(tdg) {
        super(tdg);
    }

    getByID(id) {
        // TODO: get airport by id
    }

    getAllForCountry(countryCode) {
        const rows = this.tdg.getAirportsForCountry(countryCode);
        return rows.then(r => r.map(m => this.#parseAirportRow(m)))
    }

    #parseAirportRow(row) {
        return new Airport(row.a_iata_code, row.a_icao_code, row.a_name, row.a_lat, row.a_lng, row.c_name);
    }
}