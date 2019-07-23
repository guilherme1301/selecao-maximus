<template>
  <div id="app">
    <nav>
      <div class="nav-wrapper">
        <ul id="nav-mobile" class="hide-on-med-and-down center">
          <router-link tag="li" to="/" active-class="active" exact><a>Home</a></router-link>
          <router-link tag="li" :to="{name: 'addNewEvent'}" active-class="active" exact><a>Adicionar evento<i class="material-icons right">add</i></a></router-link>
        </ul>
      </div>
    </nav>
    <router-view :key="componentKey"></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  data(){
    return {
      componentKey: 0,
    }
  },
  watch: {
    $route(to, from){
      if(to.name == 'addNewEvent'){
        this.componentKey++
      }
    }
  }
}
</script>

<style>
nav{
  background-color: #4b006878;
  text-align: center;
}
.nav-wrapper{
  display: inline-block;
}
 #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
} 

</style>
