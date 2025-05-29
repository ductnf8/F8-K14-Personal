import {Base, IBase} from "./base";

export interface IReader extends IBase {
    getBorrowBooks: () => number[]
    setBorrowBooks: (borrowBooks: number[]) => void
}

export class Reader extends Base implements IReader {
    private borrowBooks: number[];

    constructor(id: number, name: string, borrowBooks: number[] = []) {
        super(id, name)
        this.borrowBooks = borrowBooks;
    }

    public getBorrowBooks(): number[] {
        return this.borrowBooks;
    }

    public setBorrowBooks(borrowBooks: number[]): void {
        this.borrowBooks = borrowBooks;
    }

    public toString() {
        return `Reader{
        id =${this.getId()}
        name = ${this.getName()}
        BorrowBooks = ${this.getBorrowBooks()}
        }`
    }

    public addBorrowBook(bookId: number): void {
        this.borrowBooks.push(bookId);
    }

    public removeBorrowBook(bookId: number): void {
        this.borrowBooks = this.borrowBooks.filter(id => id !== bookId);
    }
}
