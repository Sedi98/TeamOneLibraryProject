import { readDataFromDB } from "./firebase.js";

const bookSlideLine = document.querySelectorAll(".bookSlideLine");
const sliderNextImg = document.querySelectorAll(".sliderNextImg");
const sliderPreviusImg = document.querySelectorAll(".sliderPreviusImg");
const card = document.querySelectorAll(".card");
const categoryList = document.querySelector(".categoryList")

for (let i = 0; i < bookSlideLine.length; i++) {
    sliderNextImg[i].addEventListener("click", () => {
        bookSlideLine[i].scrollLeft += card[i].offsetWidth + 48;
    });

    sliderPreviusImg[i].addEventListener("click", () => {
        bookSlideLine[i].scrollLeft -= card[i].offsetWidth + 48;
    });
}

let newBooksList = []
let bestBookList = []

function getBooks() {
    readDataFromDB("books").then((data) => {

        data.forEach((item) => {
            if (item.isNew == true){
                newBooksList.push(item)
            }     
            if (item.isBestSeller == true){
                bestBookList.push(item)
            }  
        })
        console.log(newBooksList);
        console.log(bestBookList);

        // categoryList.innerHTML = data.map((item)=>{
        //     return `<a href="" class="bookCategories">${item.genre}</a>`
        // })           


        bookSlideLine[0].innerHTML = data.map((item) => {
            return `

        <div div class="card" >
            ${item.isNew == true ? '<div class="newIcon"><p>NEW</p></div>' : ''}

            <img
              src=${item.img}
              class="card-img-top"
              alt="..."
            />
            <div class="card-body">
              <h5 class="card-title">${item.title}</h5>
              <p class="card-text">${item.author}</p>
              <a href="../pages/bookInfo.html" onclick="setBookInfo(${item.id})" class="btn btn-primary"
                >Read More</a
              >
            </div>
          </div >
                `
        }).join("")


        bookSlideLine[1].innerHTML = bestBookList.map((item) => {
            return `

        <div div class="card" >
            ${item.isNew == true ? '<div class="newIcon"><p>NEW</p></div>' : ''}

            <img
              src=${item.img}
              class="card-img-top"
              alt="..."
            />
            <div class="card-body">
              <h5 class="card-title">${item.title}</h5>
              <p class="card-text">${item.author}</p>
              <a href="../pages/bookInfo.html" onclick="setBookInfo(${item.id})" class="btn btn-primary"
                >Read More</a
              >
            </div>
          </div >
                `
        }).join("")

        bookSlideLine[2].innerHTML = newBooksList.map((item) => {
            return `

        <div div class="card" >
            ${item.isNew == true ? '<div class="newIcon"><p>NEW</p></div>' : ''}

            <img
              src=${item.img}
              class="card-img-top"
              alt="..."
            />
            <div class="card-body">
              <h5 class="card-title">${item.title}</h5>
              <p class="card-text">${item.author}</p>
              <a href="../pages/bookInfo.html" onclick="setBookInfo(${item.id})" class="btn btn-primary"
                >Read More</a
              >
            </div>
          </div >
                `
        }).join("")


    })
}

getBooks()
