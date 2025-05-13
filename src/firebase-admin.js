import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBF0IXfo8SSwun1Yw1g4JZeYmNSkH8LF2w",
  authDomain: "realestateadmin-9ca4d.firebaseapp.com",
  projectId: "realestateadmin-9ca4d",
  storageBucket: "realestateadmin-9ca4d.firebasestorage.app",
  messagingSenderId: "857421498558",
  appId: "1:857421498558:web:de64ed94fb5070a81376ef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const adminApp = initializeApp(firebaseConfig, "Admin");
export const adminAuth = getAuth(adminApp);