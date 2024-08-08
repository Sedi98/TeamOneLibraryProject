import { pushDataToDB } from "./firebase.js";
import {customAlert, alertDefault} from "./customAlert.js";

const joinUs = document.querySelector(".joinUs");
const joinUsContainer = document.querySelector(".joinUsContainer");
const joinCloseBtn = document.querySelector(".joinCloseBtn");
const hamburger = document.querySelector(".hamburger");
const navUl = document.querySelector(".navUl");
const navClose = document.querySelector(".navClose");

const joinInput = document.querySelectorAll(".joinInput");
const joinBtn = document.querySelector(".joinBtn");

joinUs.addEventListener("click", () => {
  joinUsContainer.style = "display: flex";
});

joinUsContainer.addEventListener("click", (e) => {
  if (e.target === joinUsContainer) {
    console.log(e.target);
    joinUsContainer.style = "display: none";
  }
});

joinCloseBtn.addEventListener("click", () => {
  joinUsContainer.style = "display: none";
});

hamburger.addEventListener("click", () => {
  navUl.style = "top: 0";
});

navClose.addEventListener("click", () => {
  navUl.style = "top: -100vh";
});

joinBtn.addEventListener("click", () => {
  console.log(joinInput[0].value, joinInput[1].value);

  if (joinInput[0].value === "" || joinInput[1].value === "") {
    customAlert("Please fill in all fields", "err");
    return;
  } else if (joinInput[1].value.split("").includes("@") === false) {
    customAlert("Please enter a valid email", "err");
    return;
  } else {
    pushDataToDB("join/", {
      name: (joinInput[0].value).trim(),
      email: (joinInput[1].value).trim(),
    });

    customAlert("Thank you for joining us. We will get back to you as soon as possible.",'succ');
    joinUsContainer.style = "display: none";
  }
});
