interface Master {
    // id: number
    // name: string
}

interface Person extends Master {
    getId: () => number
    getName: () => string
    setName: (name: string) => void
}

class PersonEntity implements Person {
    private id: number
    private name: string

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }

    getId(): number {
        return this.id
    }

    getName(): string {
        return this.name
    }

    setName(name: string): void {
        this.name = name
    }
}

const pe: PersonEntity = new PersonEntity(1, 'name')
console.log(pe)