// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCY9tI9Wg_jmStaZrb5d41fh8qc4IxkoyA",
  authDomain: "code-bounty-6e6b3.firebaseapp.com",
  projectId: "code-bounty-6e6b3",
  storageBucket: "code-bounty-6e6b3.firebasestorage.app",
  messagingSenderId: "775610081941",
  appId: "1:775610081941:web:f7e9d04223687bfdc1b19c",
  measurementId: "G-E22C7BBL0D",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);

export default app;
