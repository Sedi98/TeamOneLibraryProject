 const searchInput = document.querySelector(".searchInput")
 const searchBtn = document.querySelector(".searchBtn")
 const bookName = document.querySelector(".bookName")
 const personName = document.querySelector(".personName")
 const bookTitle = document.querySelector(".bookTitle")
 const rightDiv = document.querySelector(".rightDiv")
 const books = document.querySelector(".books")

 const swiperBooks =document.querySelector(".swiperBooks")


  


//  BTN
 const bookBtnLeft = document.querySelector(".bookBtnLeft")
 const bookBtnRight = document.querySelector(".bookBtnRight")
 




searchBtn.addEventListener("click", () => {
    let searchBookItems = searchInput.value; 
    searchBook(searchBookItems); 
});


function searchBook(query) {
    fetch(`https://www.googleapis.com/books/v1/volumes?q=${query}`, {
        method: 'GET'
    })
    .then((response) => response.json()) 
    .then((data) => {
        render(data.items);
    })
    .catch((error) => {
        console.error('Error', error);
    });
}




console.log(rightDiv.offsetWidth);


bookBtnLeft.addEventListener("click", () => {
    books.scrollLeft += rightDiv.offsetWidth + 54;
});

bookBtnRight.addEventListener("click", () => {
    books.scrollLeft -= rightDiv.offsetWidth + 54;
});




function render(items) {
    swiperBooks.innerHTML = items ? items.map((item) => {
        return `
 <div class="swiper-slide books">
                <img
                class="bookImg"
                src="${item.volumeInfo.imageLinks?.smallThumbnail || 'default_image.jpg'}"
                alt=""
              />
  
              <div class="textDiv">
                <h2 class="bookName">${item.volumeInfo.title}</h2>
                <p class="personName">${item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'Muellif bilinmir'}</p>
                <span class="bookTitle"
                  >${item.volumeInfo.description || 'Aciqlama yoxdur'}</span
                >
            
            </div>
          
             </div> `;
    }).join('') : '';
}
