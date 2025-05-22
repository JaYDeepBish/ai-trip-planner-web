import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDfhyvX09cCwY8TgOV6VtkNwXkGeUqho2E",
  authDomain: "ai-planner-734a8.firebaseapp.com",
  projectId: "ai-planner-734a8",
  storageBucket: "ai-planner-734a8.firebasestorage.app",
  messagingSenderId: "49124032834",
  appId: "1:49124032834:web:f74dd90a7210d6177b48db",
  measurementId: "G-X9FTGPXE3K"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db=getFirestore(app);
//const analytics = getAnalytics(app);