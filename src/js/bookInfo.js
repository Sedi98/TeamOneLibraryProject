import { pushDataToDB, readSingleDataFromDB } from "./firebase.js";

const aboutBookSection = document.querySelector(".aboutBookSection");
console.log(new Date().toISOString());

let SpecId = localStorage.getItem("bookId");

SpecId = SpecId.replace(/"/g, "");
bookInfo();
console.log(SpecId);

async function bookInfo() {
  let data = await readSingleDataFromDB(`books/${SpecId}`);

  console.log(data);

  aboutBookSection.innerHTML = `
  
  <button class="backBtn"><a href="../pages/catalog.html"> < Back</a></button>
      <div class="aboutBook">
        <div class="aboutBookLeftside">
          <div class="yearBox">${new Date().getFullYear()}</div>
          <div class="bookInformation">
            <h1>${data.title}</h1>
            <h2>${moment(`${data.addDate}`, "YYYYMMDD").fromNow()}</h2>
            <p class="author">${data.author}</p>
            <p class="description">
              ${data.description}. More details
            </p>
          </div>
        </div>
        <div class="aboutBookRightside">
        ${data.isNew == true ? '<div class="newSign">New</div>' : ""}
          
          <img class="aboutBookImage" src="${data.img}" alt="" />
        </div>
      </div>
  
  
  `;
}
