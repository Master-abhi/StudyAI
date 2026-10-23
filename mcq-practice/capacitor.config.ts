import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.studyai.app',
  appName: 'CG Guru',
  webDir: '../public',
  plugins: {
    StatusBar: {
      style: 'DARK',
      backgroundColor: '#121620',
      overlaysWebView: false
    },
    SplashScreen: {
      launchShowDuration: 1500,
      launchAutoHide: true,
      backgroundColor: '#121620',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false
    }
  }
};

export default config;
