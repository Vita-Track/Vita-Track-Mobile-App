import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import {
  //@ts-ignore
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyAe5yKWhexOGSS0BcsNBe84nAeMfMefUeg",
  authDomain: "vitatrack-ce79b.firebaseapp.com",
  projectId: "vitatrack-ce79b",
  storageBucket: "vitatrack-ce79b.firebasestorage.app",
  messagingSenderId: "218940130301",
  appId: "1:218940130301:web:97dba3ad427054ac538f94",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app); // Realtime Database instance
const firestoreDb = getFirestore(app); // Firestore Database instance
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export { app, db, firestoreDb, auth };
