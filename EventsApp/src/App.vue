<template>
  <div id="app">
    <nav>
      <div class="nav-wrapper">
        <ul id="nav-mobile" class="hide-on-med-and-down center">
          <router-link tag="li" to="/" active-class="active" exact><a>Home</a></router-link>
          <router-link tag="li" to="/addNewEvent" active-class="active" exact><a>Adicionar evento<i class="material-icons right">add</i></a></router-link>
        </ul>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  data(){
    return {
    }
  }
}
</script>

<style>
nav{
  background-color: #06031c;
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
