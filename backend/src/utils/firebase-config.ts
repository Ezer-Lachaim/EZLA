import { initializeApp } from 'firebase/app';
import { initializeApp as initializeAppAdmin, ServiceAccount } from 'firebase-admin/app';

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getAuth as getAdminAuth } from 'firebase-admin/auth';

import dotenv from 'dotenv';
import { credential } from 'firebase-admin';

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_TOKEN,
  authDomain: 'ezla-pickup.firebaseapp.com',
  projectId: 'ezla-pickup',
  storageBucket: 'ezla-pickup.appspot.com',
  messagingSenderId: '708652536157',
  appId: '1:708652536157:web:53f1739dee1c5453eb58b4',
  measurementId: 'G-EK4J3MGLJ8'
};

const serviceAccount: ServiceAccount = {
  projectId: 'ezla-pickup',
  privateKey: process.env.FIREBASE_ADMIN_AUTH.replace(/\\n/g, '\n'),
  clientEmail: 'firebase-adminsdk-mkix9@ezla-pickup.iam.gserviceaccount.com'
};

initializeApp(firebaseConfig);
const app = initializeAppAdmin({ credential: credential.cert(serviceAccount) });

export function getAuthConfig() {
  return getAuth();
}

export function getAuthConfigAdmin() {
  return getAdminAuth(app);
}

export async function updateUserPassword(uid: string, password: string) {
  return getAdminAuth(app).updateUser(uid, { password });
}

export const firebase = {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
};
