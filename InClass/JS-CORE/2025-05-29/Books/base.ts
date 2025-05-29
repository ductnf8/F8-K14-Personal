export interface IBase {
    getId: () => number;
    getName: () => string
    setName: (name: string) => void
    toString: () => string
}

export abstract class Base implements IBase {
    private readonly id: number;
    private name: string;

    protected constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }

    public getId(): number {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public abstract toString()

}