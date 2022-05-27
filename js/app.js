// [START auth_signin_password_modular]
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBD5ZcQvTucYhZfXIF90h2IKNXTb1eF3yA",
  authDomain: "proxima-parada-001.firebaseapp.com",
  databaseURL: "https://proxima-parada-001-default-rtdb.firebaseio.com",
  projectId: "proxima-parada-001",
  storageBucket: "proxima-parada-001.appspot.com",
  messagingSenderId: "933133262129",
  appId: "1:933133262129:web:908e83750d11c2ccdbe410"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


