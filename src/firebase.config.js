import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.app.FIREBASE_API_KEY,
  authDomain: "survey-tool-5afd9.firebaseapp.com",
  projectId: "survey-tool-5afd9",
  storageBucket: "survey-tool-5afd9.appspot.com",
  messagingSenderId: "892640874400",
  appId: "1:892640874400:web:ad7b103c19d025e0b89ec5",
  measurementId: "G-MQKEM83SXY",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default getFirestore();
