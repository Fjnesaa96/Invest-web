// firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {
  getFirestore, collection, addDoc, getDoc, getDocs, doc, updateDoc, query, where, orderBy, Timestamp
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";
import {
  getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import {
  getStorage, ref, uploadBytes, getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-storage.js";

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
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

// Export semua fungsi yang digunakan
export const firebaseObj = {
  auth,
  db,
  storage,
  ref,
  uploadBytes,
  getDownloadURL,
  collection,
  addDoc,
  getDoc,
  getDocs,
  doc,
  updateDoc,
  query,
  where,
  orderBy,
  Timestamp,
  signOut,
  onAuthStateChanged
};
