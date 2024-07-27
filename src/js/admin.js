const loginContainer = document.querySelector(".loginContainer");
const loginBtn = document.querySelector(".loginBtn");
const genreSelect = document.querySelector(".genreSelect");
const adminPanel = document.querySelector(".adminPanel");
adminPanel.style = "display: none";

const bookGenres = [
  "Adventure",
  "Biography",
  "Classics",
  "Comic Book",
  "Crime",
  "Drama",
  "Fantasy",
  "Historical Fiction",
  "Horror",
  "Mystery",
  "Non-Fiction",
  "Poetry",
  "Romance",
  "Science Fiction",
  "Self-Help",
  "Thriller",
  "Travel",
  "Western",
  "Young Adult",
];

loginBtn.addEventListener("click", () => {
  openPanel();
});

function openPanel() {
  loginContainer.style = "display: none";
  adminPanel.style = "display: block";
}

function loadGenres() {
  for (let i = 0; i < bookGenres.length; i++) {
    let option = document.createElement("option");
    option.value = bookGenres[i];
    option.text = bookGenres[i];
    genreSelect.appendChild(option);
  }
}

loadGenres();
