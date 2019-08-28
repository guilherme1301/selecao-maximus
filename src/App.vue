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
    
    <canvas class="dots"></canvas>
  </div>
</template>

<script>
import { functions } from 'firebase';

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
  },
  methods: {
    createCanvas(){
      const canvas = document.querySelector('canvas'),
          ctx = canvas.getContext('2d'),
          colorDot = '#cecece',
          color = '#cecece'
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    canvas.style.display = 'block'
    ctx.fillStyle = colorDot
    ctx.lineWidth = .1
    ctx.strokeStyle = color;

    var mousePosition = {
        x: 30 * canvas.width / 100,
        y: 30 * canvas.height / 100
    }

    let dots = {
        nb: 500,
        distance: 60,
        d_radius: 100,
        array: []
    }

    function Dot() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height

        this.vx = -.5 + Math.random()
        this.vy = -.5 + Math.random()

        this.radius = Math.random() * 1.5

    }

    Dot.prototype = {
        create: function() {
            ctx.beginPath()
            ctx.arc(this.x, this.y, this.radius, 0 , Math.PI * 2, false)
            ctx.fill()
        },

        animate: function() {
            for(let i = 0; i < dots.nb; i++){
                
                let dot = dots.array[i]

                if(dot.y < 0 || dot.y > canvas.height){
                    dot.vx = dot.vx
                    dot.vy = - dot.vy
                }
                else if(dot.x < 0 || dot.x > canvas.width){
                    dot.vx = - dot.vx
                    dot.vy = dot.vy
                }
                dot.x += dot.vx
                dot.y += dot.vy
            }
        },

        line: function() {
            for(let i = 0; i < dots.nb; i++){
                for(let j = 0; j < dots.nb; j++){
                    let i_dot = dots.array[i]
                    let j_dot = dots.array[j]

                    if((i_dot.x - j_dot.x) < dots.distance && (i_dot.y - j_dot.y) < dots.distance && (i_dot.x - j_dot.x) > - dots.distance && (i_dot.y - j_dot.y) > - dots.distance){
                        if((i_dot.x - mousePosition.x) < dots.d_radius && (i_dot.y - mousePosition.y) < dots.d_radius && (i_dot.x - mousePosition.x) > - dots.d_radius && (i_dot.y - mousePosition.y) > - dots.d_radius){
                            ctx.beginPath()
                            ctx.moveTo(i_dot.x, i_dot.y)
                            ctx.lineTo(j_dot.x, j_dot.y)
                            ctx.stroke()
                            ctx.closePath()
                        }
                    }
                }
            }
        }
    }

    function createDots(){
      let dot;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for(let i = 0; i < dots.nb; i++){
          dots.array.push(new Dot())
          dot = dots.array[i]

          dot.create();
      }

      dot.line()
      dot.animate()
    }

    window.onmousemove = function(parameter) {
        mousePosition.x = parameter.clientX
        mousePosition.y = parameter.clientY
    }
    mousePosition.x = window.innerWidth / 2
    mousePosition.y = window.innerHeight / 2

    setInterval(createDots, 1000/50)

    },
  },
  mounted() {
    this.createCanvas()
  },
}
</script>

<style>
nav{
  background-color: #340247;
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
canvas {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    right: 0;
    z-index: -1;
}
</style>
