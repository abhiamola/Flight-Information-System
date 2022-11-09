const airline_rows = [
    {name: 'British Airways', icao_code: '1A2A', iata_code: '1A2AA'},
    {name: 'AirCanada', icao_code: 'CA2A', iata_code: 'CA2AA'},
    {name: 'Air France', icao_code: 'FA2A', iata_code: 'FA2AA'},
]

const airport_rows = [
    {a_name: 'Montreal International Airport', a_icao_code: 'YUL', a_iata_code: 'YULU', a_lat: 1, a_lng: 2, c_code: 'CA', c_name: 'Canada'},
    {a_name: 'Charles De Gaules', a_icao_code: 'CDG', a_iata_code: 'CDG12', a_lat: 5, a_lng: 7, c_code: 'FR', c_name: 'France'}
]

const country_rows = [
    {code: 'CA', code3: 'CAN', name: 'Canada'},
    {code: 'FR', code3: 'FRA', name: 'France'},
]

const flight_rows = [
    {a_name: 'British Airways', a_icao_code: '1A2A', a_iata_code: '1A2AA',
        departure_name: 'Montreal International Airport', departure_icao_code: 'YUL', departure_iata_code: 'YULU', departure_lat: 1, departure_lng: 2, cDep_name: 'Canada',
        arrival_name: 'Charles De Gaules', arrival_icao_code: 'CDG', arrival_iata_code: 'CDG12', arrival_lat: 5, arrival_lng: 7, cArr_name: 'France',
        r_hex: '0102AB', r_reg_number: 'a2jh33', r_lat: 123, r_lng: 222, r_alt: 2100, r_dir: 27, r_speed: 120, r_v_speed: 0, r_squawk: 'test', r_status: 'en route',
        r_flight_icao: "BA121", r_flight_number: '121', r_flight_iata: 'BA12121'
    },
    {a_name: 'Air France', a_icao_code: 'FA2A', a_iata_code: 'FA2AA',
        departure_name: 'Charles De Gaules', departure_icao_code: 'CDG', departure_iata_code: 'CDG12', departure_lat: 5, departure_lng: 7, cDep_name: 'France',
        arrival_name: 'Montreal International Airport', arrival_icao_code: 'YUL', arrival_iata_code: 'YULU', arrival_lat: 1, arrival_lng: 2, cArr_name: 'Canada',
        r_hex: '0102AC', r_reg_number: 'a2j233', r_lat: 223, r_lng: 212, r_alt: 0, r_dir: 1, r_speed: 0, r_v_speed: 0, r_squawk: 'test2', r_status: 'landed',
        r_flight_icao: "AF131", r_flight_number: '131', r_flight_iata: 'AF12121'
    }
]

export class TestGateway {
    // ============
    // COUNTRY CODE
    // ============
    getCountryById(id) {
        return new Promise(resolve => resolve(country_rows.filter(c => c.code === id)))
    }

    // ===========
    // AIRLINE CODE
    // ===========

    getAirlines(offset = 0) {
        return new Promise(resolve => resolve(airline_rows))

    }

    getAirlineByICAO(icao) {
        return new Promise(resolve => resolve(airline_rows.filter(a => a.icao_code === icao)))
    }


    // ============
    // FLIGHTS CODE
    // ============

    getFlights(offset = 0) {
        return new Promise(resolve => resolve(flight_rows))
    }

    getFlightForId(id) {
        return new Promise(resolve => resolve(flight_rows.filter(f => f.r_hex === id)))
    }

    getFlightsForAirport(airport) {
        return new Promise(resolve => resolve(flight_rows.filter(f => f.departure_icao_code === airport || f.arrival_icao_code === airport)))
    }

    // =============
    // AIRPORTS CODE
    // =============

    getAirportsForCountry(countryCode) {
        return new Promise(resolve => resolve(airport_rows.filter(f => f.c_code === countryCode)))
    }
}

