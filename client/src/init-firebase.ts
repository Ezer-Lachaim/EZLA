import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { connectAuthEmulator, getAuth } from 'firebase/auth';
import { api } from './Config';

export const initFirebaseApp = () => {
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
        vapidKey:
          'BCuU7yCkK_syBZI-Wm-aaUZJsnQkcLYlNBKxFzfvsEO03fX-JPJRPFLX_mufz9oqx0Q_cIWkbQc1IFQ_iRmcLl4'
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
