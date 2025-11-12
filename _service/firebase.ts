import env from "@/constants/environment";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Initialize Firebase
const app = initializeApp(env.firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
