import { App, initializeApp as initializeAppAdmin, ServiceAccount } from 'firebase-admin/app';
import { messaging, credential } from 'firebase-admin';
import { getAuth as getAdminAuth } from 'firebase-admin/auth';
import dotenv from 'dotenv';
import { MessagingPayload } from 'firebase-admin/lib/messaging/messaging-api';

dotenv.config();

let app: App;
if (process.env.FIREBASE_AUTH_EMULATOR_HOST) {
  app = initializeAppAdmin({ credential: credential.applicationDefault() });
} else {
  const serviceAccount: ServiceAccount = {
    projectId: 'ezla-pickup',
    privateKey: process.env.FIREBASE_ADMIN_AUTH.replace(/\\n/g, '\n'),
    clientEmail: 'firebase-adminsdk-mkix9@ezla-pickup.iam.gserviceaccount.com'
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
  return messaging().sendToDevice(registrationToken, payload);
}

export async function sendNewRideNotificationToDrivers() {
  try {
    return await messaging().send({
      notification: {
        title: 'נסיעה חדשה!',
        body: 'נסיעה חדשה מחכה לכם במערכת!'
      },
      topic: 'new-ride'
    });
  } catch (e) {
    console.log('Failed to send notification', e);
    return Promise.resolve();
  }
}

export async function subscribeToNewRideNotification(registrationToken: string) {
  return messaging().subscribeToTopic(registrationToken, 'new-ride');
}
