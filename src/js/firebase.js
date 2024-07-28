
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
  import { getDatabase, ref, set, get, child, update, remove , push } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-database.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBEbMtlD47XL6ONgkiSZp7erW96pgPX5Ws",
    authDomain: "avengers1-c3662.firebaseapp.com",
    databaseURL: "https://avengers1-c3662-default-rtdb.europe-west1.firebasedatabase.app/",
    projectId: "avengers1-c3662",
    storageBucket: "avengers1-c3662.appspot.com",
    messagingSenderId: "180132426988",
    appId: "1:180132426988:web:58eb3ca89a8e11d2aa61c9"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const db = getDatabase(app);




  function writeUserData() {
    
    set(ref(db, 'users/'), {
      username: "name2",
      email: "email2",
      
    });
  }


  function readUserData() {
    get(ref(db, 'users/')).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }


  function deleteUserData() {
    remove(ref(db, 'users/'));
  }


  function updateUserData() {
    update(ref(db, 'users/'), {
      username: "name3",
      email: "email3",
      
    });
  }


  function pushUserData() {
    push(ref(db, 'users/'), {
      username: "name4",
      email: "email4",
      
    });
  }


// writeUserData()
// pushUserData()
// readUserData()



