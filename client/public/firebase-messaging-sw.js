importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');

const VPAIDKEY = 'BCuU7yCkK_syBZI-Wm-aaUZJsnQkcLYlNBKxFzfvsEO03fX-JPJRPFLX_mufz9oqx0Q_cIWkbQc1IFQ_iRmcLl4'

firebase.initializeApp({
  apiKey: 'AIzaSyAo5AZ1Na4l0YlfhZAlIr0FaLH_S4_1gfM',
  authDomain: 'ezla-pickup.firebaseapp.com',
  projectId: 'ezla-pickup',
  storageBucket: 'ezla-pickup.appspot.com',
  messagingSenderId: '708652536157',
  appId: '1:708652536157:web:53f1739dee1c5453eb58b4',
  measurementId: 'G-EK4J3MGLJ8'
});

const messaging = firebase.messaging();
messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});
console.log('messaging >', messaging);