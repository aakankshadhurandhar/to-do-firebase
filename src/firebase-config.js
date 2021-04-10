import firebase from "firebase";
const firebaseConfig = {
    apiKey: "AIzaSyAK_a55DN5GLDCIo91UUMMmUJIqvkNUBJg",
    authDomain: "to-do-firebase-2b1e4.firebaseapp.com",
    projectId: "to-do-firebase-2b1e4",
    storageBucket: "to-do-firebase-2b1e4.appspot.com",
    messagingSenderId: "41274649604",
    appId: "1:41274649604:web:c5616283f1906aec219951"
  };
const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
export default db;