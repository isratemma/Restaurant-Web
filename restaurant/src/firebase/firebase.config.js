import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA4ervqJ7gKNF5Xd-hShIe5lFRLzZYlGMA",
  authDomain: "restaurant-3f315.firebaseapp.com",
  projectId: "restaurant-3f315",
  storageBucket: "restaurant-3f315.firebasestorage.app",
  messagingSenderId: "839807980522",
  appId: "1:839807980522:web:5322aed89f16c8eb4b5893",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);
export default app;
