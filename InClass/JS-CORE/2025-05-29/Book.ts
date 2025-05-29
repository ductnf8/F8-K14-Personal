import {Base, IBase} from "./base";

interface IBook extends IBase {
    getAuthor: () => string
    getAvailable: () => boolean
    setAuthor: (author: string) => void
    setAvailable: (available: boolean) => void
}

export class Book extends Base implements IBook {
    private author: string;
    private available: boolean;

    constructor(id: number, name: string, author: string, available: boolean = true) {
        super(id, name)
        this.author = author;
        this.available = available;
    }

    public getAuthor(): string {
        return this.author;
    }

    public setAuthor(author: string): void {
        this.author = author;
    }

    public getAvailable(): boolean {
        return this.available;
    }

    public setAvailable(available: boolean): void {
        this.available = available;
    }

    public toString() {
        return `Reader{
        id =${this.getId()}
        name = ${this.getName()}
        author = ${this.getAuthor()}
        available = ${this.getAvailable()}
        }`
    }
}
