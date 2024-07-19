// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
// import { initializeApp } from "firebase/app"; // TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBlvmPsuIrorGYg_wD-4LyqqHCalWtezAo",
  authDomain: "ecommercemain2.firebaseapp.com",
  projectId: "ecommercemain2",
  storageBucket: "ecommercemain2.appspot.com",
  messagingSenderId: "192646329444",
  appId: "1:192646329444:web:34da7d6693491440629b71",
  measurementId: "G-E7991PXECJ",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// export
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
