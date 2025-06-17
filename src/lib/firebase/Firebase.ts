import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDMaG6eLagcMujfU_dipfbgJ4WHFr6jSgY",
  authDomain: "jobi-bfefd.firebaseapp.com",
  projectId: "jobi-bfefd",
  storageBucket: "jobi-bfefd.firebasestorage.app",
  messagingSenderId: "229522686577",
  appId: "1:229522686577:web:5a6ce1cf0e9e91f3c811d0",
  measurementId: "G-HLKECYH8CQ",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const auth = getAuth(app);
