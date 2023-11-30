export default interface IConfig {
  env: string; // NODE_ENV
  port: number; // PORT
  jwtSecret?: string; // JWT_SECRET
  allowGuestRideMode: boolean; // ALLOW_GUEST_RIDE_MODE
  firebase: {
    apiKey: string; // FIREBASE_TOKEN
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
    measurementId: string;
    clientEmail: string;
    authEmulatorHost?: string; // FIREBASE_AUTH_EMULATOR_HOST
    privateKey?: string; // FIREBASE_ADMIN_AUTH
  };
  redis: {
    host: string; // REDIS_HOST
    port: number; // REDIS_PORT
    caCert: string; // REDIS_CA_CERT
    user: string; // REDIS_USER
    pass: string; // REDIS_PASS
  };
  sms: {
    isOn: boolean; // SMS_IS_ON
    awsAccessKeyId?: string; // AWS_SMS_ACCESS_KEY_ID
    awsSecretAccessKey?: string; // AWS_SMS_SECRET_ACCESS_KEY
  };
}
