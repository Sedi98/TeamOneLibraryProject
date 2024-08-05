import {
  readDataFromDB,
  readSingleDataFromDB,
  deleteDataFromDB,
  updateUserData,
  pushDataToDB,
  writeSingleDataToDB,
} from "./firebase.js";

const addBookBtn = document.querySelector(".addBookBtn");
const addStoreBtn = document.querySelector(".addStoreBtn");
const loginBtn = document.querySelector(".loginBtn");
const usrnameInput = document.querySelector(".usrnameInput");
const passInput = document.querySelector(".passInput");
const loginContainer = document.querySelector(".loginContainer");
const adminPanel = document.querySelector(".adminPanel");
adminPanel.style = "display: none";

const modalClose = document.querySelector(".modalClose");
const modalAddBtn = document.querySelector(".modalAddBtn");

const modalInput = document.querySelector(".modalInput");

const genreSelect = document.querySelector(".genreSelect");

const addGenreBtn = document.querySelector(".addGenreBtn");
const removeGenreBtn = document.querySelector(".removeGenreBtn");

const modalContainer = document.querySelector(".modalContainer");
const modal = document.querySelector(".modal");

const addNewGenreBtn = document.querySelector(".addNewGenreBtn");

let bookGenres = [];


// about store section variables
const aboutBooktitle = document.querySelector(".aboutBookTitle");
const aboutBookImg = document.querySelector(".aboutBookImg");
const aboutBookDescription = document.querySelector(".aboutBookDescription");
const addStoreInput = document.querySelectorAll(".addStoreInput");
//

function loadGenres() {
  genreSelect.innerHTML = "";
  readDataFromDB("genres/").then((data) => {
    data.forEach((genre) => {
      bookGenres.push(genre.name);
      genreSelect.innerHTML += `<option value="${genre.name}">${genre.name}</option>`
    })
  })
}

loadGenres();

loginBtn.addEventListener("click", () => {
  openPanel();
  // LoginCheck()
});

function LoginCheck() {
  let username = usrnameInput.value.trim();
  let password = passInput.value.trim();

  readSingleDataFromDB("users/").then((data) => {
    if (username == data.username && password == data.password) {
      openPanel();
    } else {
      alert("Wrong username or password");
    }
  });
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

  let genreArr = [];
  let genreSelect = document.querySelectorAll(".genreSelect");


  

  for (let i = 0; i < genreSelect.length; i++) {
    genreArr.push(genreSelect[i].value);
  }

  let newBook = {
    title: bookTitle,
    author: bookAuthor,
    description: bookDesc,
    img: bookImg,
    isNew: isNewCheck,
    isBestSeller: isBestCheck,
    genre: genreArr,
  };

  pushDataToDB("books/", newBook);
  alert("Book added successfully");
});

modalClose.addEventListener("click", () => {
  modalContainer.style = "display: none";
});

modalAddBtn.addEventListener("click", () => {
  if (modalInput.value !== "") {
    pushDataToDB("genres/", {name:modalInput.value});
    // modalContainer.style = "display: none";
    modalInput.value = "";
    alert("Genre added successfully");
    loadGenres();
  }
});




addGenreBtn.addEventListener("click", () => {
 
  let select = document.createElement("select");
  select.classList.add("genreSelect");
  select.classList.add("addBookInput");
  select.style.margin = "10px 0";

  for (let i = 0; i < bookGenres.length; i++) {
    let option = document.createElement("option");
    option.value = bookGenres[i];
    option.text = bookGenres[i];
    select.appendChild(option);
  }
  genreContainer.appendChild(select);




  let genreSelect = document.querySelectorAll(".genreSelect");
  console.log(genreSelect.length);

  if (genreSelect.length > 1) {
    removeGenreBtn.style.display = "flex";
  } else {
    removeGenreBtn.style.display = "none";
  }

})


removeGenreBtn.addEventListener("click", () => { 
  genreContainer.removeChild(genreContainer.lastElementChild);



  let genreSelect = document.querySelectorAll(".genreSelect");
  console.log(genreSelect.length);
  if (genreSelect.length > 1) {
    removeGenreBtn.style.display = "flex";
  } else {
    removeGenreBtn.style.display = "none";
  }
})

addNewGenreBtn.addEventListener("click", () => {

  modalContainer.style = "display: flex";

});



// about store section functions

addStoreBtn.addEventListener("click", () => {
  let errorCount= 0;
  for (let i = 0; i < addStoreInput.length; i++) {
    if (addStoreInput[i].value === "") {
      addStoreInput[i].style = "border: 1px solid red;"
      errorCount++;
    
    }
    
  }


  if (errorCount > 0) {
    alert("Please fill in all fields")
    return
    
  }else{
   
    
    writeSingleDataToDB("aboutStore/", {
      title:aboutBooktitle.value,
      description: aboutBookDescription.value,
      img: aboutBookImg.value
    })
    alert("About store changed successfully")
  }


});
 
