// Add the Firebase products that you want to use
import firebase from 'firebase/app'
import 'firebase/firestore'


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
