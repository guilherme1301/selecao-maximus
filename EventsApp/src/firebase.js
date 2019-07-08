// Firebase App (the core Firebase SDK) is always required and must be listed first
// import * as firebase from "firebase/app";

// Add the Firebase products that you want to use
import firebase from 'firebase/app'
import 'firebase/firestore'

// import { initializeApp } from 'firebase'

// const firebaseConfig = '';

// Initialize Firebase
firebase.initializeApp({
    apiKey: "AIzaSyDj_YJb7Mayjgaa72wGmYvl2j9_wXicKcY",
    authDomain: "events-manager-agency.firebaseapp.com",
    databaseURL: "https://events-manager-agency.firebaseio.com",
    projectId: "events-manager-agency",
    storageBucket: "",
    messagingSenderId: "320433886777",
    appId: "1:320433886777:web:eb531acf2e973d52"
});
export const db = firebase.firestore()
// export const db = app.database();
// export const eventsRef = db.ref('Events');
