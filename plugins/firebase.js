import firebase from 'firebase'

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
}

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

const db = firebase.firestore()
const gamedataId = process.env.GAME_DATA_ID
const gamedataRef = db.collection('gamedata')

export const currentGamedataRef = gamedataRef.doc(gamedataId)
export const playersRef = currentGamedataRef.collection('players')
