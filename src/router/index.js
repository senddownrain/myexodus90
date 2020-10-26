import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Add from '../views/Add.vue'
import AddWeek from '../views/AddWeek.vue'
import List from '../views/List.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/add/:num',
    name: 'Add',
    component: Add
  },
  {
    path: '/addweek/:num',
    name: 'AddWeek',
    component: AddWeek
  },
  {
    path: '/list',
    name: 'List',
    component: List
  }

]

const router = new VueRouter({
  routes
})

export default router
