import { initializeApp } from 'firebase/app'

initializeApp({
  apiKey: '<FIREBASE_API_KEY>',
  authDomain: '<FIREBASE_PROJECT_ID>.firebaseapp.com',
  projectId: '<FIREBASE_PROJECT_ID>',
  appId: '<FIREBASE_APP_ID>'
})

// NOTE: We must export all the things after
// initializing the firebase's app
export * from './auth'
