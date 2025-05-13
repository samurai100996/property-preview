// src/firebase-admin.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// First, verify environment variables are loading
console.log('Environment variables:', {
  VITE_ADMIN_API_KEY: import.meta.env.VITE_ADMIN_API_KEY ? 'exists' : 'MISSING',
  VITE_ADMIN_AUTH_DOMAIN: import.meta.env.VITE_ADMIN_AUTH_DOMAIN ? 'exists' : 'MISSING'
});

const adminConfig = {
  apiKey: import.meta.env.VITE_ADMIN_API_KEY,
  authDomain: import.meta.env.VITE_ADMIN_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_ADMIN_PROJECT_ID,
  storageBucket: import.meta.env.VITE_ADMIN_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_ADMIN_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_ADMIN_APP_ID
};

// Initialize Firebase Admin instance
const adminApp = initializeApp(adminConfig, "Admin");
const adminAuth = getAuth(adminApp);

// Export at the bottom (CommonJS style)
export { adminAuth };