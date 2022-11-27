import firebase from "firebase/app";
import 'firebase/firestore'
import 'firebase/auth'


const firebaseConfig = {
    apiKey: "AIzaSyDAPtXCrmv5yHUKU9crza-3JunxXwhmXYU",
    authDomain: "recipesandverses.firebaseapp.com",
    projectId: "recipesandverses",
    storageBucket: "recipesandverses.appspot.com",
    messagingSenderId: "640613347867",
    appId: "1:640613347867:web:123f521e8a3917e81d7ebe"
};

//  init firebase
firebase.initializeApp(firebaseConfig)

// init service
const db = firebase.firestore()
const auth = firebase.auth()

// timestamp
const timestamp = firebase.firestore.Timestamp


export { db, auth, timestamp }
