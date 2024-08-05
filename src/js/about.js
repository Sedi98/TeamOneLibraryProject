import { readSingleDataFromDB } from "./firebase.js";


const aboutTitle = document.querySelector(".aboutst");
const aboutText = document.querySelector(".loremst");
const aboutImg = document.querySelector(".aboutImg");




function LoadPage(){
   readSingleDataFromDB("aboutStore/").then((data) => {

    console.log(data);
    
    aboutTitle.textContent = data.title;
    aboutText.textContent = data.description;
    aboutImg.src = data.img;
  })
}


LoadPage()