import dotenv from 'dotenv';

dotenv.config();

export const config: {
  [key: string]: any;
} = {
  production: {
    apiKey: process.env.FIREBASE_AUTH_EMULATOR_HOST ? 'API_KEY' : process.env.FIREBASE_TOKEN,
    authDomain: 'ezla-pickup.firebaseapp.com',
    projectId: 'ezla-pickup',
    storageBucket: 'ezla-pickup.appspot.com',
    messagingSenderId: '708652536157',
    appId: '1:708652536157:web:53f1739dee1c5453eb58b4',
    measurementId: 'G-EK4J3MGLJ8',
    clientEmail: 'firebase-adminsdk-mkix9@ezla-pickup.iam.gserviceaccount.com'
  },
  staging: {
    apiKey: process.env.FIREBASE_TOKEN,
    authDomain: 'ezla-pickup-staging.firebaseapp.com',
    projectId: 'ezla-pickup-staging',
    storageBucket: 'ezla-pickup-staging.appspot.com',
    messagingSenderId: '208094481469',
    appId: '1:208094481469:web:285463c84661e85f87ae54',
    measurementId: 'G-BD5EC5L3ZM',
    clientEmail: 'firebase-adminsdk-trbim@ezla-pickup-staging.iam.gserviceaccount.com'
  }
};
