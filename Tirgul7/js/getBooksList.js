/* window.onload = () => {
    fetch("data/books.json")                    //fetch is asynchronous which means (webpage still runs at the same time that the fetch is being called)
        .then(response => response.json())      // fetch returns object (Promise) promise is either success or failure (response has the answer)
        .then(data => console.log(data));
}; */




/////////////////////////////////////////////////////////////////////////////////////
function showData(data) {
    document.querySelector("h1").innerHTML = `${data.category}`;

    const selectFrag = document.createDocumentFragment();
    const booksSelect = document.createElement('select');
    booksSelect.setAttribute('id', 'booksSelect');
    selectFrag.appendChild(booksSelect);

    // Create a default option
    const defaultOption = document.createElement('option');
    defaultOption.text = "Select a book";
    defaultOption.disabled = true;
    defaultOption.selected = true;
    booksSelect.appendChild(defaultOption);

    // Populate the select element with options
    for (const product of data.products) {
        const option = document.createElement('option');
        option.value = product.id;
        option.textContent = product.name;
        booksSelect.appendChild(option);
    }

    document.getElementsByTagName("main")[0].appendChild(selectFrag);

    // Add event listener to show selected book details
    booksSelect.addEventListener('change', (event) => {
        const bookId = event.target.value;
        window.location.href = `book.html?bookId=${bookId}`;
    });
}

window.onload = () => {
    fetch("../data/books.json")
        .then(response => response.json())
        .then(data => showData(data));
}
