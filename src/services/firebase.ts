
import { initializeApp } from '@firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
    apiKey: (import.meta.env.VITE_API_KEY) as string,
    authDomain: (import.meta.env.VITE_AUTH_DOMAIN) as string,
    databaseURL: (import.meta.env.VITE_DATABASE_URL) as string,
    projectId: (import.meta.env.VITE_PROJECT_ID) as string,
    storageBucket: (import.meta.env.VITE_STORAGE_BUCKET) as string,
    messagingSenderId: (import.meta.env.VITE_MESSAGING_SENDER_ID) as string,
    appId: (import.meta.env.VITE_APP_ID) as string
};

// Initialize Firebase

initializeApp(firebaseConfig);

export const auth = getAuth();
export const database = getDatabase();