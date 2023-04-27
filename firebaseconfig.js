// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDMmbDOOpGbz6axfWHhUXOeMggAoWBlViU",
  authDomain: "diabetesselfmanagement-fb7d5.firebaseapp.com",
  projectId: "diabetesselfmanagement-fb7d5",
  storageBucket: "diabetesselfmanagement-fb7d5.appspot.com",
  messagingSenderId: "33994983275",
  appId: "1:33994983275:web:45263d201bae71c1abae2e",
  measurementId: "G-TSBZBM72YS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const storage = getStorage(app);
// const storageRef = ref(storage);
