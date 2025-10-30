# React To-Do App with Firebase Firestore

## Overview

This is a simple to-do list application built with React and Firebase Firestore. The app provides real-time task management with a clean, minimalist user interface. Users can add tasks, mark them as complete, and delete them. All data is synchronized in real-time with Firebase Firestore, ensuring persistence across page refreshes and devices.

## Recent Changes

**October 30, 2025**: Successfully migrated from Vercel to Replit
- Removed all server-side dependencies and code (Express, Drizzle ORM, Passport, WebSocket, etc.)
- Cleaned up full-stack template remnants to create a pure React + Firebase client-only app
- Moved schema definitions inline to home.tsx (removed shared folder)
- Removed React Query dependency in favor of direct Firebase Firestore usage
- Configured Vite dev server for Replit environment (port 5000, host 0.0.0.0)
- Updated package name from "rest-express" to "react-firebase-todo"
- Removed 148 unused packages, reducing bundle size significantly
- Created .env.example template for Firebase configuration documentation

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React 18 with TypeScript
- Single-page application using Vite as the build tool and development server
- Client-side routing implemented with Wouter for lightweight navigation
- Component architecture follows a modular pattern with reusable UI components

**UI Component Library**: Shadcn/ui with Radix UI primitives
- Utilizes a comprehensive set of pre-built accessible components (buttons, forms, dialogs, etc.)
- Styled with Tailwind CSS using a "new-york" style variant
- Custom design system with CSS variables for theming (light mode support)
- Component aliases configured for clean imports (`@/components`, `@/lib`, etc.)

**Form Handling**: React Hook Form with Zod validation
- Declarative form management with built-in validation
- Schema-based validation using Zod for type-safe data structures
- Validation ensures tasks cannot be empty before submission

**State Management**:
- Local component state using React hooks (useState, useEffect)
- Real-time data synchronization handled through Firebase Firestore listeners
- Toast notifications for user feedback using a custom toast hook

### Backend Architecture

**Database**: Firebase Firestore (NoSQL cloud database)
- Real-time document-based database
- Collections structure: `todos` collection containing task documents
- Each todo document contains: `text` (string), `completed` (boolean), `timestamp` (number)
- Real-time listeners (`onSnapshot`) provide automatic updates when data changes

**Authentication**: None implemented
- Current implementation uses test mode security rules (permissive for development)
- Production deployment would require implementing Firebase Authentication

### Data Flow

1. **Read Operations**: Component subscribes to Firestore collection via `onSnapshot`, automatically updating local state when remote data changes
2. **Create Operations**: New tasks added via `addDoc` with form validation, automatically assigned unique IDs by Firestore
3. **Update Operations**: Task completion toggled via `updateDoc` on specific document references
4. **Delete Operations**: Tasks removed via `deleteDoc` on specific document references

### Design Patterns

**Real-time Synchronization**: 
- Uses Firebase's real-time listener pattern to keep UI in sync with database
- Unsubscribes from listeners on component unmount to prevent memory leaks

**Error Handling**:
- Centralized error state with user-friendly error messages
- Loading states during initial data fetch
- Toast notifications for operation feedback

**Responsive Design**:
- Mobile-first approach with Tailwind CSS responsive utilities
- Custom hook (`useIsMobile`) for device detection
- Viewport meta tag prevents unwanted zoom on mobile devices

## External Dependencies

### Third-Party Services

**Firebase/Firestore**:
- Cloud-hosted NoSQL database for data persistence
- Real-time synchronization capabilities
- Requires environment variables: `VITE_FIREBASE_API_KEY`, `VITE_FIREBASE_AUTH_DOMAIN`, `VITE_FIREBASE_PROJECT_ID`
- Security rules currently set to test mode (open access) - needs proper authentication for production

### Key Libraries

**UI & Styling**:
- `@radix-ui/*`: Headless UI primitives for accessible components (checkbox, dialog, toast, etc.)
- `tailwindcss`: Utility-first CSS framework
- `lucide-react`: Icon library for UI elements
- `framer-motion`: Animation library for smooth transitions
- `class-variance-authority` & `clsx`: Utility libraries for conditional CSS classes

**Form & Validation**:
- `react-hook-form`: Form state management and validation
- `zod`: Schema validation library
- `@hookform/resolvers`: Integrates Zod with React Hook Form

**Routing**:
- `wouter`: Lightweight routing library (alternative to React Router)

**Firebase**:
- `firebase`: Official Firebase SDK for web (v12.4.0)
- Includes Firestore database functionality

### Build Tools

- **Vite**: Fast build tool and dev server with hot module replacement
- **TypeScript**: Type safety and developer experience
- **PostCSS**: CSS processing with Tailwind and Autoprefixer plugins
- Replit-specific plugins for development environment integration