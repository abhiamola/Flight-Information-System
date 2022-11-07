export class Airport {
    constructor(iataCode, icaoCode, name, latitude, longitude, countryName) {
        if (!iataCode && !icaoCode && !name && !latitude && !longitude && !countryName) {
            throw new Error("Airport constructor cannot be empty!")
        }

        this.iataCode = iataCode;
        this.icaoCode = icaoCode;
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
        this.countryName = countryName;
        this.flights = [];
    }

    addFlight(flight) {
        this.flights.push(flight);
    }
}
