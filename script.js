const myLibrary = [];

const htmlTable = document.getElementById("library-table");
const htmlTableBody = document.getElementById("library-table-body");

function Book(title, author, pages, read) {
    if (!new.target) {
        throw Error("Use the 'new' operator to call the constructor");
    }

    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read ? "read" : "not read yet";
}

Book.prototype.info = function () {
    return `${this.title} by ${this.author}, ${this.pages}, ${this.read}`;
}

function addBookToLibrary(title, author, pages, read) {
    let newBook = new Book(
        title,
        author,
        pages,
        read
    )
    console.log(newBook.info());
    myLibrary.push(newBook);
    console.log(`Pushed ${title} to MyLibrary`);
}

/* Simulate non-empty Library */
function putDummyBooks() {
    addBookToLibrary(
        "The Hobbit",
        "J.R.R. Tolkien",
        295,
        false);

    addBookToLibrary(
        "1984",
        "George Orwell",
        328,
        true);

    addBookToLibrary(
        "To Kill a Mockingbird",
        "Harper Lee",
        281,
        false);

    addBookToLibrary(
        "The Great Gatsby",
        "F. Scott Fitzgerald",
        180,
        true);

    addBookToLibrary(
        "Moby Dick",
        "Herman Melville",
        635,
        false);

    addBookToLibrary(
        "Pride and Prejudice",
        "Jane Austen",
        279,
        true);
}

putDummyBooks();
console.table(myLibrary);