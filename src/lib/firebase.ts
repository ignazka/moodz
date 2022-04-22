import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBZ8kH4RTbAVSqanIPRF9O-CSBMZP8u9k4',
  authDomain: 'moodz-489da.firebaseapp.com',
  projectId: 'moodz-489da',
  storageBucket: 'moodz-489da.appspot.com',
  messagingSenderId: '587774869090',
  appId: '1:587774869090:web:12ce6700591ab615155b3b',
  measurementId: 'G-CTB5JJ2ZVX',
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();
const analytics = getAnalytics(app);

export default app;
export { auth, db };
