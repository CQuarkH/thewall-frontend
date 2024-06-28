import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBl0R1OiMT4a-ejlsFHC1PYZ7hsgvWRdF0",
    authDomain: "natter-b1a5e.firebaseapp.com",
    projectId: "natter-b1a5e",
    storageBucket: "natter-b1a5e.appspot.com",
    messagingSenderId: "335159584474",
    appId: "1:335159584474:web:e1de4d7948910025e967e3"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app, "gs://natter-b1a5e.appspot.com");

export { storage };
