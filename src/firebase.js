// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAc0gTM26nm-dGc4jwzkeM66HOnNTpZW-E",
  authDomain: "bibliorank.firebaseapp.com",
  projectId: "bibliorank",
  storageBucket: "bibliorank.firebasestorage.app",
  messagingSenderId: "525572176935",
  appId: "1:525572176935:web:5ec497c46dd8ce4b4d6202",
  measurementId: "G-22KTK1G8YJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const auth = getAuth(app);