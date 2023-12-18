import "firebase/compat/database";
import "firebase/compat/storage";
import "firebase/compat/firestore";
import firebase from "firebase/compat/app";
import {
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGIN_ID,
  ID,
  MEASUREMENT_ID,
} from "@env";
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGIN_ID,
  appId: ID,
  measurementId: MEASUREMENT_ID,
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };
