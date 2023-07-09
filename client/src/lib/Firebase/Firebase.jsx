import { initializeApp, getApp, getApps } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAIIOxTgyObYNmAPoalUNlK63PHakkW57Q",
    authDomain: "pinto-storage.firebaseapp.com",
    projectId: "pinto-storage",
    storageBucket: "pinto-storage.appspot.com",
    messagingSenderId: "672272363144",
    appId: "1:672272363144:web:5f07715b5518a5ed5cf93d"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export {
  auth,
  db,
  storage,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
};
