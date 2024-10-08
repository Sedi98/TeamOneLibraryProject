



const hamburger = document.querySelector(".hamburger");
const leftSide = document.querySelector(".leftSide");
const backDiv = document.querySelector(".backDiv");

const closeNavBtn = document.querySelector(".closeIcon");

// const bookGenres = [
//   "Adventure",
//   "Biography",
//   "Classics",
//   "Comic Book",
//   "Crime",
//   "Drama",
//   "Fantasy",
//   "Historical Fiction",
//   "Horror",
//   "Mystery",
//   "Non-Fiction",
//   "Poetry",
//   "Romance",
//   "Science Fiction",
//   "Self-Help",
//   "Thriller",
//   "Travel",
//   "Western",
//   "Young Adult",
// ];



hamburger.addEventListener("click", () => {
  toggleMenu();
});

closeNavBtn.addEventListener("click", () => {
  toggleMenu();
});

backDiv.addEventListener("click", () => {
  toggleMenu();
});

function toggleMenu() {
  leftSide.classList.toggle("activeNav");
  backDiv.classList.toggle("activeBack");
}





// get data from api
// 
const searchInput = document.querySelector(".searchInput");
const searchBtn = document.querySelector(".searchBtn");
const resultContainer = document.querySelector(".resultContainer");
// add book inputs
const bookTitle = document.querySelector(".bookTitle");
const bookAuthor = document.querySelector(".bookAuthor");
const bookUrl = document.querySelector(".bookUrl");
const bookDesc = document.querySelector(".bookDesc");
const addGenreBtn = document.querySelector(".addGenreBtn");
const removeGenreBtn = document.querySelector(".removeGenreBtn");
const genreContainer = document.querySelector(".genreContainer");







//  create a function when page loads show old searched items from local storage
function getSearchHistory() {
  let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
  renderSearchHistory(searchHistory.reverse());
}

function renderSearchHistory(searchData) {
  
  resultContainer.innerHTML =
    searchData.length > 0
      ? searchData
          .map((data) => {
            return `<p class="resultItem" onclick="setInputToSearch('${data}')" > <span><i class='bx bx-time-five' ></i></span>   ${data}</p>`;
          })
          .join("")
      : "No History Found";
}

function saveSearchResultToStorage(title) {
  let searchHistory = JSON.parse(localStorage.getItem("searchHistory")) || [];
  if (searchHistory.includes(title)) {
    console.log(searchHistory.indexOf(title));
    let spliced = searchHistory.splice(searchHistory.indexOf(title), 1);
    console.log(spliced);
  }
  searchHistory.push(title);
  localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
}

function setInputToSearch(data) {
  searchInput.value = data;
  searchEngine(searchInput.value);
}

// get searched data from google books api
function searchEngine(searchVal) {
  fetch(`https://www.googleapis.com/books/v1/volumes?q=${searchVal}`, {
    method: "GET",
  })
    .then((resp) => resp.json())
    .then((data) => {
      resultContainer.innerHTML = "";
      renderItems(data.items);
    });
}
 
// render searched items
function renderItems(items) {
  resultContainer.innerHTML = items
    ? items
        .map((arrItem) => {
          return ` 
            <p data="${encodeURIComponent(
              JSON.stringify(arrItem.volumeInfo)
            )}" class="resultItem"><span><i class='bx bx-search-alt'></i></span> ${
            arrItem.volumeInfo.title
          } </p>
    `;
        })
        .join("")
    : "No results found";

  if (items) {
    let resultItems = document.querySelectorAll(".resultItem");

    resultItems.forEach((item) => {
      item.addEventListener("click", () => {
        let data = item.getAttribute("data");
        let obj = JSON.parse(decodeURIComponent(data));
        saveSearchResultToStorage(obj.title);
        setUpItem(
          obj.title,
          obj.authors ? obj.authors[0] : "No author",
          obj.imageLinks ? obj.imageLinks : { thumbnail: "https://www.ribabooks.com/images/thumbs/def/default-image_600.png" },
          obj.description
            ? encodeURIComponent(obj.description)
            : "No description"
        );
      });
    });
  }
}

// set up searched items on add new book section
function setUpItem(title, author, image, description) {
  bookTitle.value = title;
  bookAuthor.value = author;
  bookUrl.value = image.thumbnail;
  bookDesc.value = decodeURIComponent(description);
}

// when page loads get history data
getSearchHistory();

// when click on search button
searchBtn.addEventListener("click", () => {
  searchEngine(searchInput.value);
});

// if input is empty show searched books
searchInput.addEventListener("keyup", (event) => {
  if (searchInput.value === "") {
    getSearchHistory();
  }

  if (event.key === "Enter") {
    resultContainer.innerHTML = "Please Wait...";
    searchEngine(searchInput.value);
  }
});







