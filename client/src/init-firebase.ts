import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { api } from './Config';
import firebaseConfig from './firebase-config';

export const initFirebaseApp = () => {
  initializeApp(firebaseConfig[`${import.meta.env.MODE}`].options);

  if (import.meta.env.DEV) {
    const auth = getAuth();
    connectAuthEmulator(auth, 'http://127.0.0.1:9099');
  }
};

export const initFirebaseCloudMessaging = async () => {
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
};

export const setNotificationsToken = async () => {
  try {
    // Request the push notification permission from browser
    const status = await Notification.requestPermission();
    // console.log('status >', status);
    if (status === 'granted') {
      // Get new token from Firebase
      const messaging = getMessaging();
      // console.log(messaging);
      const fcmToken = await getToken(messaging, {
        vapidKey: firebaseConfig[`${import.meta.env.MODE}`].vapidKey
      });

      // Set token in our local storage and send to our server
      if (fcmToken) {
        console.log('fcmToken >>', fcmToken);
        api.user.registerFcmToken({ registerFcmTokenRequest: { fcmToken } });
      }
    }
  } catch (error) {
    console.error(error);
  }
};
