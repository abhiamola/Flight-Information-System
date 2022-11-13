import { DataMapper } from "./dataMapper.js";
import {Airport} from "../models/airport.js";
import {Airline} from "../models/airline.js";
import {Flight} from "../models/flight.js";
export class FlightMapper extends DataMapper {


    constructor(tdg) {
        super(tdg);
    }

    getFlights(offset = 0) {
        return this.tdg.getFlights(offset).then(res => res.map(r => this.#parseJoinRow(r)))
    }

    getById(id) {
        return this.tdg.getFlightForId(id).then(res => res.map(r => this.#parseJoinRow(r))).then(res => res[0])
    }

    getByDepAirport(airportID) {
        // TODO: get flights departing from this airport
    }

    getByArrAirport(airportID) {
        // TODO: get flights arriving to airport
    }

    getByAirline(airlineID) {
        // TODO: get flights arriving to airport
    }

    getByAirport(airportId) {
        return this.tdg.getFlightsForAirport(airportId).then(res => res.map(r => this.#parseJoinRow(r)))
    }

    #parseJoinRow(row) {
        const airline = new Airline(row.a_name, row.a_icao_code, row.a_iata_code);

        const depAirport = new Airport(row.departure_iata_code, row.departure_icao_code, row.departure_name, row.departure_lat, row.departure_lng, row.cDep_name)
        const arrAirport = new Airport(row.arrival_iata_code, row.arrival_icao_code, row.arrival_name, row.arrival_lat, row.arrival_lng, row.cArr_name)


        return new Flight(row.r_hex, row.r_reg_number, row.r_flag, row.r_lat, row.r_lng,  row.r_alt, row.r_dir,
            row.r_speed, row.r_v_speed, row.r_squawk, row.r_status, row.r_flight_iata, row.r_flight_icao,
            row.r_flight_number, airline, depAirport, arrAirport);
    }

}
