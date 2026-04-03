import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD9lgH3wWMwovkoOsLnDwbL7QLe5IVHNtg",
  authDomain: "viben-baeb4.firebaseapp.com",
  projectId: "viben-baeb4",
  storageBucket: "viben-baeb4.firebasestorage.app",
  messagingSenderId: "863183645176",
  appId: "1:863183645176:ios:2432b52b394ac12c038e0d"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
