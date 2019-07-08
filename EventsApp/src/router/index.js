import Vue from 'vue'
import Router from 'vue-router'
import mainScreen from '@/components/mainScreen'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'mainScreen',
      component: mainScreen,
    }
  ],
  mode: 'history'
})
