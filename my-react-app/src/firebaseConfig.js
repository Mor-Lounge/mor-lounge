// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCOI_AGVauDt2iXjq44hcorNmckkFxlw-A",
  authDomain: "morloungeyonetim.firebaseapp.com",
  projectId: "morloungeyonetim",
  storageBucket: "morloungeyonetim.firebasestorage.app",
  messagingSenderId: "8769052951",
  appId: "1:8769052951:web:d1427c88131681453fd752",
  measurementId: "G-6163R0PTZ7",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);