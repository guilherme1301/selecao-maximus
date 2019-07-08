<template>
  <div class="container">
    <h1>Todos os eventos</h1>
    <hr>
    <table>
      <thead>
        <tr>
          <div class="row hide-on-small-only" style="padding-left: 20px">
            <div class="col m3 s12">
              <h5>Título</h5>
            </div>
            <div class="col m5 s12">
              <h5>Descrição</h5>
            </div>
          </div>
        </tr>
      </thead>
      <tbody v-if="eventsLoaded">
            <event-box v-for="(event, idx) in events" 
                      :key="idx" 
                      :event="event"></event-box>
      </tbody>
    </table>
    <!-- <div v-if="eventsLoaded" class="row">
      <div class="col s12" v-for="(event, idx) in events" :key="idx">
        <ul class="collection">
          <event-box :event="event"></event-box>
        </ul>
      </div>
    </div> -->
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
      eventsLoaded: false
    }
  },
  components:{
    eventBox: EventBox,
  },
  watch: {
    events(val){
      // console.log(val)
      this.eventsLoaded = true;
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

</style>
