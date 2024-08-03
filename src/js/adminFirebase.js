import { readDataFromDB , readSingleDataFromDB,deleteDataFromDB, updateUserData ,pushDataToDB } from "./firebase.js";

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
    let username= (usrnameInput.value).trim();
    let password = (passInput.value).trim();

    readSingleDataFromDB('users/').then((data) => {
     
      if (username == data.username && password == data.password) {
        openPanel();
      }else{
        alert("Wrong username or password");
      }
     })
    
}

function openPanel() {
  loginContainer.style = "display: none";
  adminPanel.style = "display: flex";
}



addBookBtn.addEventListener("click", () => {
 
  
});
