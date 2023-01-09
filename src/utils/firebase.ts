// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore/lite';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1J6oz3CXS_GmPftTenBJsWJ2StQJHGYY",
  authDomain: "campaigns-management-tool.firebaseapp.com",
  projectId: "campaigns-management-tool",
  storageBucket: "campaigns-management-tool.appspot.com",
  messagingSenderId: "520710955502",
  appId: "1:520710955502:web:9137c33126ab744cacaeff"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();
