import { auth } from './firebase';
import { createUserWithEmailAndPassword, User as FirebaseUser } from 'firebase/auth';
import { createUserProfile } from './firestore';
import type { RegisterUserData } from '@/types/user';

/**
 * Firebase Authentication Service
 */

/**
 * Maps Firebase auth error codes to user-friendly Portuguese messages
 */
export function getAuthErrorMessage(errorCode: string): string {
  const errorMessages: Record<string, string> = {
    'auth/email-already-in-use': 'Este email já está em uso. Tente fazer login ou use outro email.',
    'auth/invalid-email': 'O email fornecido é inválido.',
    'auth/operation-not-allowed': 'Operação não permitida. Entre em contato com o suporte.',
    'auth/weak-password': 'A senha é muito fraca. Use pelo menos 6 caracteres.',
    'auth/network-request-failed': 'Erro de conexão. Verifique sua internet e tente novamente.',
    'auth/too-many-requests': 'Muitas tentativas. Aguarde um momento e tente novamente.',
  };

  return errorMessages[errorCode] || 'Ocorreu um erro inesperado. Tente novamente.';
}

/**
 * Registers a new user with email and password
 * Creates both Firebase Auth user and Firestore user profile
 */
export async function registerUser(userData: RegisterUserData): Promise<FirebaseUser> {
  try {
    // Create authentication user
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      userData.email,
      userData.password
    );

    const user = userCredential.user;

    // Create user profile in Firestore
    await createUserProfile({
      uid: user.uid,
      name: userData.name,
      email: userData.email,
    });

    return user;
  } catch (error: any) {
    // Re-throw with friendly message
    const errorMessage = getAuthErrorMessage(error.code);
    throw new Error(errorMessage);
  }
}
