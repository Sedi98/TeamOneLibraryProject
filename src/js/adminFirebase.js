import {
  readDataFromDB,
  readSingleDataFromDB,
  deleteDataFromDB,
  updateUserData,
  pushDataToDB,
  writeSingleDataToDB,
} from "./firebase.js";
import {customAlert, alertDefault} from "./customAlert.js";

const addBookBtn = document.querySelector(".addBookBtn");
const addStoreBtn = document.querySelector(".addStoreBtn");
const loginBtn = document.querySelector(".loginBtn");
const usrnameInput = document.querySelector(".usrnameInput");
const passInput = document.querySelector(".passInput");
const loginContainer = document.querySelector(".loginContainer");
const adminPanel = document.querySelector(".adminPanel");
adminPanel.style = "display: none";

let btnBookDelete, btnJoinDelete, btnContactDelete;

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
      genreSelect.innerHTML += `<option value="${genre.name}">${genre.name}</option>`;
    });
  });
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
      customAlert("Wrong username or password",'err');
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
  //
  let addBookInput = document.querySelectorAll(".addBookInput");
  let isEmpty = false;

  for (let j = 0; j < addBookInput.length; j++) {
    addBookInput[j].style = "border: 1px solid #ccc";
  }

  for (let i = 0; i < addBookInput.length; i++) {
    if (addBookInput[i].value === "") {
      addBookInput[i].style = "border: 1px solid red;";
      isEmpty = true;
    }
  }

  if (isEmpty) {
    customAlert("Please fill in all fields", "err");
    return;
  }

  let genreArr = [];
  let genreSelect = document.querySelectorAll(".genreSelect");

  for (let i = 0; i < genreSelect.length; i++) {
    genreArr.push(genreSelect[i].value);
  }

  let date = new Date();
  let dateStr = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(
    2,
    0
  )}${String(date.getDate()).padStart(2, 0)}`;

  let newBook = {
    title: bookTitle,
    author: bookAuthor,
    description: bookDesc,
    img: bookImg,
    isNew: isNewCheck,
    isBestSeller: isBestCheck,
    genre: genreArr,
    addDate: dateStr,
  };

  pushDataToDB("books/", newBook);
  customAlert("Book added successfully", "succ");
  bookTableAdd();
});

// new genre modal cancel button
modalClose.addEventListener("click", () => {
  modalContainer.style = "display: none";
});

// new genre modal add button
modalAddBtn.addEventListener("click", () => {
  if (modalInput.value !== "") {
    pushDataToDB("genres/", { name: modalInput.value });
    // modalContainer.style = "display: none";
    modalInput.value = "";
    customAlert("Genre added successfully");
    loadGenres();
  }
});

// add a new genre selection in admin page
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

  // if multiple genre select generated then show remove genre button
  let genreSelect = document.querySelectorAll(".genreSelect");
  if (genreSelect.length > 1) {
    removeGenreBtn.style.display = "flex";
  } else {
    removeGenreBtn.style.display = "none";
  }
});

// remove multiple genre select
removeGenreBtn.addEventListener("click", () => {
  genreContainer.removeChild(genreContainer.lastElementChild);

  let genreSelect = document.querySelectorAll(".genreSelect");
  console.log(genreSelect.length);
  if (genreSelect.length > 1) {
    removeGenreBtn.style.display = "flex";
  } else {
    removeGenreBtn.style.display = "none";
  }
});

// show new genre modal when click
addNewGenreBtn.addEventListener("click", () => {
  modalContainer.style = "display: flex";
});

// function for change about section
addStoreBtn.addEventListener("click", () => {
  let errorCount = 0;
  for (let i = 0; i < addStoreInput.length; i++) {
    if (addStoreInput[i].value === "") {
      addStoreInput[i].style = "border: 1px solid red;";
      errorCount++;
    }
  }

  if (errorCount > 0) {
    customAlert("Please fill in all fields", "err");
    return;
  } else {
    writeSingleDataToDB("aboutStore/", {
      title: aboutBooktitle.value,
      description: aboutBookDescription.value,
      img: aboutBookImg.value,
    });
    customAlert("About store changed successfully");
  }
});

// show books list on book list table
function bookTableAdd() {
  let bookTableBody = document.querySelector(".bookTableBody");
  readDataFromDB("books/").then((data) => {
    console.log(data);
    bookTableBody.innerHTML = data
      .map((item) => {
        return `
      <tr>
        <td>${data.indexOf(item) + 1}</td>
        <td class="bookListTitle"><img class="addBooksImg" src="${
          item.img
        }">${item.title}</td>
        <td > <p class="minDesc"> ${item.description}</p> </td>
        <td>${item.genre[0]}</td>
        <td>${item.author}</td>
        <td><i class="bx bx-trash trashIcon btnBookDelete"></i></td>
      </tr>
      `;
      })
      .join("");

    btnBookDelete = document.querySelectorAll(".btnBookDelete");

    for (let i = 0; i < btnBookDelete.length; i++) {
      btnBookDelete[i].addEventListener("click", () => {
        deleteDataFromDB(`books/${data[i].id}`);
        customAlert("Book deleted successfully");
        bookTableAdd();
      });
    }
  });
}

function renderJoinUsData() {
  let joinUsTableBody = document.querySelector(".joinUsTableBody");

  readDataFromDB("join/").then((data) => {
    joinUsTableBody.innerHTML = data
      .map((item) => {
        return `
      <tr>
          <td>${data.indexOf(item) + 1}</td>
          <td>${item.name}</td>
          <td>${item.email}</td>
          <td><i class="bx bx-trash trashIcon btnJoinDelete"></i></td>
      </tr>
      `;
      })
      .join("");

    btnJoinDelete = document.querySelectorAll(".btnJoinDelete");

    for (let i = 0; i < btnJoinDelete.length; i++) {
      btnJoinDelete[i].addEventListener("click", () => {
        let confirmation = confirm(
          "Are you sure you want to delete this user?"
        );
        if (confirmation) {
          deleteDataFromDB(`join/${data[i].id}`);
          renderJoinUsData();
          customAlert("User deleted successfully");
        }
      });
    }
  });
}

function renderContactUsData() {
  let contactTableBody = document.querySelector(".contactTableBody");

  readDataFromDB("contact/").then((data) => {
    console.log(data);

    contactTableBody.innerHTML = data
      .map((item) => {
        return `
      <tr>
          <td>${data.indexOf(item) + 1}</td>
          <td>${item.name}</td>
          <td>${item.adress}</td>
          <td>${item.email}</td>
          <td>${item.phone}</td>
          <td> <p class="minDesc">${item.note} </p> </td>
          <td><i class="bx bx-trash trashIcon btnContactDelete"></i></td>
      </tr>
      `;
      })
      .join("");

    btnContactDelete = document.querySelectorAll(".btnContactDelete");

    for (let i = 0; i < btnContactDelete.length; i++) {
      btnContactDelete[i].addEventListener("click", () => {
        deleteDataFromDB(`contact/${data[i].id}`);
        customAlert("Contact user deleted successfully");
        renderContactUsData();
      });
    }
  });
}

bookTableAdd();
renderJoinUsData();
renderContactUsData();
