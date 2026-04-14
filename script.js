const myLibrary = [];

const htmlTable = document.getElementById("library-table");
const htmlTableBody = document.getElementById("library-table-body");

let emptyCell;

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

function loadBooks(books) {
    let table = htmlTableBody;
    let row = table.insertRow(0);
    let rowNum = 0;

    books.map((book) => {
        row = table.insertRow(rowNum);
        row.insertCell(0).innerText = `${book.id}`;
        row.insertCell(1).innerText = `${book.title}`;
        row.insertCell(2).innerText = `${book.author}`;
        row.insertCell(3).innerText = `${book.pages}`;
        row.insertCell(4).innerText = `${book.read}`;
        rowNum++;
    });

}

loadBooks(myLibrary);