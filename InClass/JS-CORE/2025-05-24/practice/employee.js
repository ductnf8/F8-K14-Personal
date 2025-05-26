export class Employee{
    getId() {
        return this.#id;
    }


    getName() {
        return this.#name;
    }

    setname(name) {
        this.#name = name;
    }

    getAddress() {
        return this.#address;
    }

    setAddress(address) {
        this.#address = address;
    }

    #id;
    #name;
    #address;

    constructor(id, name, address) {
        this.#id = id;
        this.#name = name;
        this.#address = address;
    }

    toString (){
        return `Employee (id =${this.#id}, name = ${this.#name}, address = ${this.#address})`
    }

}