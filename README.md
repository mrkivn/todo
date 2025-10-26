# React To-Do App with Firebase Firestore

A simple, beautiful, and functional to-do list application built with React and Firebase Firestore. Features real-time synchronization, task completion tracking, and persistent data storage.

## Features

- ✨ Clean, minimalist UI with responsive design
- 📝 Add new tasks with input validation
- ✅ Toggle task completion with checkbox
- 🗑️ Delete tasks permanently
- 🔄 Real-time sync with Firebase Firestore
- 💾 Data persistence across page refreshes
- ⚡ Beautiful loading and error states
- 🎨 Modern design with hover effects and smooth transitions

## Firebase Setup

Before using the app, you need to configure Firebase Firestore:

### 1. Create a Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select an existing one
3. Add a web app to your project

### 2. Enable Firestore Database
1. In your Firebase project, go to **Build > Firestore Database**
2. Click **Create database**
3. Choose a location and start in **test mode** (or production mode with custom rules)

### 3. Configure Security Rules
For development, you can use these permissive rules (in Firestore Database > Rules):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

⚠️ **Note**: For production, implement proper authentication and security rules.

### 4. Add Firebase Credentials
The app uses these environment variables (already configured in Replit Secrets):
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`

## Tech Stack

- **Frontend**: React with TypeScript
- **Database**: Firebase Firestore
- **Styling**: Tailwind CSS + Shadcn UI
- **Build Tool**: Vite
- **Backend**: Express (for serving)

## Project Structure

```
├── client/
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── lib/
│   │   │   └── firebase.ts # Firebase configuration
│   │   ├── pages/
│   │   │   └── home.tsx    # Main todo app page
│   │   └── index.css       # Global styles
│   └── index.html
├── shared/
│   └── schema.ts           # TypeScript types and schemas
└── server/                 # Express server
```

## Development

The app is already running! Just open the preview to see it in action.

To restart the development server:
```bash
npm run dev
```

## Data Model

Each todo item in Firestore has:
- `id` (string) - Auto-generated document ID
- `text` (string) - The task description
- `completed` (boolean) - Completion status
- `timestamp` (number) - Creation timestamp

## Usage

1. **Add a Task**: Type in the input field and click "Add Task" or press Enter
2. **Complete a Task**: Click the checkbox next to the task
3. **Delete a Task**: Hover over a task and click the delete button
4. **View Stats**: See how many tasks remain at the bottom of the list

## Troubleshooting

**"Firebase Setup Required" error**: 
- Make sure you've created a Firestore database in your Firebase project
- Check that security rules allow read/write access
- Verify all Firebase credentials are correct

**Tasks not persisting**:
- Check browser console for errors
- Ensure you have a stable internet connection
- Verify Firebase credentials are properly configured

## License

MIT
