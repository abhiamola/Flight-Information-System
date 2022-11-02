export class Flight {

    constructor(hexCode, regNumber, flag, lat, lng, alt, dir, speed, vSpeed, squawk, status, iataCode, icaoCode, flightNumber, airline, departureAirport, arrivalAirport) {
        this.hexCode = hexCode;
        this.regNumber = regNumber;
        this.flag = flag;
        this.lat = lat;
        this.lng = lng;
        this.alt = alt;
        this.dir = dir;
        this.speed = speed;
        this.vSpeed = vSpeed;
        this.squawk = squawk;
        this.status = status;
        this.iataCode = iataCode;
        this.icaoCode = icaoCode;
        this.flightNumber = flightNumber;
        this.airline = airline;
        this.departureAirport = departureAirport;
        this.arrivalAirport = arrivalAirport;
    }
}
