export class Airline {
    
    constructor(name, icaoCode, iataCode) {
        if (!name && !icaoCode && !iataCode) {
            throw new Error("Airline constructor cannot be empty!")
        }
        this.name = name;
        this.icaoCode = icaoCode;
        this.iataCode = iataCode;
        this.fleets = [];
        this.flights = [];
    }

    addFlight(flight) {
        this.flights.push(flight);
    }

    addFleet(fleet) {
        this.fleets.push(fleet);
    }
}
