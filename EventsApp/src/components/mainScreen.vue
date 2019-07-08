<template>
  <div class="container">
    <h1>Todos os eventos</h1>
    <hr>

    <div v-if="noEvents && eventsLoaded" class="col m12 center">
      <h5>Nenhum evento criado ainda!</h5>
    </div>

    <div v-else class="row hide-on-small-only" style="padding-left: 20px">
      <div class="col m3">
        <h5>Título</h5>
      </div>
      <div class="col m5">
        <h5>Descrição</h5>
      </div>
      <div class="col m2">
        <h5>Data</h5>
      </div>
    </div>

    <div class="row" v-if="eventsLoaded">
      <event-box v-for="(event, idx) in events" 
                :key="idx" 
                :event="event"></event-box>
    </div>
    <!-- Loading icon -->
    <div v-else class="preloader-wrapper big active">
      <div class="spinner-layer spinner-blue-only">
        <div class="circle-clipper left">
          <div class="circle"></div>
        </div><div class="gap-patch">
          <div class="circle"></div>
        </div><div class="circle-clipper right">
          <div class="circle"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '../firebase'
import EventBox from './eventBox'

export default {
  name: 'mainScreen',
  data(){
    return{
      events: null,
      eventsLoaded: false,
      noEvents: false
    }
  },
  components:{
    eventBox: EventBox,
  },
  watch: {
    events(val){
      console.log(val)
      if(val.length > 0 ){
        this.eventsLoaded = true;
        this.noEvents = false;
      }
      else{
        this.noEvents = true;
      }
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
.preloader-wrapper{
  display: block;
  margin: auto;
  margin-top: 100px
}
</style>
