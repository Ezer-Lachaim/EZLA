import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import {
  Auth,
  getAuth as firebaseGetAuth,
  connectAuthEmulator,
  createUserWithEmailAndPassword,
  deleteUser,
  signInWithEmailAndPassword,
  signOut,
  getIdToken,
  sendPasswordResetEmail,
  checkActionCode,
  confirmPasswordReset
} from 'firebase/auth';
import { addPostMiddleware, addPreMiddleware, api } from './api';

let initialized = false;

export function initFirebaseApp() {
  if (initialized) return;

  initialized = true;

  initializeApp({
    apiKey: 'AIzaSyAo5AZ1Na4l0YlfhZAlIr0FaLH_S4_1gfM',
    authDomain: 'ezla-pickup.firebaseapp.com',
    projectId: 'ezla-pickup',
    storageBucket: 'ezla-pickup.appspot.com',
    messagingSenderId: '708652536157',
    appId: '1:708652536157:web:53f1739dee1c5453eb58b4',
    measurementId: 'G-EK4J3MGLJ8'
  });

  if (import.meta.env.DEV) {
    const auth = firebaseGetAuth();
    connectAuthEmulator(auth, 'http://127.0.0.1:9099');
  }
}

export function getAuth() {
  initFirebaseApp();
  return firebaseGetAuth();
}

export async function authCreateUser(email: string, password: string) {
  return createUserWithEmailAndPassword(getAuth(), email, password);
}

export { deleteUser as authDeleteUser };

export async function authSignIn(email: string, password: string) {
  return signInWithEmailAndPassword(getAuth(), email, password);
}

export async function authSignOut() {
  return signOut(getAuth());
}

export function onAuthStateChanged(...args: Parameters<Auth['onAuthStateChanged']>) {
  const auth = getAuth();
  return auth.onAuthStateChanged(...args);
}

export async function authSendPasswordResetEmail(email: string) {
  return sendPasswordResetEmail(getAuth(), email);
}

export async function authCheckActionCode(oobCode: string) {
  return checkActionCode(getAuth(), oobCode);
}

export async function authConfirmPasswordReset(oobCode: string, newPassword: string) {
  return confirmPasswordReset(getAuth(), oobCode, newPassword);
}

export async function getAuthUserToken() {
  const auth = getAuth();
  if (!auth.currentUser) {
    return null;
  }

  return getIdToken(auth.currentUser);
}

export function initAuthApiMiddlewares() {
  // add token header to all api requests
  addPreMiddleware(async (params) => {
    return {
      ...params,
      init: {
        ...params?.init,
        headers: {
          ...params.init.headers,
          token: (await getAuthUserToken()) || ''
        }
      }
    };
  });

  // empty the token in case of an unauthorized status
  addPostMiddleware(async (context) => {
    if (context.response.status === 401) {
      await authSignOut();
    }
  });
}

export async function initFirebaseCloudMessaging() {
  // Initialize the Firebase app with the credentials
  initFirebaseApp();

  try {
    // Request the push notification permission from browser
    const status = await Notification.requestPermission();
    // console.log('status >', status);
    if (status === 'granted') {
      // Get new token from Firebase
      const messaging = getMessaging();
      // console.log(messaging);

      // Set token in our local storage and send to our server
      onMessage(messaging, (payload) => {
        console.log('Message received.', payload);
        // window.location.reload();
      });
    }
  } catch (error) {
    console.error(error);
  }
}

export async function setNotificationsToken() {
  try {
    // Request the push notification permission from browser
    const status = await Notification.requestPermission();
    // console.log('status >', status);
    if (status === 'granted') {
      // Get new token from Firebase
      const messaging = getMessaging();
      // console.log(messaging);
      const fcmToken = await getToken(messaging, {
        vapidKey:
          'BCuU7yCkK_syBZI-Wm-aaUZJsnQkcLYlNBKxFzfvsEO03fX-JPJRPFLX_mufz9oqx0Q_cIWkbQc1IFQ_iRmcLl4'
      });

      // Set token in our local storage and send to our server
      if (fcmToken) {
        console.log('fcmToken >>', fcmToken);
        await api.user.registerFcmToken({ registerFcmTokenRequest: { fcmToken } });
      }
    }
  } catch (error) {
    console.error(error);
  }
}
