interface Common {
    id: number;
    name: string;
}

class Book implements Common {
    id: number;
    name: string;
    author: string;
    available: boolean;

    constructor(id: number, name: string, author: string, available: boolean = true) {
        this.id = id;
        this.name = name;
        this.author = author;
        this.available = available;
    }
}

class Reader implements Common {
    id: number;
    name: string;
    borrowed_books: Book[] = [];

    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
}

class Library {
    books: Book[] = [];
    readers: Reader[] = [];

    add_book(book: Book): void {
        this.books.push(book);
    }

    add_reader(reader: Reader): void {
        this.readers.push(reader);
    }

    borrow_book(reader_id: number, book_id: number): boolean {
        const reader = this.readers.find(r => r.id === reader_id);
        const book = this.books.find(b => b.id === book_id);

        if (!reader || !book) {
            console.log("Reader or book not found.");
            return false;
        }

        if (!book.available) {
            console.log("Book is not available.");
            return false;
        }

        book.available = false;
        reader.borrowed_books.push(book);
        return true;
    }

    return_book(reader_id: number, book_id: number): void {
        const reader = this.readers.find(r => r.id === reader_id);
        const book = this.books.find(b => b.id === book_id);

        if (!reader || !book) {
            console.log("Reader or book not found.");
            return;
        }

        const index = reader.borrowed_books.findIndex(b => b.id === book_id);
        if (index === -1) {
            console.log("Book was not borrowed by this reader.");
            return;
        }

        // Remove book from reader's borrowed list
        reader.borrowed_books.splice(index, 1);
        // Mark the book as available
        book.available = true;
    }

    list_available_books(): void {
        const available_books = this.books.filter(b => b.available);
        console.log("Available books:");
        for (const book of available_books) {
            console.log(`ID: ${book.id}, Title: ${book.name}, Author: ${book.author}`);
        }
    }
}
