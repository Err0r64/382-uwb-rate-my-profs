// Import the Firebase SDK
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyCrgg_d6M-3V9xGagDK1AdHBK-EhGqoukM",
  authDomain: "rate-my-husky.firebaseapp.com",
  projectId: "rate-my-husky",
  storageBucket: "rate-my-husky.firebasestorage.app",
  messagingSenderId: "852611730670",
  appId: "1:852611730670:web:50febe1982a47ce35377ff",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
const auth = getAuth(app);

export { auth };