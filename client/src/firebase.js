// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "fir-7fd69.firebaseapp.com",
  projectId: "fir-7fd69",
  storageBucket: "fir-7fd69.appspot.com",
  messagingSenderId: "407773096356",
  appId: "1:407773096356:web:600efe2f022b1f08d83931",
  measurementId: "G-VPR5VGC3W9"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);