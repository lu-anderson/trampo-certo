import env from "@/constants/environment";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { AuthService } from "./auth";

// Initialize Firebase
const app = initializeApp(env.firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Auth Service
const authService = new AuthService(auth);

// Initialize Firestore and get a reference to the service
const firestore = getFirestore(app);

export { auth, authService, firestore };
