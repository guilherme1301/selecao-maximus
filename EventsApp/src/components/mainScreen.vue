<template>
  <div class="container">
    <p v-for="(event, index) in events" :key="index">{{event}}</p>
  </div>
</template>

<script>
import { db } from '../firebase'
export default {
  name: 'mainScreen',
  data(){
    return{
      events: null,
    }
  },
  firestore(){
    return {
      events: db.collection('events')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
