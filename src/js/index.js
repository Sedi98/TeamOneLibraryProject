import {readDataFromDB} from "./firebase.js";


const catalogSection = document.querySelector(".catalogSection");




async function getAllGenres() {
    let data = await readDataFromDB("genres/");

    catalogSection.innerHTML= data.map((item)=>{
        return `
        <div class="catalogDiv">${item.name}</div>
        `
    }).join("");
}


getAllGenres()