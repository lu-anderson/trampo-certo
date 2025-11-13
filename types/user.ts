/**
 * User type definitions
 */

export interface User {
  uid: string;
  name: string;
  email: string;
  createdAt: Date;
}

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  createdAt: string; // ISO string for Firestore
}

export interface RegisterUserData {
  name: string;
  email: string;
  password: string;
}
