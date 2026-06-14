import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCMD_OniTMiPzBL-CDCpuuVGvL-vXCxnPY",
  authDomain: "autenticador-2fa-62026.firebaseapp.com",
  projectId: "autenticador-2fa-62026",
  storageBucket: "autenticador-2fa-62026.firebasestorage.app",
  messagingSenderId: "679998211138",
  appId: "1:679998211138:web:2782e9d01d5720b24899db",
  measurementId: "G-3CZJVFX2H7"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();