# Firebase Authentication Setup

## Overview
This project now has Firebase Email/Password authentication configured following best practices for separation of concerns and architectural patterns.

## Architecture

### Service Layer (`_service/`)
- **`firebase.ts`**: Firebase initialization and configuration
- **`auth.ts`**: Authentication service with all auth operations (signIn, signUp, signOut, resetPassword)
  - Handles Firebase auth errors and converts them to user-friendly Portuguese messages
  - Provides a clean API for authentication operations

### Context & State Management (`contexts/`)
- **`auth-context.tsx`**: Authentication context provider
  - Manages authentication state globally
  - Provides `user`, `loading`, and `isAuthenticated` states
  - Listens to Firebase auth state changes

### Hooks (`hooks/`)
- **`use-auth-actions.ts`**: Custom hook for authentication actions
  - Provides `signIn`, `signUp`, `signOut`, `resetPassword` methods
  - Manages loading and error states for each operation

### Screens (`app/(public)/`)
- **`index.tsx`**: Login screen
- **`register.tsx`**: Registration screen with password confirmation
- **`forgot-password.tsx`**: Password reset screen

### Protected Routes
The root layout (`app/_layout.tsx`) implements authentication guards:
- Redirects unauthenticated users to login
- Redirects authenticated users to the app (tabs)
- Uses Expo Router's segments to determine current route group

## Features Implemented

### Authentication
- ✅ Email/Password login
- ✅ User registration with validation
- ✅ Password reset via email
- ✅ Logout functionality
- ✅ Persistent authentication state
- ✅ Authentication guards on routes

### UX/UI
- ✅ Loading states with ActivityIndicator
- ✅ Error handling with user-friendly Portuguese messages
- ✅ Form validation (required fields, password length, password match)
- ✅ Responsive keyboard handling with KeyboardAvoidingView
- ✅ Consistent theming with existing app design

### Security
- ✅ Password fields with secureTextEntry
- ✅ Firebase auth error handling
- ✅ Protected routes that require authentication

## Environment Variables Required

Make sure your `.env` file has the following Firebase configuration:

```env
EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

## Usage

### Using Authentication in Components

```typescript
// Get authentication state
import { useAuth } from '@/contexts/auth-context';

function MyComponent() {
  const { user, loading, isAuthenticated } = useAuth();
  
  if (loading) return <Text>Loading...</Text>;
  if (!isAuthenticated) return <Text>Not logged in</Text>;
  
  return <Text>Hello {user.email}</Text>;
}
```

```typescript
// Perform authentication actions
import { useAuthActions } from '@/hooks/use-auth-actions';

function LoginForm() {
  const { signIn, loading, error } = useAuthActions();
  
  const handleLogin = async () => {
    try {
      await signIn(email, password);
      // User will be automatically redirected by the auth guard
    } catch (err) {
      // Error is available in the `error` state
      console.log(error);
    }
  };
}
```

## Firebase Console Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to Authentication > Sign-in method
4. Enable "Email/Password" provider
5. (Optional) Enable "Email link (passwordless sign-in)" if needed

## Testing

To test the authentication:

1. Start the development server: `npm start`
2. Try registering a new account
3. Test login with the created account
4. Test password reset functionality
5. Test logout from the explore screen

## Error Messages

All Firebase auth errors are translated to Portuguese for better UX:
- Invalid email
- Weak password
- Email already in use
- Wrong password
- Too many attempts
- Network errors
- And more...
