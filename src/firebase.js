import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC1BL-o-JhaUrYV9ZKZzVlghJhIt9Bnp0Y",
  authDomain: "hostelhub-236c0.firebaseapp.com",
  projectId: "hostelhub-236c0",
  storageBucket: "hostelhub-236c0.firebasestorage.app",
  messagingSenderId: "868930123364",
  appId: "1:868930123364:web:e92a4a3b48abf415221171",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);