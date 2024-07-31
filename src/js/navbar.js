const joinUs = document.querySelector(".joinUs");
const joinUsContainer = document.querySelector(".joinUsContainer");
const joinCloseBtn  = document.querySelector(".joinCloseBtn");


joinUs.addEventListener("click", () => {
    joinUsContainer.style = "display: flex";
});


joinUsContainer.addEventListener("click", (e) => {
    joinUsContainer.style = "display: none";
})


joinCloseBtn.addEventListener("click", () => {
    joinUsContainer.style = "display: none";
})