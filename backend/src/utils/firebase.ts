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

import { MessagingPayload } from 'firebase-admin/lib/messaging/messaging-api';
import config from '../config';

let app: App;
initializeApp({
  apiKey: config.firebase.apiKey,
  authDomain: config.firebase.authDomain,
  projectId: config.firebase.projectId,
  storageBucket: config.firebase.storageBucket,
  messagingSenderId: config.firebase.messagingSenderId,
  appId: config.firebase.appId,
  measurementId: config.firebase.measurementId
});

if (config.firebase.authEmulatorHost) {
  app = initializeAppAdmin({ credential: credential.applicationDefault() });
  const auth = getAuth();
  connectAuthEmulator(auth, 'http://127.0.0.1:9099');
} else {
  const serviceAccount: ServiceAccount = {
    projectId: config.firebase.projectId,
    privateKey: config.firebase.privateKey.replace(/\\n/g, '\n'),
    clientEmail: config.firebase.clientEmail
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
  if (config.firebase.authEmulatorHost) {
    return Promise.resolve();
  }

  return messaging().sendToDevice(registrationToken, payload);
}

export async function sendNewRideNotificationToDrivers() {
  if (config.firebase.authEmulatorHost) {
    return Promise.resolve();
  }

  return messaging().send({
    notification: {
      title: 'נסיעה חדשה!',
      body: 'נסיעה חדשה מחכה לכם במערכת!'
    },
    topic: 'new-ride'
  });
}

export async function subscribeToNewRideNotification(registrationToken: string) {
  if (config.firebase.authEmulatorHost) {
    return Promise.resolve();
  }

  return messaging().subscribeToTopic(registrationToken, 'new-ride');
}

export const firebase = {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
};
