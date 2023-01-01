import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
   apiKey: "AIzaSyDulgoLvcnpaeu25ysSneHiccGH3Uwm0VU",
   authDomain: "datn-fc240.firebaseapp.com",
   projectId: "datn-fc240",
   storageBucket: "datn-fc240.appspot.com",
   messagingSenderId: "479169384161",
   appId: "1:479169384161:web:87242520030b50fdab31a0",
   measurementId: "G-EXS1KGF54X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider();

export { auth, provider };