import { pushDataToDB } from "./firebase.js";
import { customAlert, alertDefault} from "./customAlert.js";




const nameInput = document.querySelector('#nameinput')
const emailinput = document.querySelector('#emailinput')
const adressInput = document.querySelector('#adressInput')
const phoneinput = document.querySelector('#phoneinput')
const noteinput = document.querySelector('#noteinput')

const textInput = document.querySelectorAll('.textinput')

const textCount = document.querySelector('.textCount')
const textlimit = document.querySelector('.textlimit')
const buttton = document.querySelector('.buttton') 
                    
const wordLimit= 100

textlimit.textContent = wordLimit


noteinput.addEventListener('input', () => {


    if (noteinput.value.length > 100) {
        noteinput.value = noteinput.value.slice(0, wordLimit)
        textCount.textContent = noteinput.value.length
        textCount.style="color:red"
    }else{
        textCount.textContent = noteinput.value.length
        textCount.style="color:black"   
    }
    
    textCount.textContent = noteinput.value.length
   
})



buttton.addEventListener('click', () => { 

    let errCount= 0;

    for (let i = 0; i < textInput.length; i++) {
        if (textInput[i].value === "") {
            textInput[i].style = "border: 1px solid red;"
            errCount++;
        }
    }

    if (noteinput.value=="") {
        noteinput.style = "border: 1px solid red;"
        
    }


    if (errCount > 0) {
        customAlert("Please fill in all fields", "err")
        return

    }

// push data if all inputs are filled
    pushDataToDB("contact/", {
        name: (nameInput.value).trim(),
        email: (emailinput.value).trim(),
        adress: (adressInput.value).trim(),
        phone: (phoneinput.value).trim(),
        note: (noteinput.value).trim(),
    })
    customAlert("Thank you for your message. We will get back to you as soon as possible.", "succ")



    
    for (let i = 0; i < textInput.length; i++) {
        textInput[i].value = ""
    }
})



