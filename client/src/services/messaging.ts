import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { init as initFirebase } from './firebase';
import firebaseConfig from '../firebase-config';
import { api } from './api';

export async function init() {
  // Initialize the Firebase app with the credentials
  initFirebase();

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
        vapidKey: firebaseConfig[import.meta.env.MODE].vapidKey
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
