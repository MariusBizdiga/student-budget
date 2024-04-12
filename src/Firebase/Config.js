import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from "firebase/auth"
import {collection, getFirestore, onSnapshot} from "firebase/firestore"
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDDP71CnxfrWO18e2LRWbxtbLCQ6gPZYko",
  authDomain: "student-budget-5a3db.firebaseapp.com",
  projectId: "student-budget-5a3db",
  storageBucket: "student-budget-5a3db.appspot.com",
  messagingSenderId: "349088924743",
  appId: "1:349088924743:web:2006efc1d02e7db75edd62",
  measurementId: "G-CRBPTRZ96E"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app); // for authentication to ensure registration before using the app 
export const database = getFirestore(app); // connect to your database
export const provider = new GoogleAuthProvider(); // this is the auth provider for your registration , There are a lot of auth eg google etc

const ref = collection(database,"transactions"); // ensure to give a different name for your collection/ database name
