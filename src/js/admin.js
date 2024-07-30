const loginContainer = document.querySelector(".loginContainer");
const loginBtn = document.querySelector(".loginBtn");
const genreSelect = document.querySelector(".genreSelect");
const adminPanel = document.querySelector(".adminPanel");
adminPanel.style = "display: none";

const hamburger = document.querySelector(".hamburger");
const leftSide = document.querySelector(".leftSide");
const backDiv = document.querySelector(".backDiv");

const closeNavBtn = document.querySelector(".closeIcon");

const bookGenres = [
  "Adventure",
  "Biography",
  "Classics",
  "Comic Book",
  "Crime",
  "Drama",
  "Fantasy",
  "Historical Fiction",
  "Horror",
  "Mystery",
  "Non-Fiction",
  "Poetry",
  "Romance",
  "Science Fiction",
  "Self-Help",
  "Thriller",
  "Travel",
  "Western",
  "Young Adult",
];

loginBtn.addEventListener("click", () => {
  openPanel();
});

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

function openPanel() {
  loginContainer.style = "display: none";
  adminPanel.style = "display: flex";
}

function loadGenres() {
  for (let i = 0; i < bookGenres.length; i++) {
    let option = document.createElement("option");
    option.value = bookGenres[i];
    option.text = bookGenres[i];
    genreSelect.appendChild(option);
  }
}

loadGenres();

// get data from api

const searchInput = document.querySelector(".searchInput");
const searchBtn = document.querySelector(".searchBtn");
const resultContainer = document.querySelector(".resultContainer");

const bookTitle = document.querySelector(".bookTitle");
const bookAuthor = document.querySelector(".bookAuthor");
const bookUrl = document.querySelector(".bookUrl");
const bookDesc = document.querySelector(".bookDesc");

bookDesc;

searchBtn.addEventListener("click", () => {
  resultContainer.innerHTML = "Please Wait...";
  let inputValue = searchInput.value;
  searchEngine(inputValue);
});

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

function renderItems(items) {
  resultContainer.innerHTML = items
    ? items.map((arrItem) => {
          return ` 
            <p data="${encodeURIComponent(JSON.stringify(arrItem.volumeInfo) )  }" class="resultItem"><span><i class='bx bx-time-five'></i></span> ${
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
        console.log(obj);
        setUpItem(
          obj.title,
          obj.authors ? obj.authors[0] : "No author",
          obj.imageLinks ? obj.imageLinks : {thumbnail: "No image url"},
          obj.description ? encodeURIComponent(obj.description) : "No description"
        );
      });
    });
  }
}

function setUpItem(title, author, image, description) {
  bookTitle.value = title;
  bookAuthor.value = author;
  bookUrl.value = image.thumbnail;
  bookDesc.value = decodeURIComponent(description);
}



