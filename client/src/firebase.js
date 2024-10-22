// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-e2749.firebaseapp.com",
  projectId: "mern-blog-e2749",
  storageBucket: "mern-blog-e2749.appspot.com",
  messagingSenderId: "969137620810",
  appId: "1:969137620810:web:39dce3ea85a98f5348e3b3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
