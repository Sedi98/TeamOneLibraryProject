import { readDataFromDB } from "./firebase.js";

const bookSlideLine = document.querySelectorAll(".bookSlideLine");
const sliderNextImg = document.querySelectorAll(".sliderNextImg");
const sliderPreviusImg = document.querySelectorAll(".sliderPreviusImg");
let card = document.querySelectorAll(".card");
const categoryList = document.querySelector(".categoryList");

let bookCategories;

console.log(card[0].offsetWidth);

for (let i = 0; i < bookSlideLine.length; i++) {
  sliderNextImg[i].addEventListener("click", () => {
    bookSlideLine[i].scrollLeft += 220;
    buttonHider();
  });

  sliderPreviusImg[i].addEventListener("click", () => {
    bookSlideLine[i].scrollLeft -= 220;
    buttonHider();
  });
}

let newBooksList = [];
let bestBookList = [];

function buttonHider() {
  console.log(bookSlideLine[0].scrollWidth);
  console.log(bookSlideLine[1].scrollWidth);

  for (let i = 0; i < bookSlideLine.length; i++) {
    if (bookSlideLine[i].scrollLeft == 0) {
      sliderPreviusImg[i].style = "display: none";
    } else {
      sliderPreviusImg[i].style = "display: block";
    }

    if (
      bookSlideLine[i].scrollLeft + bookSlideLine[i].offsetWidth >
      bookSlideLine[i].scrollWidth
    ) {
      sliderNextImg[i].style = "display: none";
    } else if (bookSlideLine[i].scrollWidth == bookSlideLine[i].offsetWidth) {
      sliderNextImg[i].style = "display: none";
    } else {
      sliderNextImg[i].style = "display: block";
    }
  }
}

async function loadCategories() {
  categoryList.innerHTML = `<a data-name="All" class="bookCategories">All</a>`;

  let data = await readDataFromDB("genres/");

  console.log(data);

  categoryList.innerHTML += data
    .map((item) => {
      return `<a data-name="${item.name}" class="bookCategories">${item.name}</a>`;
    })
    .join("");

  loadBooks("All", data);

  bookCategories = document.querySelectorAll(".bookCategories");

  for (let i = 0; i < bookCategories.length; i++) {
    bookCategories[i].addEventListener("click", () => {
      loadBooks(bookCategories[i].dataset.name);
    });
  }
}

loadCategories();
getAllBooks();

async function getAllBooks() {
  let data = await readDataFromDB("books/");

  data?.forEach((item) => {
    if (item.isNew == true) {
      newBooksList.push(item);
    }
    if (item.isBestSeller == true) {
      bestBookList.push(item);
    }
  });

  renderPriorityBooks(bestBookList, newBooksList);
  loadBooks("All", data);
}

async function loadBooks(param = "All", bookData) {
  let data = bookData || (await readDataFromDB("books/"));
  
  if (param != "All") {
    data = data.filter((item) => item.genre.includes(param));
    console.log(data);
  }

  if (data.length != 0) {
    renderAllBooks(data);
  } else {
    renderAllBooks([]);
  }
}

function renderPriorityBooks(bestBookData, newBooksData) {
  bookSlideLine[1].innerHTML = bestBookData
    .map((item) => {
      return `

        <div div class="card" >
            ${item.isNew == true ? '<div class="newIcon"><p>NEW</p></div>' : ""}

            <img
              src=${item.img}
              class="card-img-top"
              alt="..."
            />
            <div class="card-body">
              <h5 class="card-title">${item.title}</h5>
              <p class="card-text">${item.author}</p>
              <a href="../pages/bookInfo.html" onclick="setBookInfo(${
                item.id
              })" class="btn btn-primary"
                >Read More</a
              >
            </div>
          </div >
                `;
    })
    .join("");

  bookSlideLine[2].innerHTML = newBooksData
    .map((item) => {
      return `

        <div div class="card" >
            ${item.isNew == true ? '<div class="newIcon"><p>NEW</p></div>' : ""}

            <img
              src=${item.img}
              class="card-img-top"
              alt="..."
            />
            <div class="card-body">
              <h5 class="card-title">${item.title}</h5>
              <p class="card-text">${item.author}</p>
              <a href="../pages/bookInfo.html" onclick="setBookInfo(${
                item.id
              })" class="btn btn-primary"
                >Read More</a
              >
            </div>
          </div >
                `;
    })
    .join("");
}

function renderAllBooks(data) {
  if (data.length == 0) {
    bookSlideLine[0].innerHTML = "<p style='text-align: center'>No Books Found</p>";
  } else {
    bookSlideLine[0].innerHTML = data
      .map((item) => {
        return `

        <div div class="card" >
            ${item.isNew == true ? '<div class="newIcon"><p>NEW</p></div>' : ""}

            <img
              src=${item.img}
              class="card-img-top"
              alt="..."
            />
            <div class="card-body">
              <h5 class="card-title">${item.title}</h5>
              <p class="card-text">${item.author}</p>
              <a href="../pages/bookInfo.html" onclick="setBookInfo(${
                item.id
              })" class="btn btn-primary"
                >Read More</a
              >
            </div>
          </div >
                `;
      })
      .join("");
  }

  buttonHider();
}

// getBooks();
