<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view/>
  </div>
</template>

<script>
import Firebase from 'firebase'

var firebaseConfig = {
    apiKey: "AIzaSyDj_YJb7Mayjgaa72wGmYvl2j9_wXicKcY",
    authDomain: "events-manager-agency.firebaseapp.com",
    databaseURL: "https://events-manager-agency.firebaseio.com",
    projectId: "events-manager-agency",
    storageBucket: "",
    messagingSenderId: "320433886777",
    appId: "1:320433886777:web:eb531acf2e973d52"
  };

// Initialize Firebase
let app = firebase.initializeApp(firebaseConfig);
let db = app.database();

export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
