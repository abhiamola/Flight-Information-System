export class Fleet {
    constructor(aircraftIata, aircraftIcao, hexID, manufacturer) {
        this.aircraftIata = aircraftIata;
        this.aircraftIcao = aircraftIcao;
        this.hexID = hexID;
        this.manufacturer = manufacturer;
    }

    setAirline(airline) {
        this.airline = airline;
    }
}
