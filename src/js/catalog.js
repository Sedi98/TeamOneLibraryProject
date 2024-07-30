const bookSlideLine = document.querySelector(".bookSlideLine");
const sliderNextImg = document.querySelector(".sliderNextImg");
const sliderPreviusImg = document.querySelector(".sliderPreviusImg");
const card = document.querySelectorAll(".card");

console.log(bookSlideLine.scrollWidth);
console.log(bookSlideLine.scrollLeft);
console.log(card[0].offsetWidth);

sliderNextImg.addEventListener("click", () => {
    bookSlideLine.scrollLeft += card[0].offsetWidth + 54;
});

sliderPreviusImg.addEventListener("click", () => {
    bookSlideLine.scrollLeft -= card[0].offsetWidth + 54;
});