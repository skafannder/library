let myLibrary = [];
let table = document.getElementById("library");

const addBookForm = document.querySelector("#add_book_form");
const openFormButton = document.querySelector("#open_button");
const addBookButton = document.querySelector("#add_book");
const cancelBookButton = document.querySelector("#cancel_book");


openFormButton.addEventListener("click", () => {
    addBookForm.style.display = "inline-block";
    openFormButton.disabled = true;
});

addBookButton.addEventListener("click", () => {
    handleBookCreation();
});

cancelBookButton.addEventListener("click", () => {
    hideForm();
});

function hideForm() {
    addBookForm.style.display = "none";
    openFormButton.disabled = false;
}

function clearInput() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("pages").value = 0;
    document.getElementById("status").value = "no";
}

function removeBook(e) {
    myLibrary.splice(e.target.id,1);
    render();
}


function Book(title, author, pages, ifRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.ifRead = ifRead;
}

Book.prototype.toggleRead = function () {
    this.ifRead = (this.ifRead === 'yes' ? 'no' : 'yes');
};

function toggleReadStatus(e) {
    myLibrary[e.target.id].toggleRead();
    render();
}


function addBookToLibrary(title, author, pages, ifRead) {
    myLibrary.push(new Book(title, author, pages, ifRead));
}

function render() {
    clearTable();
    for (let i = 0; i < myLibrary.length; i++) {
        createRow(i);
    }
}

function createRow(i) {
    let btn = document.createElement("BUTTON");
    btn.innerHTML = "x";
    btn.id = i;

    let btn2 = document.createElement("BUTTON");
    btn2.innerHTML = "x";
    btn2.id = i;

    let row = table.insertRow(i + 1);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    let cell5 = row.insertCell(4);
    cell4.style.width = "20px";
    cell5.style.width = "20px";
    cell1.innerHTML = myLibrary[i].title;
    cell2.innerHTML = myLibrary[i].author;
    cell3.innerHTML = myLibrary[i].pages;


    cell4.appendChild(btn2);
    btn2.innerHTML = myLibrary[i].ifRead;
    btn2.addEventListener("click", toggleReadStatus);

    cell5.appendChild(btn);
    btn.addEventListener("click", removeBook);
}


function clearTable() {
    while (table.rows.length > 1) {
        table.deleteRow(1);
    }
}

function handleBookCreation() {
    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let pages = document.getElementById("pages").value;
    let ifRead = document.getElementById("status").value;

    if (title === "") {
        alert("You need to specify a title");
    } else if (author === "") {
        alert("You need to specify an author");
    } else if (pages < 1 || Number.isNaN(pages)) {
        alert("Amount of pages must be a number");
    } else {
        addBookToLibrary(title, author, +pages, ifRead);
        hideForm();
        clearInput();
        render();
    }

}