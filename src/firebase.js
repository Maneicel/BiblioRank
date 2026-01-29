// //라스트api 파이어베이스
// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";

// import { getFirestore } from "firebase/firestore";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDGb8cwd4WR8QLYo5dh9WJCu79dmeIi9g0",
//   authDomain: "lastapi-b673d.firebaseapp.com",
//   projectId: "lastapi-b673d",
//   storageBucket: "lastapi-b673d.firebasestorage.app",
//   messagingSenderId: "772098480670",
//   appId: "1:772098480670:web:b85b719c8ea23e6ae8ec0f"
// };


//북 리포트 파이어베이스
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  ...
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);