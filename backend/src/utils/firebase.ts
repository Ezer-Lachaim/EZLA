import { App, initializeApp as initializeAppAdmin, ServiceAccount } from 'firebase-admin/app';
import { messaging, credential } from 'firebase-admin';
import { getAuth as getAdminAuth } from 'firebase-admin/auth';
import { MessagingPayload } from 'firebase-admin/lib/messaging/messaging-api';
import config from '../config';

let app: App;
if (config.firebase.authEmulatorHost) {
  app = initializeAppAdmin({ credential: credential.applicationDefault() });
} else {
  const serviceAccount: ServiceAccount = {
    projectId: config.firebase.projectId,
    privateKey: config.firebase.privateKey.replace(/\\n/g, '\n'),
    clientEmail: config.firebase.clientEmail
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
