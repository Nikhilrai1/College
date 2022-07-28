// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyD-YunGp3fEke8hLoHcTHRj1D1DWkNkikA",
    authDomain: "college-backend.firebaseapp.com",
    projectId: "college-backend",
    storageBucket: "college-backend.appspot.com",
    messagingSenderId: "652993308757",
    appId: "1:652993308757:web:c57fcd7046c6d12c380cdc",
    measurementId: "G-XGJ9Q7VSPB"
  };


export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app, "gs://college-backend.appspot.com")