import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDUrm__CPpu9zI7JHmLG7u0PLO6Lae9__M",
  authDomain: "ntutu-fdb00.firebaseapp.com",
  projectId: "ntutu-fdb00",
  storageBucket: "ntutu-fdb00.appspot.com",
  messagingSenderId: "193035190165",
  appId: "1:193035190165:web:60e5fd7026f968b999409c",
  measurementId: "G-70FEJYC005"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const analytics = firebase.analytics();

export { db, auth, storage, analytics };