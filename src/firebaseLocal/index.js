import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFirebaseConfig } from "./firebase-config";

const firebaseApp = initializeApp(getFirebaseConfig());
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export { auth, db };
