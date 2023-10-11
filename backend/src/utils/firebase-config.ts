import { initializeApp } from 'firebase/app';
import { App, initializeApp as initializeAppAdmin, ServiceAccount } from 'firebase-admin/app';
import { messaging, credential } from 'firebase-admin';

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  connectAuthEmulator
} from 'firebase/auth';
import { getAuth as getAdminAuth } from 'firebase-admin/auth';

import dotenv from 'dotenv';
import { MessagingPayload } from 'firebase-admin/lib/messaging/messaging-api';

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_AUTH_EMULATOR_HOST ? 'API_KEY' : process.env.FIREBASE_TOKEN,
  authDomain: 'ezla-pickup.firebaseapp.com',
  projectId: 'ezla-pickup',
  storageBucket: 'ezla-pickup.appspot.com',
  messagingSenderId: '708652536157',
  appId: '1:708652536157:web:53f1739dee1c5453eb58b4',
  measurementId: 'G-EK4J3MGLJ8'
};

let app: App;

initializeApp(firebaseConfig);

if (process.env.FIREBASE_AUTH_EMULATOR_HOST) {
  app = initializeAppAdmin({ credential: credential.applicationDefault() });
  const auth = getAuth();
  connectAuthEmulator(auth, 'http://127.0.0.1:9099');
} else {
  const serviceAccount: ServiceAccount = {
    projectId: 'ezla-pickup',
    privateKey: process.env.FIREBASE_ADMIN_AUTH.replace(/\\n/g, '\n'),
    clientEmail: 'firebase-adminsdk-mkix9@ezla-pickup.iam.gserviceaccount.com'
  };
  app = initializeAppAdmin({ credential: credential.cert(serviceAccount) });
}

export function getAuthConfig() {
  return getAuth();
}

export function getAuthConfigAdmin() {
  return getAdminAuth(app);
}

export async function updateUserPassword(uid: string, password: string) {
  return getAdminAuth(app).updateUser(uid, { password });
}

export async function sendPasswordResetEmailForUser(email: string) {
  return sendPasswordResetEmail(getAuth(), email);
}

export async function getUser(email: string) {
  return getAuthConfigAdmin().getUserByEmail(email);
}

export async function sendPushNotification(registrationToken: string, payload: MessagingPayload) {
  return messaging().sendToDevice(registrationToken, payload);
}

export async function sendNewRideNotificationToDrivers() {
  return messaging().sendToTopic('new-ride', {
    notification: { title: 'נסיעה חדשה!', body: 'נסיעה חדשה ממתינה לכם במערכת.' }
  });
}

export async function subscribeToNewRideNotification(registrationToken: string) {
  return messaging().subscribeToTopic(registrationToken, 'new-ride');
}

export const firebase = {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
};
