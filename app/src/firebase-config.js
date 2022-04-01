// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from '@firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDc7wmh1Az0geg-D1v9wMJUPqgqGA5cgdw",
  authDomain: "drone-food-delivery.firebaseapp.com",
  projectId: "drone-food-delivery",
  storageBucket: "drone-food-delivery.appspot.com",
  messagingSenderId: "188294630080",
  appId: "1:188294630080:web:dc1f04082f9c2485fbbb25"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);

export const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export const signInWithGoogle = () => {
  return signInWithPopup(auth, provider);
}
