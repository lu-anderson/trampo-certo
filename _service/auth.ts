import type { RegisterUserData } from '@/types/user';
import {
  Auth,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  User,
  UserCredential
} from 'firebase/auth';
import { createUserProfile } from './firestore';

/**
 * Authentication Service
 * Handles all Firebase authentication operations
 */
export class AuthService {
  private readonly auth: Auth;

  constructor(auth: Auth) {
    this.auth = auth;
  }

  /**
   * Sign in with email and password
   */
  async signInWithEmail(email: string, password: string): Promise<UserCredential> {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      return userCredential;
    } catch (error: any) {
      throw this.handleAuthError(error);
    }
  }

  /**
   * Registers a new user with email and password
   * Creates both Firebase Auth user and Firestore user profile
   */
  async registerUser(userData: RegisterUserData): Promise<User> {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        userData.email,
        userData.password
      );

      const user = userCredential.user;

      await createUserProfile({
        uid: user.uid,
        name: userData.name,
        email: userData.email,
      });

      return user;
    } catch (error: any) {
      const errorMessage = this.handleAuthError(error.code);
      throw new Error(errorMessage);
    }
  }

  /**
   * Sign out current user
   */
  async signOut(): Promise<void> {
    try {
      await firebaseSignOut(this.auth);
    } catch (error: any) {
      throw this.handleAuthError(error);
    }
  }

  /**
   * Send password reset email
   */
  async resetPassword(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(this.auth, email);
    } catch (error: any) {
      throw this.handleAuthError(error);
    }
  }

  /**
   * Get current user
   */
  getCurrentUser(): User | null {
    return this.auth.currentUser;
  }


  /**
 * Maps Firebase auth error codes to user-friendly Portuguese messages
 */
  private handleAuthError(errorCode: string): string {
    const errorMessages: Record<string, string> = {
      'auth/email-already-in-use': 'Este email já está em uso. Tente fazer login ou use outro email.',
      'auth/invalid-email': 'O email fornecido é inválido.',
      'auth/operation-not-allowed': 'Operação não permitida. Entre em contato com o suporte.',
      'auth/weak-password': 'A senha é muito fraca. Use pelo menos 6 caracteres.',
      'auth/network-request-failed': 'Erro de conexão. Verifique sua internet e tente novamente.',
      'auth/user-disabled': 'Esta conta foi desativada. Entre em contato com o suporte.',
      'auth/user-not-found': 'Usuário não encontrado. Verifique o email e tente novamente.',
      'auth/wrong-password': 'Email ou senha incorretos. Tente novamente.',
      'auth/too-many-requests': 'Muitas tentativas. Aguarde um momento e tente novamente.',
      'auth/invalid-credential': 'Email ou senha incorretos. Tente novamente.',
    };

    return errorMessages[errorCode] || 'Ocorreu um erro inesperado. Tente novamente.';
  } 
}
