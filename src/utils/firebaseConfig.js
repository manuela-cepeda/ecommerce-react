// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore}  from "firebase/firestore"; 

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA7GIY4N0IVzwBd_4S9jOtRcNIXKhgGfcM",
  authDomain: "ecomm-react-mlc.firebaseapp.com",
  projectId: "ecomm-react-mlc",
  storageBucket: "ecomm-react-mlc.appspot.com",
  messagingSenderId: "698121286667",
  appId: "1:698121286667:web:bdac1a73873547f69dc30e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export default db;