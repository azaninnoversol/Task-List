import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA3pJSyPTDLtZYsAgGImq8e3ILiz8qvf_M",
  authDomain: "web-and-app-developer-45c10.firebaseapp.com",
  projectId: "web-and-app-developer-45c10",
  storageBucket: "web-and-app-developer-45c10.firebasestorage.app",
  messagingSenderId: "269925728383",
  appId: "1:269925728383:web:282aa328e7f5439eaf7f4a",
  measurementId: "G-DZSKZ045ME",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { auth, db };
