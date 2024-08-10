import { readDataFromDB } from "./firebase.js";

const bookSlideLine = document.querySelectorAll(".bookSlideLine");
const sliderNextImg = document.querySelectorAll(".sliderNextImg");
const sliderPreviusImg = document.querySelectorAll(".sliderPreviusImg");
let card = document.querySelectorAll(".card");
const categoryList = document.querySelector(".categoryList");

let bookCategories;
let btnRedMore = document.querySelectorAll(".readMoreBtn");

for (let i = 0; i < bookSlideLine.length; i++) {
  sliderNextImg[i].addEventListener("click", () => {
    bookSlideLine[i].scrollLeft += 210;
    buttonHider();
  });

  sliderPreviusImg[i].addEventListener("click", () => {
    bookSlideLine[i].scrollLeft -= 210;
    buttonHider();
  });

  bookSlideLine[i].addEventListener("wheel", (e) => {
    if (e.deltaY > 0) {
      bookSlideLine[i].scrollLeft += 210;
      buttonHider();
    } else {
      bookSlideLine[i].scrollLeft -= 210;
      buttonHider();
    }
  });
}

let newBooksList = [];
let bestBookList = [];

function buttonHider() {
  for (let i = 0; i < bookSlideLine.length; i++) {
    if (bookSlideLine[i].scrollLeft == 0) {
      sliderPreviusImg[i].style = "visibility: hidden";
    } else {
      sliderPreviusImg[i].style = "visibility: visible";
    }
    if (
      bookSlideLine[i].scrollLeft + bookSlideLine[i].offsetWidth >
      bookSlideLine[i].scrollWidth
    ) {
      sliderNextImg[i].style = "visibility: hidden";
    } else if (bookSlideLine[i].scrollWidth == bookSlideLine[i].offsetWidth) {
      sliderNextImg[i].style = "visibility: hidden";
    } else {
      sliderNextImg[i].style = "visibility: visible";
    }
  }
}

async function loadCategories() {
  categoryList.innerHTML = `<a data-name="All" class="bookCategories">All</a>`;

  let data = await readDataFromDB("genres/");
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
              <a href="../pages/bookInfo.html" id="${item.id}" class="btn btn-primary readMoreBtn">Read More</a>
            </div>
          </div >

        `;
    })
    .join("");

  bookSlideLine[2].innerHTML = newBooksData
    .map((item) => {
      return `
        <div class="card" >
            ${item.isNew == true ? '<div class="newIcon"><p>NEW</p></div>' : ""}
            <img
              src=${item.img}
              class="card-img-top"
              alt="..."
            />
            <div class="card-body">
              <h5 class="card-title">${item.title}</h5>
              <p class="card-text">${item.author}</p>
              <a href="../pages/bookInfo.html" id="${
                item.id
              }" class="btn btn-primary readMoreBtn"
                >Read More</a
              >
            </div>
          </div >`;
    })
    .join("");

  btnRedMore = document.querySelectorAll(".readMoreBtn");
  for (let i = 0; i < btnRedMore.length; i++) {
    btnRedMore[i].addEventListener("click", () => {
      let id = btnRedMore[i].id;
      localStorage.setItem("bookId", id);
      window.location.href = "../pages/bookInfo.html";
    });
  }
}

function renderAllBooks(data) {
  if (data.length == 0) {
    bookSlideLine[0].innerHTML =
      "<p style='text-align: center'>No Books Found</p>";
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
              <a href="../pages/bookInfo.html" id="${
                item.id
              }" class="btn btn-primary readMoreBtn"
                >Read More</a
              >
            </div>
          </div >
                `;
      })
      .join("");
  }

  btnRedMore = document.querySelectorAll(".readMoreBtn");
  for (let i = 0; i < btnRedMore.length; i++) {
    btnRedMore[i].addEventListener("click", () => {
      let id = btnRedMore[i].id;
      localStorage.setItem("bookId", id);
      window.location.href = "../pages/bookInfo.html";
    });
  }
  buttonHider();
}

// getBooks();
