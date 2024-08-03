const bookSlideLine = document.querySelectorAll(".bookSlideLine");
const sliderNextImg = document.querySelectorAll(".sliderNextImg");
const sliderPreviusImg = document.querySelectorAll(".sliderPreviusImg");
const card = document.querySelectorAll(".card");

console.log(bookSlideLine.scrollWidth);
console.log(bookSlideLine.scrollLeft);
console.log(card[0].offsetWidth);

for (let i = 0; i < bookSlideLine.length; i++) {
    sliderNextImg[i].addEventListener("click", () => {
        bookSlideLine[i].scrollLeft += card[i].offsetWidth + 48;
    });

    sliderPreviusImg[i].addEventListener("click", () => {
        bookSlideLine[i].scrollLeft -= card[i].offsetWidth + 48;
    });
}