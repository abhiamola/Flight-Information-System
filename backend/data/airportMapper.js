import { DataMapper } from "./dataMapper.js";
export class AirportMapper extends DataMapper {
    
    constructor(tdg) {
        super(tdg);
    }

    getByID(id) {
        // TODO: get airport by id
    }

    getAllForCountry(countryCode) {
        // TODO: get airport by country code
    }
}