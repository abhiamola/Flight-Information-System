export class DataMapper {
    #tdg
    constructor(tdg) {
        if (new.target === DataMapper) {
            throw new Error("DataMapper is abstract and cannot be instantiated.")
        }
        this.#tdg = tdg;
    }

    get tdg() {
        return this.#tdg;
    }

    
}