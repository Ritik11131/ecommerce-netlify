// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCRJ5eCl1hBAvPNRsbSiN6pQGXJ5qm1wpc",
  authDomain: "e-commerce-4bca3.firebaseapp.com",
  projectId: "e-commerce-4bca3",
  storageBucket: "e-commerce-4bca3.appspot.com",
  messagingSenderId: "766738278051",
  appId: "1:766738278051:web:e6bca3ec1ca8ce8d504116",
  measurementId: "G-8F87SBTPQ9"
};


const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app)

export default fireDB;