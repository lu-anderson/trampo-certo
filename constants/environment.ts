import type { ExpoEnvironmentVariables } from '../types/env';

/**
 * Safely access environment variables with TypeScript support
 */
class EnvironmentConfig {
  private static instance: EnvironmentConfig;
  private readonly env: ExpoEnvironmentVariables;

  private constructor() {
    this.env = process.env as ExpoEnvironmentVariables;
    
    this.validateRequiredVars();
  }

  public static getInstance(): EnvironmentConfig {
    if (!EnvironmentConfig.instance) {
      EnvironmentConfig.instance = new EnvironmentConfig();
    }
    return EnvironmentConfig.instance;
  }

  private validateRequiredVars(): void {
    const requiredVars: (keyof ExpoEnvironmentVariables)[] = [
      'EXPO_PUBLIC_FIREBASE_API_KEY',
      'EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN',
      'EXPO_PUBLIC_FIREBASE_PROJECT_ID',
      'EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET',
      'EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
      'EXPO_PUBLIC_FIREBASE_APP_ID',
      'EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID',
    ];

    const missingVars = requiredVars.filter(varName => {
      const value = this.env[varName];
      return !value || value.trim() === '';
    });

    if (missingVars.length > 0) {
      const errorMessage = [
        'Missing required environment variables:',
        ...missingVars.map(varName => `  • ${varName}`),
        '',
        'Please check your .env file and ensure all variables are set.',
        'See .env.example for reference.',
      ].join('\n');

      throw new Error(errorMessage);
    }
  }

  // Firebase Configuration
  public get firebaseConfig() {
    return {
      apiKey: this.env.EXPO_PUBLIC_FIREBASE_API_KEY,
      authDomain: this.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: this.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
      storageBucket: this.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: this.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      appId: this.env.EXPO_PUBLIC_FIREBASE_APP_ID,
      measurementId: this.env.EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID,
    };
  }

  // App Configuration
  public get apiUrl(): string {
    return this.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3000';
  }

  public get appVersion(): string {
    return this.env.EXPO_PUBLIC_APP_VERSION ?? '1.0.0';
  }

  public get isDebug(): boolean {
    return this.env.EXPO_PUBLIC_DEBUG === 'true' || __DEV__;
  }

  public get isDevelopment(): boolean {
    return __DEV__;
  }

  public get isProduction(): boolean {
    return !__DEV__;
  }
}

const env = EnvironmentConfig.getInstance();

export default env;