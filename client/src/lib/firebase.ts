// Firebase configuration and initialization
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Firebase config from environment variables
const firebaseConfig = {
  apiKey: "AIzaSyC4Vc3kXa-t0iA93GFdqamC8Y7_MkNtdd8",
  authDomain: "todo-5f5a5.firebaseapp.com",
  projectId: "todo-5f5a5",
  storageBucket: "todo-5f5a5.firebasestorage.app",
  messagingSenderId: "978475447041",
  appId: "1:978475447041:web:84308473513b3a4beb2100"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
export const db = getFirestore(app);
