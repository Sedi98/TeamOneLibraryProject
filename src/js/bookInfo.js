import {
  pushDataToDB,
  readDataFromDB,
  readSingleDataFromDB,
} from "./firebase.js";

let readMore;
const sendBtn = document.querySelector(".sendBtn");

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
              ${data.description}. 
            </p> <span class="readMore">Read more</span>
          </div>
        </div>
        <div class="aboutBookRightside">
        ${data.isNew == true ? '<div class="newSign">New</div>' : ""}
          
          <img class="aboutBookImage" src="${data.img}" alt="" />
        </div>
      </div>
  
  
  `;

  readMore = document.querySelector(".readMore");
  readMore.addEventListener("click", () => {
    let description = document.querySelector(".description");
    description.classList.toggle("readMoreDescription");
    readMore.innerHTML =
      readMore.innerHTML == "Read more" ? "Read less" : "Read more";
  });
}


getComments(SpecId);

async function getComments(bookID) {
  let data = await readDataFromDB(`comments/`);
  data = data.filter((item) => {
    return item.bookID == bookID;
  });

  let commentContainer = document.querySelector(".commentContainer");
  commentContainer.innerHTML = data.reverse().map((item) => {
    return ` 
    
     <div class="commentBox">
            <div class="commentHeader">
              <p class="anonimName">anonim</p>
              <p class="commentDate">${moment(`${item.date}`).startOf("hour").fromNow()}</p>
            </div>
            <p class="anonimComment">
              ${item.comment}
            </p>
      </div>
    
    
    `
  }).join("");
}

function addComment(inputVal, bookID) {
  if (inputVal != "") {
    let dateStr =
      new Date().getFullYear() +
      String(new Date().getMonth() + 1).padStart(2, "0") +
      String(new Date().getDate()).padStart(2, "0");
    pushDataToDB("comments/", {
      comment: inputVal,
      bookID: bookID,
      date: dateStr,
    });
    
    getComments(bookID);
  } else {
    alert("Please write a comment");
  }
}

sendBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let commentInput = document.querySelector(".commentInput");
  addComment(commentInput.value, SpecId);
  commentInput.value = "";
});
