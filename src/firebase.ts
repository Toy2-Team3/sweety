import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBL2ViWI0WURPIwALsICqbBxlTcVw5PolY",
  authDomain: "sweety-toy3.firebaseapp.com",
  projectId: "sweety-toy3",
  storageBucket: "sweety-toy3.appspot.com",
  messagingSenderId: "777465339021",
  appId: "1:777465339021:web:a9384f6032011163a8d6c4",
  measurementId: "G-SQNM4T4425",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { db, storage, auth };
