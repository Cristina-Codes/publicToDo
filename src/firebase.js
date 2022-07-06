// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDRaLXv8f9kZdSCOx_Tog_fki7JTmF6OmM",
  authDomain: "personaltodo-4cbc0.firebaseapp.com",
  databaseURL: "https://personaltodo-4cbc0-default-rtdb.firebaseio.com",
  projectId: "personaltodo-4cbc0",
  storageBucket: "personaltodo-4cbc0.appspot.com",
  messagingSenderId: "517132422847",
  appId: "1:517132422847:web:66f3a820944e62a4bf000a"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export default firebase;