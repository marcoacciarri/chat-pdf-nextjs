// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAwRmNm7RySX2YG3RBIegFlH3hKT4hgV1g",
    authDomain: "chat-pdf-nextjs.firebaseapp.com",
    projectId: "chat-pdf-nextjs",
    storageBucket: "chat-pdf-nextjs.appspot.com",
    messagingSenderId: "556235435282",
    appId: "1:556235435282:web:08262bc2a83ad61a53d7cb"
};

// Initialize Firebase making sure there is only 1 instance of app 
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Create your DB in Firestore by going to Build > Firestore Database 
const db = getFirestore(app);

// Initialize Firebase Storage by going to Build > Storage
const storage = getStorage(app);

export { db, storage }; 