// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'xxxxxxxxxxxxxxx',
  authDomain: 'xxxxxxxxxxxxxxx',
  projectId: 'xxxxxxxxxxxxxxx',
  storageBucket: 'xxxxxxxxxxxxxxx',
  messagingSenderId: 'xxxxxxxxxxxxxxx',
  appId: 'xxxxxxxxxxxxxxx',
  measurementId: 'xxxxxxxxxxxxxxx'
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app)
const analytics = getAnalytics(app);