const myLibrary = [];
const htmlTable = document.getElementById("library-table");
const htmlTableBody = document.getElementById("library-table-body");
const addDialog = document.getElementById("add-book");
const formInputs = addDialog.querySelectorAll("input");
const addBtn = document.getElementById("add-btn");
const clearAllBtn = document.getElementById("clearLibrary");

clearAllBtn.addEventListener("click", (e) => {
    clearLibrary();
});

htmlTableBody.addEventListener("click", (e) => {
    let target = e.target;
    if (target.tagName === "BUTTON" && target.classList.contains("delete-btn")) {
        deleteBookById(target.dataset.id);
    }

    if (target.tagName === "BUTTON" && target.classList.contains("read-btn")) {
        let readStatus = target.dataset.status === "true" ? false : true;
        updateStatusById(target.dataset.id, readStatus);
    }
});

let bookEntry = [];
addBtn.addEventListener("click", (e) => {
    e.preventDefault();
    for (let i = 0; i < 3; i++) {
        console.log(formInputs[i].value);
        if (formInputs[i].value === "" && i < 3) {
            break;
        }
        else {
            bookEntry.push(formInputs[i].value);
        }
    }

    if (formInputs[3].checked > formInputs[4].checked) {
        bookEntry.push(formInputs[3].value);
        addBookToLibrary(...bookEntry);
        loadBooks(myLibrary);
        bookEntry = [];
    }
    else if (formInputs[3].checked < formInputs[4].checked) {
        bookEntry.push(formInputs[4].value);
        addBookToLibrary(...bookEntry);
        loadBooks(myLibrary);
        bookEntry = [];
    }
    console.log("\n");

});

function clearTableBody() {
    while (htmlTableBody.hasChildNodes()) {
        htmlTableBody.removeChild(htmlTableBody.firstChild);
    }
}

function clearLibrary() {
    myLibrary.length = 0;
    loadBooks(myLibrary);
}

function Book(title, author, pages, read) {
    if (!new.target) {
        throw Error("Use the 'new' operator to call the constructor");
    }

    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    /*Somehow the read booleans became strings*/
    this.read = read;

}
Book.prototype.info = function () {
    return `${this.title} by ${this.author}, ${this.pages}, ${this.read}`;
}

function addBookToLibrary(title, author, pages, read) {
    if (arguments.length === 4) {
        console.log(`${arguments.length}`);
        let newBook = new Book(
            title,
            author,
            pages,
            read
        )
        myLibrary.push(newBook);
        console.log(`Pushed ${title} to MyLibrary`);
    }

}

function loadBooks(books) {
    let table = htmlTableBody;
    let row = table.insertRow(0);
    let rowNum = 0;

    clearTableBody();
    books.map((book) => {
        const deleteBtn = document.createElement("button");
        deleteBtn.setAttribute("type", "button");
        deleteBtn.setAttribute("data-id", book.id);
        deleteBtn.innerText = "Delete";
        deleteBtn.classList.add("delete-btn", "btn");
        
        const readBtn = document.createElement("button");
        readBtn.setAttribute("type", "button");
        readBtn.setAttribute("class", "btn");
        readBtn.setAttribute("data-id", book.id);
        readBtn.setAttribute("data-status", book.read);
        readBtn.setAttribute("title", "Click to Switch Read Status");
        readBtn.innerText = book.read === "true" ? "read" : "not read yet";
        readBtn.classList.add("read-btn", "btn");

        row = table.insertRow(rowNum);
        row.insertCell(0).appendChild(deleteBtn);
        row.insertCell(1).innerText = `${book.id}`;
        row.insertCell(2).innerText = `${book.title}`;
        row.insertCell(3).innerText = `${book.author}`;
        row.insertCell(4).innerText = `${book.pages}`;
        row.insertCell(5).appendChild(readBtn);
        rowNum++;
    });

}

function deleteBookById(id) {
    let bookIndex = myLibrary.findIndex(book => book.id === id);
    myLibrary.splice(bookIndex, 1);
    loadBooks(myLibrary);
}

function updateStatusById(id, readStatus) {
    let bookIndex = myLibrary.findIndex(book => book.id === id);
    myLibrary[bookIndex].read = readStatus.toString();
    loadBooks(myLibrary);
}

/* Simulate non-empty Library */
function putDummyBooks() {
    addBookToLibrary(
        "The Hobbit",
        "J.R.R. Tolkien",
        295,
        "false");

    addBookToLibrary(
        "1984",
        "George Orwell",
        328,
        "true");

    addBookToLibrary(
        "To Kill a Mockingbird",
        "Harper Lee",
        281,
        "false");

    addBookToLibrary(
        "The Great Gatsby",
        "F. Scott Fitzgerald",
        180,
        "true");

    addBookToLibrary(
        "Moby Dick",
        "Herman Melville",
        635,
        "false");

    addBookToLibrary(
        "Pride and Prejudice",
        "Jane Austen",
        279,
        "true");
}
putDummyBooks();
console.table(myLibrary);

loadBooks(myLibrary);