import { readDataFromDB } from "./firebase.js";

const searchInput = document.querySelector(".searchInput");
const searchBtn = document.querySelector(".searchBtn");
const bookName = document.querySelector(".bookName");
const personName = document.querySelector(".personName");
const bookTitle = document.querySelector(".bookTitle");
const rightDiv = document.querySelector(".rightDiv");
const books = document.querySelector(".books");

const swiperBooks = document.querySelector(".swiperBooks");

searchBtn.addEventListener("click", () => {
  const searchBookItems = searchInput.value;
  searchBook(searchBookItems);
});

async function searchBook(inputValue) {
  let data = await readDataFromDB("books/");

  let matchCount = 0;


  let filtered = data.filter((item) => {

    return item.title.toLowerCase().includes(inputValue.toLowerCase());
  });

  console.log(filtered);
  
  
  render(filtered);
}

function render(items) {
  swiperBooks.innerHTML = items
    ? items
        .map((item) => {
          return `
        <div class="swiper-slide books">
                <img
                class="bookImg"
                src="${
                  item.img ||
                  "default_image.jpg"
                }"
                alt=""
              />
  
              <div class="textDiv">
                <h2 class="bookName">${item.title}</h2>
                <p class="personName">${
                  item.author
                    ? item.author
                    : "Muellif bilinmir"
                }</p>
                <span class="bookTitle"
                  >${item.description || "Aciqlama yoxdur"}</span
                >
            
            </div>
          
        </div> `;
        })
        .join("")
    : "";
}
