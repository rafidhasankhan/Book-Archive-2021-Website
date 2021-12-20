const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('search-btn');
const booksContainer = document.getElementById('books-container');
const spinner = document.getElementById("spinner");
const searchResult = document.getElementById('search-result');
const errorDiv = document.getElementById('error');


searchBtn.addEventListener("click", function () {
    const textSearch = searchInput.value;

    //    dom clear
    if (textSearch === '') {
        errorDiv.innerText = "Search field cannot be empty.";
        return;
    }

    //   Clear
    booksContainer.innerHTML = "";
    searchResult.innerHTML = "";

    const url = `https://openlibrary.org/search.json?q=${textSearch}`;
    spinner.classList.remove("d-none");
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            // Setting a timer of 1.5s, before removing the spinnner, and showing data
            setTimeout(() => {
                spinner.classList.add("d-none");
                showData(data);
            }, 1500);
        })
        .finally(() => {
            searchInput.value = '';
        });
});

const showData = (data) => {
   
    // Error Handeling
    if (data.numFound === 0) {
        errorDiv.innerText = "NO Result Found";
    }
    else {
        errorDiv.innerText = "";
        searchResult.innerHTML =   `<h3>SEARCH RESULT: ${data.docs.length}</h3>`;
    }
    const books = data.docs;
    books.forEach((book) => {
        const div = document.createElement('div');
        div.classList.add('col-md-4');
        div.innerHTML =
            `<div class="rounded overflow-hidden border p-2">
                  <img
                   src= "https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg"
                     class="w-100 " 
                    alt=""/>
             </div>
                                        
            <div class="py-2 d-flex justify-content-between align-items-center d-md-block text-md-center">                     
                <h6 class="text-success">Book Name:  ${book.title}</h6>
                <p class="text-warning">Author Name : ${book.author_name}</p>
                <p><small>Publisher :  ${book.publisher} </small></p>
                <p><small>First publish year: ${book.first_publish_year} </small></p>
            </div>     
                                 `
        booksContainer.appendChild(div);
    });
};