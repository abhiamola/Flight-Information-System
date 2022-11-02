import { DataMapper } from "./dataMapper.js";
export class CityMapper extends DataMapper{
    
    constructor(tdg) {
        super(tdg);
    }

    getById(id) {
        // TODO: return city for ID
    }

    getAllForCountry(countryCode) {
        // TODO: return all cities for country code.
    }
}