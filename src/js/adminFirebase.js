import { readDataFromDB, readSingleDataFromDB, deleteDataFromDB, updateUserData, pushDataToDB } from "./firebase.js";

const addBookBtn = document.querySelector(".addBookBtn");
const addStoreBtn = document.getElementById("addStoreBtn");
const loginBtn = document.querySelector(".loginBtn");
const usrnameInput = document.querySelector(".usrnameInput");
const passInput = document.querySelector(".passInput");
const loginContainer = document.querySelector(".loginContainer");
const adminPanel = document.querySelector(".adminPanel");
adminPanel.style = "display: none";

loginBtn.addEventListener("click", () => {
  openPanel();
  // LoginCheck()
});

function LoginCheck() {
  let username = (usrnameInput.value).trim();
  let password = (passInput.value).trim();

  readSingleDataFromDB('users/').then((data) => {

    if (username == data.username && password == data.password) {
      openPanel();
    } else {
      alert("Wrong username or password");
    }
  })

}

function openPanel() {
  loginContainer.style = "display: none";
  adminPanel.style = "display: flex";
}



addBookBtn.addEventListener("click", () => {
  let bookTitle = document.querySelector(".bookTitle").value;
  let bookAuthor = document.querySelector(".bookAuthor").value;
  let bookDesc = document.querySelector(".bookDesc").value;
  let bookImg = document.querySelector(".bookUrl").value;
  let isNewCheck = document.querySelector("#isNewCheck").checked;
  let isBestCheck = document.querySelector("#isBestCheck").checked;

  let genreArr = []
  let genreSelect = document.querySelectorAll(".genreSelect");

  for (let i = 0; i < genreSelect.length; i++) {
    genreArr.push(genreSelect[i].value);
  }

  console.log(bookTitle, bookAuthor, bookDesc, genreArr, bookImg);
  let newBook = {
    title: bookTitle,
    author: bookAuthor,
    description: bookDesc,
    img: bookImg,
    isNew: isNewCheck,
    isBestSeller: isBestCheck,
    genre: genreArr
  }

  pushDataToDB('books/', newBook);
  alert("Book added successfully");
});
