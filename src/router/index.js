import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Login.vue'
import ShowLesson from '../views/ShowLesson.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Home
  },
  {
    path: '/lesson',
    name: 'Lesson',
    component: ShowLesson,
  }
]

const router = new VueRouter({
  routes
})

export default router
