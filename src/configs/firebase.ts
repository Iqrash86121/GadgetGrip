// src/config/firebase.ts
import auth from '@react-native-firebase/auth';


// Initialize Firebase (it automatically uses the config files)
export { auth };

// Optional: You can add any additional Firebase initialization logic here
export const initializeFirebase = () => {
  console.log('Firebase initialized');
};