import { FirebaseOptions } from 'firebase/app';

export const config: {
  [key: string]: { options: FirebaseOptions; vapidKey: string };
} = {
  production: {
    options: {
      apiKey: 'AIzaSyAo5AZ1Na4l0YlfhZAlIr0FaLH_S4_1gfM',
      authDomain: 'ezla-pickup.firebaseapp.com',
      projectId: 'ezla-pickup',
      storageBucket: 'ezla-pickup.appspot.com',
      messagingSenderId: '708652536157',
      appId: '1:708652536157:web:53f1739dee1c5453eb58b4',
      measurementId: 'G-EK4J3MGLJ8'
    },
    vapidKey:
      'BCuU7yCkK_syBZI-Wm-aaUZJsnQkcLYlNBKxFzfvsEO03fX-JPJRPFLX_mufz9oqx0Q_cIWkbQc1IFQ_iRmcLl4'
  },
  staging: {
    options: {
      apiKey: 'AIzaSyAkPBVn0C7aoJpbxp5L-gzauxpF3D4Jy9Q',
      authDomain: 'ezla-pickup-staging.firebaseapp.com',
      projectId: 'ezla-pickup-staging',
      storageBucket: 'ezla-pickup-staging.appspot.com',
      messagingSenderId: '208094481469',
      appId: '1:208094481469:web:285463c84661e85f87ae54',
      measurementId: 'G-BD5EC5L3ZM'
    },
    vapidKey:
      'BAtO3frbblZyJmmC4fySOQBDcZmOM_W1oaCe1VEa_MFAXNA69T5keU3LEN8DinWPHvkaZCntxQESBV2aHVwIZBs'
  }
};

export default config;
