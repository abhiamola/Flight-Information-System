import { DataMapper } from "./dataMapper.js";
import {Country} from "../models/country.js";
export class CountryMapper extends DataMapper {
    
    constructor(tdg) {
        super(tdg);
    }

    async getById(id) {
        const rows = await this.tdg.getCountryById(id);

        if (rows.length !== 1) {
            return null;
        }
        return new Country(rows[0].code, rows[0].code3, rows[0].name);
    }

    getForCity(cityId) {
        // TODO: get country by city id
    }
}