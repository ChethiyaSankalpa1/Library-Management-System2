let books = [];

function addBook(book) {
    let table = $("#bookTable tbody");
    table.append(`
        <tr id="${book.id}">
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.genre}</td>
            <td>${book.year}</td>
            <td>${book.quantity}</td>
            <td>
                <button class="btn btn-sm btn-warning editBtn" data-id="${book.id}">Edit</button>
                <button class="btn btn-sm btn-danger deleteBtn" data-id="${book.id}">Delete</button>
            </td>
        </tr>
    `);
}

function clearForm() {
    $("#bookForm")[0].reset(); // Clear all form inputs
}

function generateId() {
    return Math.floor(Math.random() * 1000000); // Generate a random ID
}

// Clear button event listener
$(document).on("click", "#clearBtn", function () {
    clearForm();
});

// Add book form submission
$("#bookForm").submit(function (e) {
    e.preventDefault(); // Prevent form from refreshing the page

    let book = {
        id: generateId(),
        title: $("#bookTitle").val(),
        author: $("#author").val(),
        genre: $("#genre").val(),
        year: $("#year").val(),
        quantity: $("#quantity").val(),
    };

    books.push(book);
    addBook(book);
    clearForm();
});

// Open the edit modal and populate fields
$(document).on("click", ".editBtn", function () {
    let bookId = $(this).data("id");
    let book = books.find((book) => book.id == bookId);

    if (book) {
        // Populate the modal fields with the selected book data
        $("#editBookTitle").val(book.title);
        $("#editAuthor").val(book.author);
        $("#editGenre").val(book.genre);
        $("#editYear").val(book.year);
        $("#editQuantity").val(book.quantity);
        $("#editBookId").val(book.id);

        // Show the modal
        $("#editModal").modal("show");
    }
});

// Save changes after editing
$(document).on("submit", "#editForm", function (e) {
    e.preventDefault();

    let bookId = $("#editBookId").val();
    let bookIndex = books.findIndex((book) => book.id == bookId);

    if (bookIndex !== -1) {
        // Update the book in the array
        let book = books[bookIndex];
        book.title = $("#editBookTitle").val();
        book.author = $("#editAuthor").val();
        book.genre = $("#editGenre").val();
        book.year = $("#editYear").val();
        book.quantity = $("#editQuantity").val();

        // Update the book row in the table
        let row = $(`#${book.id}`);
        row.find("td:eq(0)").text(book.title);
        row.find("td:eq(1)").text(book.author);
        row.find("td:eq(2)").text(book.genre);
        row.find("td:eq(3)").text(book.year);
        row.find("td:eq(4)").text(book.quantity);

        // Hide the modal
        $("#editModal").modal("hide");
    }
});

// Delete book functionality
$(document).on("click", ".deleteBtn", function () {
    let bookId = $(this).data("id");
    let bookIndex = books.findIndex((book) => book.id == bookId);

    if (bookIndex !== -1) {
        if (confirm(`Are you sure you want to delete "${books[bookIndex].title}"?`)) {
            books.splice(bookIndex, 1); // Remove the book from the array
            $(`#${bookId}`).remove(); // Remove the row from the table
        }
    }
});
