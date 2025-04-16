import {initializeApp} from "firebase/app";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyAL2CmKq5b8cCxhyQsVVL5PiHcjfyr-zB4",
    authDomain: "e-commerce-project-210dd.firebaseapp.com",
    projectId: "e-commerce-project-210dd",
    storageBucket: "e-commerce-project-210dd.firebasestorage.app",
    messagingSenderId: "986246532904",
    appId: "1:986246532904:web:48ba614c86d4dd20414a1d",
    measurementId: "G-NNL75PTJJT"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export {storage};