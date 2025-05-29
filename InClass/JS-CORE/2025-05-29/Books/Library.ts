export interface ILibrary {
    getBooks: () => number[]
    getReaders: () => number[]
    setBooks: (books: number[]) => void
    setReader: (readers: number[]) => void
}

export class Library {
    private books: number[];
    private readers: number[];

    constructor(books: number[] = [], readers: number[] = []) {
        this.books = books;
        this.readers = readers;
    }

    public getBooks(): number[] {
        return this.books;
    }

    public setBooks(books: number[]): void {
        this.books = books;
    }

    public addBook(bookId: number): void {
        this.books.push(bookId);
    }

    public removeBook(bookId: number): void {
        this.books = this.books.filter(id => id !== bookId);
    }

    public getReaders(): number[] {
        return this.readers;
    }

    public setReaders(readers: number[]): void {
        this.readers = readers;
    }

    public addReader(readerId: number): void {
        this.readers.push(readerId);
    }

    public removeReader(readerId: number): void {
        this.readers = this.readers.filter(id => id !== readerId);
    }
}
