// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDDVrj4ohMMHbIsm1n938FAOvyETCY3Hec",
  authDomain: "proyecto-1-d3186.firebaseapp.com",
  projectId: "proyecto-1-d3186",
  storageBucket: "proyecto-1-d3186.appspot.com",
  messagingSenderId: "665563514008",
  appId: "1:665563514008:web:fd8c3b619bb9bb28c8bced",
  measurementId: "G-GNWDFWG1C2"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
export const firebaseStorage = getStorage(firebaseApp)