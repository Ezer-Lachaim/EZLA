import IConfig from '../iConfig';

export default {
  env: 'default',
  port: 3000,
  allowGuestRideMode: false,
  jwtSecret: 'DEV_SECRET',
  firebase: {
    apiKey: 'API_KEY',
    authDomain: 'ezla-pickup-staging.firebaseapp.com',
    projectId: 'ezla-pickup-staging',
    storageBucket: 'ezla-pickup-staging.appspot.com',
    messagingSenderId: '208094481469',
    appId: '1:208094481469:web:285463c84661e85f87ae54',
    measurementId: 'G-BD5EC5L3ZM',
    clientEmail: 'firebase-adminsdk-trbim@ezla-pickup-staging.iam.gserviceaccount.com'
  },
  redis: {
    host: 'localhost',
    port: 6379,
    caCert: '',
    user: '',
    pass: ''
  },
  sms: {
    isOn: false
  }
} as IConfig;
