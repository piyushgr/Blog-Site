// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "blogapp-fae5b.firebaseapp.com",
  projectId: "blogapp-fae5b",
  storageBucket: "blogapp-fae5b.appspot.com",
  messagingSenderId: "179943988320",
  appId: "1:179943988320:web:c657ad17f16906cfd4b705",
  measurementId: "G-9PBK9ZDJ5Q",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
