import { initializeApp } from "firebase/app";
import {getFirestore} from "@firebase/firestore";
// const firebaseConfig = {
//   apiKey: "AIzaSyCe3UewmZFB01JPI7jIdtMVUQsTYXSLq1E",
//   authDomain: "fir-intro-tut.firebaseapp.com",
//   projectId: "fir-intro-tut",
//   storageBucket: "fir-intro-tut.appspot.com",
//   messagingSenderId: "211424545",
//   appId: "1:211424545:web:bfe3542751eb0ef5081a60",
//   measurementId: "G-9Z0QEV04Y7",
// };
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};
const app = initializeApp(firebaseConfig);
export const db= getFirestore(app);