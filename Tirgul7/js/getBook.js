
function getBookId() {
    const params = new URLSearchParams(window.location.search);
    return params.get('bookId');
}

function showSelectedBook(data) {
    const selectionBookId = getBookId();
    let bookName = '';
    let bookPrice = '';

    for (const product of data.products) {
        if (product.id == selectionBookId) {
            bookName = product.name;
            bookPrice = product.price;
            break;
        }
    }

    document.querySelector("h1").innerHTML = bookName;
    document.querySelector("#bookPrice").innerHTML = bookPrice;
}

window.onload = () => {
    fetch("../data/books.json")
        .then(response => response.json())
        .then(data => showSelectedBook(data));
}
