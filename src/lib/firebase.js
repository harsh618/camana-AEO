import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCq7uVyckpcNqPxqZ_3_3q-cgShPVNxL3E",
    authDomain: "camanahomes-ai-visibility.firebaseapp.com",
    projectId: "camanahomes-ai-visibility",
    storageBucket: "camanahomes-ai-visibility.firebasestorage.app",
    messagingSenderId: "36013734809",
    appId: "1:36013734809:web:b740af25f2270d2311b108",
    measurementId: "G-BWP84ESQ00"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
