// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getReactNativePersistence, initializeAuth } from 'firebase/auth'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore, collection } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBmqioTq_kCB2rzMU7efoNmUWJ5EQti3LE",
  authDomain: "mobile-chat-b57ff.firebaseapp.com",
  projectId: "mobile-chat-b57ff",
  storageBucket: "mobile-chat-b57ff.firebasestorage.app",
  messagingSenderId: "354172535439",
  appId: "1:354172535439:web:203ce4407de5f3198ee6fa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
})

export const db = getFirestore(app);
export const usersRef = collection(db, 'users'); 
export const roomRef = collection(db, 'rooms'); 