import { DataMapper } from "./dataMapper.js";
import {Airline} from "../models/airline.js";
export class AirlineMapper extends DataMapper {
    constructor(tdg) {
        super(tdg);
    }

    getById(id) {
        // TODO: get by id
    }

    async getAllWithOffset(offset) {
        return (await this.tdg.getAirlines(offset).then(rows => rows.map(r => this.#parseRow(r))))
    }

    #parseRow(row) {
        return new Airline(row.name, row.icao_code, row.iata_code);
    }
} 