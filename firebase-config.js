import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDe35LLnKCEfPg2ca_UTI_IqsXn8_66Hpo",
  authDomain: "project-split-5612f.firebaseapp.com",
  projectId: "project-split-5612f",
  storageBucket: "project-split-5612f.appspot.com",
  messagingSenderId: "831235356195",
  appId: "1:831235356195:web:fcbf3e6544a8dca7f62396",
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
