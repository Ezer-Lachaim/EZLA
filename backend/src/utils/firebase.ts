import { App, initializeApp as initializeAppAdmin, ServiceAccount } from 'firebase-admin/app';
import { messaging, credential } from 'firebase-admin';
import { getAuth as getAdminAuth } from 'firebase-admin/auth';
import dotenv from 'dotenv';
import { MessagingPayload } from 'firebase-admin/lib/messaging/messaging-api';
import { config as firebaseConfig } from './firebase-config';

dotenv.config();

let app: App;
if (process.env.FIREBASE_AUTH_EMULATOR_HOST) {
  app = initializeAppAdmin({ credential: credential.applicationDefault() });
} else {
  const envFirebaseConfig = firebaseConfig[process.env.ENV || 'production'];
  console.log(envFirebaseConfig);

  const serviceAccount: ServiceAccount = {
    projectId: envFirebaseConfig.projectId,
    privateKey: process.env.FIREBASE_ADMIN_AUTH.replace(/\\n/g, '\n'),
    clientEmail: envFirebaseConfig.clientEmail
  };
  app = initializeAppAdmin({ credential: credential.cert(serviceAccount) });
}

export function getAuthConfigAdmin() {
  return getAdminAuth(app);
}

export async function updateUserPassword(uid: string, password: string) {
  return getAdminAuth(app).updateUser(uid, { password });
}

export async function getUser(email: string) {
  return getAuthConfigAdmin().getUserByEmail(email);
}

export async function createUser(email: string, password: string) {
  return getAuthConfigAdmin().createUser({ email, password });
}

export async function sendPushNotification(registrationToken: string, payload: MessagingPayload) {
  if (process.env.FIREBASE_AUTH_EMULATOR_HOST) {
    return Promise.resolve();
  }
  return messaging().sendToDevice(registrationToken, payload);
}

export async function sendNewRideNotificationToDrivers() {
  if (process.env.FIREBASE_AUTH_EMULATOR_HOST) {
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
  if (process.env.FIREBASE_AUTH_EMULATOR_HOST) {
    return Promise.resolve();
  }
  return messaging().subscribeToTopic(registrationToken, 'new-ride');
}
