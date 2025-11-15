import type { UserProfile } from '@/types/user';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { firestore } from './firebase';

/**
 * Firestore Database Service
 */

const COLLECTIONS = {
  USERS: 'users',
} as const;

/**
 * Creates a user profile in Firestore
 * Links the profile to the Firebase Auth user by UID
 */
export async function createUserProfile(data: {
  uid: string;
  name: string;
  email: string;
}): Promise<void> {
  try {
    const userRef = doc(firestore, COLLECTIONS.USERS, data.uid);

    const userProfile: UserProfile = {
      uid: data.uid,
      name: data.name,
      email: data.email,
      createdAt: new Date().toISOString(),
    };

    await setDoc(userRef, userProfile);
  } catch (error) {
    console.error('Error creating user profile:', error);
    throw new Error('Erro ao criar perfil do usuário');
  }
}

/**
 * Gets a user profile from Firestore by UID
 */
export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  try {
    const userRef = doc(firestore, COLLECTIONS.USERS, uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return userSnap.data() as UserProfile;
    }

    return null;
  } catch (error) {
    console.error('Error getting user profile:', error);
    throw new Error('Erro ao buscar perfil do usuário');
  }
}
