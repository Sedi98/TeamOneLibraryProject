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
  child
} from "https://www.gstatic.com/firebasejs/10.12.4/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDfxIftaK7x9zPCzTIEntrq3R3TYYMFpIk",
  authDomain: "thelibraryproject-67ce2.firebaseapp.com",
  databaseURL: "https://thelibraryproject-67ce2-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "thelibraryproject-67ce2",
  storageBucket: "thelibraryproject-67ce2.appspot.com",
  messagingSenderId: "797696713206",
  appId: "1:797696713206:web:b1c789722c61ca5d09a7d7"

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


export function writeSingleDataToDB(dbTable, data) {
  set(ref(db, dbTable), data);
}

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

export async function readSingleDataFromDB(dbTable,ID="") {
  try {
    const snapshot = await get(ref(db, `${dbTable}${ID}`));
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
