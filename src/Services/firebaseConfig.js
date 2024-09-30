import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDzJRUyxVn-xnTjVH7k0TSRqh-Zjs9rNFw",
  authDomain: "barbearia-bc1a8.firebaseapp.com",
  projectId: "barbearia-bc1a8",
  storageBucket: "barbearia-bc1a8.appspot.com",
  messagingSenderId: "763186477815",
  appId: "1:763186477815:web:985300bcac3e3e490271f2"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)