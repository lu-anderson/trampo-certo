# AGENTS.MD - AI Agent Instructions for Trampo Certo

## Table of Contents

1. [Project Overview](#project-overview)
   - [Business Context](#business-context)
2. [Documentation Resources](#documentation-resources)
3. [Functional Requirements](#functional-requirements)
4. [Non-Functional Requirements](#non-functional-requirements)
5. [Project Structure](#project-structure)
6. [Data Models & Types](#data-models--types)
7. [Service Layer Architecture](#service-layer-architecture)
8. [Environment Configuration](#environment-configuration)
9. [UI/UX Design Guidelines](#uiux-design-guidelines)
10. [PDF Generation](#pdf-generation)
11. [Migration Readiness](#migration-readiness)
12. [Essential Commands](#essential-commands)
13. [Development Guidelines](#development-guidelines)
14. [Debugging & Development Tools](#debugging--development-tools)
15. [EAS Workflows CI/CD](#eas-workflows-cicd)
16. [Troubleshooting](#troubleshooting)
17. [AI Agent Instructions](#ai-agent-instructions)

---

## Project Overview

**Trampo Certo** is a professional budget/quote generation mobile application for freelance workers (trabalhadores autônomos). The app enables freelancers to create professional budgets quickly by filling in simple data and selecting from predefined templates.

This is an Expo/React Native mobile application built with TypeScript. Prioritize mobile-first patterns, performance, and cross-platform compatibility.

### Business Context

**Target Users**: Freelance workers and autonomous professionals who need to create professional budgets/quotes for their clients.

**Core Value Proposition**: Transform complex budget creation into a simple, professional process through:
- Easy-to-use data entry forms
- Professional pre-designed templates
- PDF generation for sharing with clients
- Budget status tracking and management

**User Experience Goals**:
- Modern yet minimalist interface
- Accessible to users with limited technical knowledge
- Fast budget creation workflow
- Professional output quality

## Documentation Resources

When working on this project, **always consult the official Expo documentation** available at:

- **https://docs.expo.dev/llms.txt** - Index of all available documentation files
- **https://docs.expo.dev/llms-full.txt** - Complete Expo documentation including Expo Router, Expo Modules API, development process
- **https://docs.expo.dev/llms-eas.txt** - Complete EAS (Expo Application Services) documentation
- **https://docs.expo.dev/llms-sdk.txt** - Complete Expo SDK documentation
- **https://reactnative.dev/docs/getting-started** - Complete React Native documentation

These documentation files are specifically formatted for AI agents and should be your **primary reference** for:

- Expo APIs and best practices
- Expo Router navigation patterns
- EAS Build, Submit, and Update workflows
- Expo SDK modules and their usage
- Development and deployment processes

## Functional Requirements

### 1. Company Information Screen
- Form for users to fill in their company/professional information
- Fields should include: company name, professional name, contact info, address, etc.
- Data persistence in Firestore
- Editable after initial setup

### 2. Template Selection Screen
- Display 5 available budget templates
- Visual preview of each template
- Template selection interface
- Save user's template preference

### 3. Budget Creation Screen
- Form to fill budget-specific information:
  - Client name and details
  - Items/services list
  - Pricing information
  - Terms and conditions
  - Valid until date
- Form validation
- Auto-save functionality
- Integration with selected template

### 4. Budget List Screen
- List all created budgets
- Display useful information: client name, creation date, status
- Filter and search capabilities
- Quick actions (view, edit, delete)
- Status indicators (pending, approved, rejected, etc.)

### 5. Budget View/Detail Screen
- Display complete budget with template applied
- Action buttons:
  - Share budget (PDF generation)
  - Edit budget
  - Quick status change
- PDF preview functionality

## Non-Functional Requirements

### Architecture & Design Principles

**1. Separation of Concerns**
- Clear separation between UI, business logic, and data access
- Service layer pattern for external integrations
- Context providers for state management

**2. Decoupled Architecture**
- Enable easy migration between services (e.g., Firebase → own backend + PostgreSQL)
- Abstract data access behind service interfaces
- Use dependency injection patterns where applicable

**3. Firebase Integration**
- **Authentication**: Firebase Auth for user management
  - Phase 1: Email/password authentication (currently implemented)
  - Phase 2: Google Sign-In and Apple Sign-In
- **Database**: Firestore for data persistence
  - User profiles
  - Company information
  - Budget templates
  - Budget documents

**4. UI/UX Standards**
- Modern, minimalist design
- Intuitive navigation for non-technical users
- Clear visual hierarchy
- Consistent design language
- Accessibility considerations
- Dark mode support (already implemented)

**5. PDF Generation**
- Merge user data with selected template
- Generate professional PDF output
- Support sharing via native share sheet
- Consider using libraries like `react-native-pdf` or `expo-print`

### Technical Stack

**Current Dependencies**:
- Expo SDK ~54.0
- React 19.1.0
- React Native 0.81.4
- Expo Router ~6.0 (file-based routing)
- Firebase 12.5.0 (Authentication + Firestore)
- TypeScript 5.9.2

**Recommended Additional Libraries**:
- PDF Generation: `expo-print` or `react-native-print`
- Form Handling: Consider `react-hook-form` for complex forms
- Validation: `zod` or `yup` for schema validation

## Project Structure

```
/
├── app/                   # Expo Router file-based routing
│   ├── (public)/          # Public routes (login, register, forgot password)
│   │   ├── index.tsx      # Login screen
│   │   ├── register.tsx   # Registration screen
│   │   ├── forgot-password.tsx
│   │   └── _layout.tsx    # Public layout
│   ├── (tabs)/            # Protected tab-based navigation
│   │   ├── index.tsx      # Home/Dashboard screen
│   │   ├── explore.tsx    # Explore screen (to be repurposed)
│   │   └── _layout.tsx    # Tabs layout
│   ├── _layout.tsx        # Root layout with theme & auth providers
│   └── [future screens]   # Budget creation, list, view, etc.
├── _service/              # Service layer (Firebase abstraction)
│   ├── firebase.ts        # Firebase initialization
│   ├── auth.ts            # Authentication service
│   └── firestore.ts       # Firestore database service
├── components/            # Reusable React components
│   ├── ui/                # UI primitives (IconSymbol, Collapsible)
│   └── ...                # Feature components (themed, haptic, parallax)
├── contexts/              # React Context providers
│   └── auth-context.tsx   # Authentication state management
├── constants/             # App-wide constants
│   ├── theme.ts           # Theme configuration
│   └── environment.ts     # Environment variables handler
├── hooks/                 # Custom React hooks
│   ├── use-auth-actions.ts  # Authentication actions
│   ├── use-theme-color.ts   # Theme utilities
│   └── use-color-scheme.ts  # Color scheme detection
├── types/                 # TypeScript type definitions
│   ├── user.ts            # User-related types
│   └── env.d.ts           # Environment variable types
├── assets/                # Static assets (images, fonts)
├── scripts/               # Utility scripts
├── .eas/workflows/        # EAS Workflows (CI/CD automation)
├── .env                   # Environment variables (not in git)
├── .env.example           # Environment variables template
├── app.json               # Expo configuration
├── eas.json               # EAS Build/Submit configuration
├── package.json           # Dependencies and scripts
└── AGENTS.md              # This file - AI agent instructions
```

## Essential Commands

### Development

```bash
npx expo start                  # Start dev server
npx expo start --clear          # Clear cache and start dev server
npx expo install <package>      # Install packages with compatible versions
npx expo install --check        # Check which installed packages need to be updated
npx expo install --fix          # Automatically update any invalid package versions
npm run development-builds      # Create development builds (workflow)
npm run reset-project           # Reset to blank template
```

### Building & Testing

```bash
npx expo doctor      # Check project health and dependencies
npx expo lint        # Run ESLint
npm run draft        # Publish preview update and website (workflow)
```

### Production

```bash
npx eas-cli@latest build --platform ios -s          # Use EAS to build for iOS platform and submit to App Store
npx eas-cli@latest build --platform android -s      # Use EAS to build for Android platform and submit to Google Play Store
npm run deploy                                      # Deploy to production (workflow)
```

## Data Models & Types

### Current Implementation

#### User Types (`types/user.ts`)
```typescript
// Firebase Auth User Profile
interface UserProfile {
  uid: string;          // Firebase Auth UID
  name: string;         // User's full name
  email: string;        // User's email
  createdAt: string;    // ISO timestamp
}

// Registration data
interface RegisterUserData {
  name: string;
  email: string;
  password: string;
}
```

### Future Data Models (To Be Implemented)

#### Company/Professional Information
```typescript
interface CompanyInfo {
  id: string;              // Document ID
  userId: string;          // Reference to user
  companyName?: string;    // Optional company name
  professionalName: string; // Professional/trade name
  document?: string;       // CPF/CNPJ
  phone: string;
  email: string;
  address?: {
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
  };
  logo?: string;           // URL to logo image
  createdAt: string;
  updatedAt: string;
}
```

#### Budget Template
```typescript
interface BudgetTemplate {
  id: string;
  name: string;
  description: string;
  thumbnailUrl: string;    // Preview image
  category: string;        // e.g., "modern", "classic", "minimal"
  isActive: boolean;
  layout: TemplateLayout;  // Template-specific layout configuration
  createdAt: string;
}

interface TemplateLayout {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
  sections: string[];      // Ordered list of sections to display
}
```

#### Budget Document
```typescript
interface Budget {
  id: string;
  userId: string;
  companyInfoId: string;
  templateId: string;
  
  // Client Information
  client: {
    name: string;
    email?: string;
    phone?: string;
    document?: string;
    address?: string;
  };
  
  // Budget Details
  budgetNumber: string;    // Auto-generated or custom
  title: string;
  description?: string;
  
  // Items/Services
  items: BudgetItem[];
  
  // Financial
  subtotal: number;
  discount?: {
    type: 'percentage' | 'fixed';
    value: number;
  };
  total: number;
  
  // Terms
  paymentTerms?: string;
  deliveryTerms?: string;
  validUntil: string;      // ISO date
  notes?: string;
  
  // Status & Metadata
  status: BudgetStatus;
  createdAt: string;
  updatedAt: string;
  pdfUrl?: string;         // Generated PDF storage URL
}

interface BudgetItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;           // quantity * unitPrice
  unit?: string;           // e.g., "hours", "units", "m²"
}

type BudgetStatus = 
  | 'draft'              // Being created
  | 'pending'            // Sent to client, awaiting response
  | 'approved'           // Client approved
  | 'rejected'           // Client rejected
  | 'expired'            // Past validUntil date
  | 'cancelled';         // Cancelled by user
```

## Service Layer Architecture

### Current Services

#### Firebase Service (`_service/firebase.ts`)
- Initializes Firebase app
- Exports configured instances: `auth`, `firestore`, `authService`

#### Auth Service (`_service/auth.ts`)
- Encapsulates all Firebase Authentication operations
- Methods:
  - `signInWithEmail(email, password)`
  - `registerUser(userData)`
  - `signOut()`
  - `resetPassword(email)`
  - `getCurrentUser()`
- Error handling with Portuguese language messages
- Future: Add Google and Apple Sign-In methods

#### Firestore Service (`_service/firestore.ts`)
- Encapsulates Firestore database operations
- Current collections: `users`
- Methods:
  - `createUserProfile(data)`
  - `getUserProfile(uid)`
- Future: Add methods for budgets, company info, templates

### Service Layer Design Pattern

**Key Principles**:
1. **Abstraction**: Services hide implementation details from UI components
2. **Single Responsibility**: Each service handles one specific domain
3. **Easy Migration**: Replace Firebase with custom backend by updating service implementations
4. **Testability**: Services can be mocked for testing
5. **Error Handling**: Consistent error handling and user-friendly messages in Portuguese

**Example Pattern for New Services**:
```typescript
// _service/budget.ts
export class BudgetService {
  private readonly db: Firestore;
  
  constructor(db: Firestore) {
    this.db = db;
  }
  
  async createBudget(data: CreateBudgetData): Promise<Budget> {
    // Implementation
  }
  
  async getBudgets(userId: string): Promise<Budget[]> {
    // Implementation
  }
  
  // ... other methods
}
```

### Context Pattern

Use React Context for app-wide state:
- **AuthContext** (implemented): User authentication state
- Future contexts to consider:
  - **CompanyContext**: Company/professional information
  - **BudgetContext**: Current budget being edited
  - **ThemeContext**: Theme customization (partially implemented)

## Environment Configuration

### Required Environment Variables

The app uses Expo's environment variable system. All public variables must be prefixed with `EXPO_PUBLIC_`.

**Firebase Configuration** (Required):
```
EXPO_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key_here
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_firebase_project_id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=your_firebase_app_id
EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

**App Configuration** (Optional):
```
EXPO_PUBLIC_API_URL=https://api.yourapp.com
EXPO_PUBLIC_APP_VERSION=1.0.0
EXPO_PUBLIC_DEBUG=false
```

### Environment Setup
1. Copy `.env.example` to `.env`
2. Fill in all Firebase credentials from Firebase Console
3. The `constants/environment.ts` validates all required variables on app startup
4. Type safety provided via `types/env.d.ts`

## UI/UX Design Guidelines

### Design Principles

1. **Minimalism**: Keep interfaces clean and uncluttered
2. **Clarity**: Use clear labels and intuitive icons
3. **Consistency**: Maintain consistent patterns across all screens
4. **Accessibility**: Ensure text is readable, touch targets are adequate
5. **Performance**: Optimize for smooth animations and quick load times

### Component Patterns

**Themed Components** (Already Implemented):
- `ThemedView`: Auto-adapts background to dark/light mode
- `ThemedText`: Auto-adapts text color with type variants (title, subtitle, default, link)
- Use `useThemeColor()` hook for custom color needs

**Form Patterns**:
- Clear input labels above fields
- Inline validation with error messages
- Loading states on buttons during async operations
- Disabled state visual feedback

**Button Hierarchy**:
- Primary action: Solid background with tint color
- Secondary action: Outlined border with tint color
- Tertiary action: Text only with tint color

### Navigation Patterns

**Current Implementation**:
- Root layout with auth state management
- Public routes: `(public)` group for unauthenticated screens
- Protected routes: `(tabs)` group for authenticated screens
- Tab navigation for main app sections

**Future Screens to Implement**:
```
app/
├── (public)/              # Unauthenticated screens
│   ├── index.tsx          # Login ✓
│   ├── register.tsx       # Register ✓
│   └── forgot-password.tsx # Password reset ✓
├── (tabs)/                # Main authenticated tabs
│   ├── index.tsx          # Dashboard/Home - Budget list
│   ├── budgets/           # Budget management
│   │   ├── index.tsx      # Budget list (can be main tab)
│   │   ├── [id].tsx       # Budget detail/view
│   │   └── new.tsx        # Create new budget
│   ├── templates.tsx      # Template selection
│   ├── company.tsx        # Company info form
│   └── profile.tsx        # User profile/settings
└── modal screens as needed
```

## PDF Generation

### Requirements
- Merge user data (company info + budget details) with selected template
- Generate professional-looking PDF
- Support sharing via native device capabilities

### Recommended Approach
**Option 1: `expo-print`** (Recommended)
- Native module for generating PDFs
- Uses HTML/CSS for templating
- Direct support for React Native
```typescript
import * as Print from 'expo-print';

const html = generateBudgetHTML(budgetData, template);
const { uri } = await Print.printToFileAsync({ html });
// Share or save the PDF
```

**Option 2: `react-native-pdf-lib`**
- More control over PDF generation
- Requires native builds (not Expo Go compatible)

### Template Implementation
- Store templates as HTML/CSS strings or React components
- Use template engine to inject data
- Support for:
  - Company logo
  - Dynamic color schemes
  - Itemized lists
  - Totals and calculations
  - Terms and conditions

## Migration Readiness

### Design for Flexibility

The current architecture uses a service layer to abstract Firebase. To migrate to a custom backend:

**Steps**:
1. **Keep Service Interfaces**: Maintain the same method signatures
2. **Swap Implementation**: Replace Firebase calls with HTTP API calls
3. **Update Configuration**: Switch from Firebase config to API endpoints
4. **Minimal UI Changes**: No changes needed to components if service interfaces stay same

**Example Migration Pattern**:
```typescript
// Before (Firebase)
class BudgetService {
  async getBudgets(userId: string): Promise<Budget[]> {
    const snapshot = await getDocs(
      query(collection(firestore, 'budgets'), where('userId', '==', userId))
    );
    return snapshot.docs.map(doc => doc.data() as Budget);
  }
}

// After (Custom Backend)
class BudgetService {
  async getBudgets(userId: string): Promise<Budget[]> {
    const response = await fetch(`${API_URL}/budgets?userId=${userId}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    return response.json();
  }
}
```

### Data Model Compatibility
- Design Firestore documents to match future SQL schema
- Use consistent field names and types
- Avoid Firestore-specific features that don't translate to SQL

### Authentication Migration
- Current: Firebase Auth
- Future: JWT-based authentication with custom backend
- Strategy: Abstract auth state and token management behind service layer

### Code Style & Standards

- **TypeScript First**: Use TypeScript for all new code with strict type checking
- **Naming Conventions**: Use meaningful, descriptive names for variables, functions, and components
- **Self-Documenting Code**: Write clear, readable code that explains itself; only add comments for complex business logic or design decisions
- **React 19 Patterns**: Follow modern React patterns including:
  - Function components with hooks
  - Enable React Compiler
  - Proper dependency arrays in useEffect
  - Memoization when appropriate (useMemo, useCallback)
  - Error boundaries for better error handling

### Navigation & Routing

- Use **Expo Router** for all navigation
- Import `Link`, `router`, and `useLocalSearchParams` from `expo-router`
- Docs: https://docs.expo.dev/router/introduction/

### Recommended Libraries

- **Navigation**: `expo-router` for navigation
- **Images**: `expo-image` for optimized image handling and caching
- **Animations**: `react-native-reanimated` for performant animations on native thread
- **Gestures**: `react-native-gesture-handler` for native gesture recognition
- **Storage**: Use `expo-sqlite` for persistent storage, `expo-sqlite/kv-store` for simple key-value storage

## Debugging & Development Tools

### DevTools Integration

- **React Native DevTools**: Use MCP `open_devtools` command to launch debugging tools
- **Network Inspection**: Monitor API calls and network requests in DevTools
- **Element Inspector**: Debug component hierarchy and styles
- **Performance Profiler**: Identify performance bottlenecks
- **Logging**: Use `console.log` for debugging (remove before production), `console.warn` for deprecation notices, `console.error` for actual errors, and implement error boundaries for production error handling

### Testing & Quality Assurance

#### Automated Testing with MCP Tools

Developers can configure the Expo MCP server with the following doc: https://docs.expo.dev/eas/ai/mcp/

- **Component Testing**: Add `testID` props to components for automation
- **Visual Testing**: Use MCP `automation_take_screenshot` to verify UI appearance
- **Interaction Testing**: Use MCP `automation_tap_by_testid` to simulate user interactions
- **View Verification**: Use MCP `automation_find_view_by_testid` to validate component rendering

## EAS Workflows CI/CD

This project is pre-configured with **EAS Workflows** for automating development and release processes. Workflows are defined in `.eas/workflows/` directory.

When working with EAS Workflows, **always refer to**:

- https://docs.expo.dev/eas/workflows/ for workflow examples
- The `.eas/workflows/` directory for existing workflow configurations
- You can check that a workflow YAML is valid using the workflows schema: https://exp.host/--/api/v2/workflows/schema

### Build Profiles (eas.json)

- **development**: Development builds with dev client
- **development-simulator**: Development builds for iOS simulator
- **preview**: Internal distribution preview builds
- **production**: Production builds with auto-increment

## Troubleshooting

### Expo Go Errors & Development Builds

If there are errors in **Expo Go** or the project is not running, create a **development build**. **Expo Go** is a sandbox environment with a limited set of native modules. To create development builds, run `eas build:dev`. Additionally, after installing new packages or adding config plugins, new development builds are often required.

## AI Agent Instructions

When working on this project:

1. **Always start by consulting the appropriate documentation**:

   - For general Expo questions: https://docs.expo.dev/llms-full.txt
   - For EAS/deployment questions: https://docs.expo.dev/llms-eas.txt
   - For SDK/API questions: https://docs.expo.dev/llms-sdk.txt

2. **Understand before implementing**: Read the relevant docs section before writing code

3. **Follow existing patterns**: Look at existing components and screens for patterns to follow

### Implementation Workflow

When implementing new features:

1. **Plan First**:
   - Review functional requirements
   - Identify affected files and components
   - Consider data flow and state management
   - Plan service layer changes if needed

2. **Start with Data Layer**:
   - Define TypeScript types in `types/` directory
   - Create or update service methods in `_service/`
   - Add Firestore collection constants
   - Test service methods independently

3. **Build UI Components**:
   - Create reusable components in `components/`
   - Use existing themed components
   - Follow established form and button patterns
   - Add proper TypeScript props interfaces

4. **Create Screens**:
   - Add route in appropriate app directory group
   - Implement screen logic using hooks
   - Connect to service layer
   - Add loading and error states
   - Implement navigation

5. **Test & Validate**:
   - Test all user flows manually
   - Verify error handling
   - Check responsive behavior
   - Test dark mode appearance
   - Validate form inputs

6. **Document**:
   - Add inline comments for complex logic only
   - Update this AGENTS.md if architectural patterns change
   - Document any new environment variables

### Language & Localization

- **Primary Language**: Portuguese (Brazil)
- All user-facing text should be in Portuguese
- Error messages already implemented in Portuguese
- Keep code comments and technical documentation in English for broader collaboration

### Common Implementation Patterns

**Creating a new service**:
```typescript
// 1. Define types
// types/budget.ts
export interface Budget { ... }

// 2. Create service
// _service/budget.ts
export class BudgetService {
  constructor(private db: Firestore) {}
  async createBudget(data: CreateBudgetData): Promise<Budget> { ... }
}

// 3. Export from firebase.ts
// _service/firebase.ts
import { BudgetService } from './budget';
export const budgetService = new BudgetService(firestore);
```

**Creating a new screen with form**:
```typescript
// app/(tabs)/company.tsx
import { useState } from 'react';
import { ThemedView } from '@/components/themed-view';
import { useRouter } from 'expo-router';

export default function CompanyInfoScreen() {
  const [formData, setFormData] = useState({...});
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  
  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Validation
      // Service call
      // Navigation
    } catch (error) {
      // Error handling
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <ThemedView>
      {/* Form components */}
    </ThemedView>
  );
}
```

### Security Considerations

1. **Authentication**:
   - All budget operations must check user authentication
   - Use `useAuth()` hook to access current user
   - Redirect unauthenticated users to login

2. **Data Access**:
   - Users should only access their own data
   - Firestore security rules should enforce user-based access
   - Validate user ownership before updates/deletes

3. **Input Validation**:
   - Validate all form inputs on client side
   - Sanitize data before Firestore writes
   - Use TypeScript for type safety

4. **Environment Variables**:
   - Never commit `.env` file
   - Keep Firebase credentials secure
   - Use Expo's environment variable system

### Performance Best Practices

1. **Lazy Loading**:
   - Use dynamic imports for heavy screens
   - Implement pagination for budget lists
   - Load templates on demand

2. **Caching**:
   - Cache user profile and company info
   - Use React Query or similar for data caching
   - Implement offline support considerations

3. **Optimization**:
   - Minimize re-renders with React.memo
   - Use useCallback for event handlers
   - Optimize images with expo-image

### Debugging Tips

1. **Firebase Issues**:
   - Check Firebase Console for errors
   - Verify security rules
   - Check network tab for failed requests
   - Use Firebase emulator for local testing

2. **Navigation Issues**:
   - Use `npx expo start --clear` to clear cache
   - Check route file naming (parentheses, brackets)
   - Verify layout files exist

3. **Build Issues**:
   - Clear node_modules and reinstall
   - Check for version conflicts
   - Create fresh development build after adding native modules

### Next Steps for Development

Priority order for implementing features:

1. **Phase 1 - Foundation**:
   - ✓ Authentication system (completed)
   - Company/Professional information screen
   - User profile/settings screen

2. **Phase 2 - Core Features**:
   - Budget template system (5 templates)
   - Template selection screen
   - Budget creation form
   - Budget list screen

3. **Phase 3 - Advanced Features**:
   - Budget detail/view screen
   - PDF generation
   - Share functionality
   - Budget status management

4. **Phase 4 - Enhancements**:
   - Google Sign-In
   - Apple Sign-In
   - Advanced filtering and search
   - Budget analytics/reports
   - Template customization

### Questions to Consider Before Implementing

When adding new features, ask:

1. **Data Structure**: Does this need a new Firestore collection? What's the schema?
2. **Service Layer**: Should this be a new service or extend existing?
3. **Navigation**: Where does this screen fit in the routing structure?
4. **State Management**: Does this need global state (Context) or local state?
5. **Dependencies**: Do I need new packages? Are they compatible with Expo?
6. **Migration**: Will this be easy to migrate if we switch from Firebase?

### Resources

- **Expo Documentation**: https://docs.expo.dev/
- **React Native Documentation**: https://reactnative.dev/
- **Firebase Documentation**: https://firebase.google.com/docs
- **TypeScript Handbook**: https://www.typescriptlang.org/docs/
- **Expo Router**: https://docs.expo.dev/router/introduction/
- **Firestore Data Modeling**: https://firebase.google.com/docs/firestore/manage-data/structure-data
