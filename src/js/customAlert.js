const customAlertBox = document.querySelector(".customAlertBox");

export function customAlert(message, type) {

    customAlertBox.classList.add("alertActive");
  if (type == "err") {
    customAlertBox.classList.add("alertErr");
  } 

  customAlertBox.innerHTML = message;

  setTimeout(function () {
    alertDefault();
  }, 5000);
}

export function alertDefault() {
  customAlertBox.classList.remove("alertActive");
  customAlertBox.classList.remove("alertErr");
  
}
