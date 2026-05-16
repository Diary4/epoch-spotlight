import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.gok.build',
  appName: 'GOK',
  webDir: 'dist',
  backgroundColor: '#0F0B08',
  server: {
    androidScheme: 'https',
  },
  android: {
    backgroundColor: '#0F0B08',
  },
};

export default config;
