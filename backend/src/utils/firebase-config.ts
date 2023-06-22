
import { initializeApp } from "firebase/app"
import { initializeApp as initializeAppAdmin } from "firebase-admin/app"
require('dotenv').config()
import {
    getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,
    signOut,
} from "firebase/auth"
import {
    getAuth as getAdminAuth
} from "firebase-admin/auth"

const firebaseConfig = {
    apiKey: process.env.FIREBASE_TOKEN,
    authDomain: 'ezla-pickup.firebaseapp.com',
    projectId: 'ezla-pickup',
    storageBucket: 'ezla-pickup.appspot.com',
    messagingSenderId: '708652536157',
    appId: '1:708652536157:web:53f1739dee1c5453eb58b4',
    measurementId: 'G-EK4J3MGLJ8'
};

initializeApp(firebaseConfig);
const app = initializeAppAdmin(firebaseConfig)


export function getAuthConfig(){
    return getAuth();
}

export function getAuthConfigAdmin(){
    return getAdminAuth(app);
}

export const firebase = {
    signInWithEmailAndPassword: signInWithEmailAndPassword,
    createUserWithEmailAndPassword: createUserWithEmailAndPassword
}