import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  User,
  UserCredential,
  Auth
} from 'firebase/auth';

/**
 * Authentication Service
 * Handles all Firebase authentication operations
 */
export class AuthService {
  private auth: Auth;

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
   * Create new user with email and password
   */
  async signUpWithEmail(email: string, password: string): Promise<UserCredential> {
    try {
      const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
      return userCredential;
    } catch (error: any) {
      throw this.handleAuthError(error);
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
   * Handle Firebase auth errors and convert to user-friendly messages
   */
  private handleAuthError(error: any): Error {
    let message = 'Ocorreu um erro. Tente novamente.';

    switch (error.code) {
      case 'auth/email-already-in-use':
        message = 'Este email já está em uso.';
        break;
      case 'auth/invalid-email':
        message = 'Email inválido.';
        break;
      case 'auth/operation-not-allowed':
        message = 'Operação não permitida.';
        break;
      case 'auth/weak-password':
        message = 'A senha é muito fraca. Use pelo menos 6 caracteres.';
        break;
      case 'auth/user-disabled':
        message = 'Esta conta foi desativada.';
        break;
      case 'auth/user-not-found':
        message = 'Usuário não encontrado.';
        break;
      case 'auth/wrong-password':
        message = 'Email ou senha incorretos.';
        break;
      case 'auth/too-many-requests':
        message = 'Muitas tentativas. Tente novamente mais tarde.';
        break;
      case 'auth/network-request-failed':
        message = 'Erro de conexão. Verifique sua internet.';
        break;
      case 'auth/invalid-credential':
        message = 'Email ou senha incorretos.';
        break;
      default:
        message = error.message || 'Ocorreu um erro. Tente novamente.';
    }

    return new Error(message);
  }
}
