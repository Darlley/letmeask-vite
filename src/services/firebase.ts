import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/database';

firebase.initializeApp({
    apiKey: (import.meta.env.VITE_API_KEY) as string,
    authDomain: (import.meta.env.VITE_AUTH_DOMAIN) as string,
    databaseURL: (import.meta.env.VITE_DATABASE_URL) as string,
    projectId: (import.meta.env.VITE_PROJECT_ID) as string,
    storageBucket: (import.meta.env.VITE_STORAGE_BUCKET) as string,
    messagingSenderId: (import.meta.env.VITE_MESSAGING_SENDER_ID) as string,
    appId: (import.meta.env.VITE_APP_ID) as string
});

const auth = firebase.auth();
const database = firebase.database();

export { firebase, auth, database }