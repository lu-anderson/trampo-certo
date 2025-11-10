declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // Firebase Configuration
      EXPO_PUBLIC_FIREBASE_API_KEY: string;
      EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN: string;
      EXPO_PUBLIC_FIREBASE_PROJECT_ID: string;
      EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET: string;
      EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: string;
      EXPO_PUBLIC_FIREBASE_APP_ID: string;
      EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID: string;
      
      // App Configuration
      NODE_ENV: 'development' | 'production' | 'test';
      
      // Optional environment variables
      EXPO_PUBLIC_API_URL?: string;
      EXPO_PUBLIC_APP_VERSION?: string;
      EXPO_PUBLIC_DEBUG?: string;
    }
  }
}

// Expo Client Environment Variables Interface
export interface ExpoEnvironmentVariables {
  EXPO_PUBLIC_FIREBASE_API_KEY: string;
  EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN: string;
  EXPO_PUBLIC_FIREBASE_PROJECT_ID: string;
  EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET: string;
  EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: string;
  EXPO_PUBLIC_FIREBASE_APP_ID: string;
  EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID: string;
  EXPO_PUBLIC_API_URL?: string;
  EXPO_PUBLIC_APP_VERSION?: string;
  EXPO_PUBLIC_DEBUG?: string;
}

export {};