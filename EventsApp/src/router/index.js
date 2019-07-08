import Vue from 'vue'
import Router from 'vue-router'
import mainScreen from '@/components/mainScreen'
import addNewEvent from '@/components/addNewEvent'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'mainScreen',
      component: mainScreen,
    },
    {
      path: '/addNewEvent',
      name: 'addNewEvent',
      component: addNewEvent
    }
  ],
  mode: 'history'
})
