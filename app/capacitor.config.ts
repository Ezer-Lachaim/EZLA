import { CapacitorConfig } from '@capacitor/cli';

export default {
  appId: 'com.EZLA',
  appName: 'עזר לחיים',
  webDir: '../client/dist',
  server: {
    androidScheme: 'https'
  }
} satisfies CapacitorConfig;
