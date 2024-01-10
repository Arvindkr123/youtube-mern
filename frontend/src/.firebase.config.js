import { initializeApp } from "firebase/app";
import {
  REACT_APP_apiKey,
  REACT_APP_appId,
  REACT_APP_authDomain,
  REACT_APP_messagingSenderId,
  REACT_APP_projectId,
  REACT_APP_storageBucket,
} from "./config";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: REACT_APP_apiKey,
  authDomain: REACT_APP_authDomain,
  projectId: REACT_APP_projectId,
  storageBucket: REACT_APP_storageBucket,
  messagingSenderId: REACT_APP_messagingSenderId,
  appId: REACT_APP_appId,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export default app;
