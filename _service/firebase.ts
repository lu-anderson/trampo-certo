import env from "@/constants/environment";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { AuthService } from "./auth";

// Initialize Firebase
const app = initializeApp(env.firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Auth Service
const authService = new AuthService(auth);

export { auth, authService };
