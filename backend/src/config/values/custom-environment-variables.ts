export default {
  env: 'NODE_ENV',
  port: 'PORT',
  allowGuestRideMode: {
    __name: 'ALLOW_GUEST_RIDE_MODE',
    __format: 'boolean'
  },
  firebase: {
    authEmulatorHost: 'FIREBASE_AUTH_EMULATOR_HOST',
    privateKey: 'FIREBASE_ADMIN_AUTH'
  },
  redis: {
    host: 'REDIS_HOST',
    port: 'REDIS_PORT',
    caCert: 'REDIS_CA_CERT',
    user: 'REDIS_USER',
    pass: 'REDIS_PASS'
  },
  sms: {
    isOn: {
      __name: 'SMS_IS_ON',
      __format: 'boolean'
    },
    awsAccessKeyId: 'AWS_SMS_ACCESS_KEY_ID',
    awsSecretAccessKey: 'AWS_SMS_SECRET_ACCESS_KEY'
  }
};
