// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCyXfGd92WDVlKapqTtfUAlElfwICxjzNc",
  authDomain: "indocapital-21d1f.firebaseapp.com",
  projectId: "indocapital-21d1f",
  storageBucket: "indocapital-21d1f.firebasestorage.app",
  messagingSenderId: "434461925094",
  appId: "1:434461925094:web:c104a84f62a887efd0e527",
  measurementId: "G-F62Q0YETB5"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export const firebaseObj = { auth, db, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, doc, setDoc, getDoc };
