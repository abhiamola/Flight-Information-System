export class Airline {
    
    constructor(name, icaoCode, iataCode) {
        if (!name && !icaoCode && !iataCode) {
            throw new Error("Airline constructor cannot be empty!")
        }
        this.name = name;
        this.icaoCode = icaoCode;
        this.iataCode = iataCode;
    }

}
