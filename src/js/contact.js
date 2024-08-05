const nameInput = document.querySelector('#nameinput')
const emailinput = document.querySelector('#emailinput')
const adressInput = document.querySelector('#adressInput')
const phoneinput = document.querySelector('#phoneinput')
const noteinput = document.querySelector('#noteinput')


const textCount = document.querySelector('.textCount')
const textlimit = document.querySelector('.textlimit')
const buttton = document.querySelector('.buttton') 
                    



noteinput.addEventListener('input', () => {


    if (noteinput.value.length > 100) {
        noteinput.value = noteinput.value.slice(0, 100)
        textCount.textContent = noteinput.value.length
        textCount.style="color:red"
    }else{
        textCount.textContent = noteinput.value.length
        textCount.style="color:black"   
    }
    
    textCount.textContent = noteinput.value.length
   
})



