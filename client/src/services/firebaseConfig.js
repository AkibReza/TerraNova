// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCjmKYNA6A6SEpm6ZrVGVUae786_WPpeJo",
  authDomain: "terranova-16514.firebaseapp.com",
  projectId: "terranova-16514",
  storageBucket: "terranova-16514.firebasestorage.app",
  messagingSenderId: "1087607325842",
  appId: "1:1087607325842:web:81fd8da55ff03c7e71524b",
  measurementId: "G-W74SX41MT6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
