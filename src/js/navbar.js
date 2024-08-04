const joinUs = document.querySelector(".joinUs");
const joinUsContainer = document.querySelector(".joinUsContainer");
const joinCloseBtn  = document.querySelector(".joinCloseBtn");
const hamburger = document.querySelector(".hamburger");
const navUl = document.querySelector(".navUl");
const navClose = document.querySelector(".navClose");


joinUs.addEventListener("click", () => {
    joinUsContainer.style = "display: flex";
});


joinUsContainer.addEventListener("click", (e) => {
    if (e.target === joinUsContainer) {
        console.log(e.target);
        joinUsContainer.style = "display: none";
        
    }
})


joinCloseBtn.addEventListener("click", () => {
    joinUsContainer.style = "display: none";
})


hamburger.addEventListener('click',()=>{
    navUl.style = "top: 0";
    
    
})

navClose.addEventListener('click',()=>{
    navUl.style = "top: -100vh";
    
    
})