import firebase from 'firebase'

const config = {
  apiKey: 'xxxxxxxxxx',
  authDomain: 'xxxxxxxxxx.firebaseapp.com',
  databaseURL: 'https://xxxxxxxxxx.firebaseio.com',
  projectId: 'xxxxxxxxxx',
  storageBucket: 'xxxxxxxxxx.appspot.com',
  messagingSenderId: 'xxxxxxxxxx'
}

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

const db = firebase.firestore()
const gamedataId = 'xxxxxxxxxx'
const gamedataRef = db.collection('gamedata')

export const currentGamedataRef = gamedataRef.doc(gamedataId)
export const playersRef = currentGamedataRef.collection('players')
