// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import {
  getDatabase,
  ref,
  set,
  get,
  update,
  remove,
  push,
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBEbMtlD47XL6ONgkiSZp7erW96pgPX5Ws",
  authDomain: "avengers1-c3662.firebaseapp.com",
  databaseURL:
    "https://avengers1-c3662-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "avengers1-c3662",
  storageBucket: "avengers1-c3662.appspot.com",
  messagingSenderId: "180132426988",
  appId: "1:180132426988:web:58eb3ca89a8e11d2aa61c9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

// function writeUserData() {
//   set(ref(db, "users/"), {
//     username: "admin",
//     password: "admin123",
//   });
// }

// writeUserData()

export async function readDataFromDB(dbTable) {
  try {
    const snapshot = await get(ref(db, dbTable));
    if (snapshot.exists()) {
      let newData = Object.entries(snapshot.val()).map((item) => ({
        id: item[0],
        ...item[1],
      }));
      return newData;
    } else {
      console.log("No data available");
      return [];
    }
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function readSingleDataFromDB(dbTable) {
  try {
    const snapshot = await get(ref(db, dbTable));
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("No data available");
      return [];
    }
  } catch (error) {
    console.error(error);
    return [];
  }
}

export function deleteDataFromDB(dbTable) {
  remove(ref(db, dbTable));
}

export function updateUserData(dbTable, dataID, data) {
  update(ref(db, dbTable + dataID), data);
}

export function pushDataToDB(dbTable, data) {
  push(ref(db, dbTable), data);
}

// pushDataToDB("users/", { username: "name4", email: "email4" });

// deleteDataFromDB("users/");

async function getData() {
  readSingleDataFromDB("users/").then((data) => {
    console.log(data);
  });
}

// getData();
