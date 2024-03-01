import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDEwHJkeMbhy_bse6AO1j2sOPtyZ32Cbew",
  authDomain: "dropbox-e3bde.firebaseapp.com",
  projectId: "dropbox-e3bde",
  storageBucket: "dropbox-e3bde.appspot.com",
  messagingSenderId: "1023282603161",
  appId: "1:1023282603161:web:30661add9f60718af0c408",
  measurementId: "G-B15DBG2CPW",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
