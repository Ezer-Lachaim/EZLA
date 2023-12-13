import IConfig from '../iConfig';

export default {
  env: 'default',
  port: 3000,
  allowGuestRideMode: false,
  firebase: {
    projectId: 'ezla-pickup-staging',
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
