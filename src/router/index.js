import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Userinfo from '../views/Userinfo'
import Main from '../views/Main.vue'
import Lesson from '@/views/Lesson'
import User from '@/views/user'
import Portal from '@/views/adminPage/portal.vue'
import Student from '@/views/adminPage/student'
import AdminTest from '@/views/adminPage/adminTest'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },

  {
    path:'/home',
    name:'Home',
    component:Home,
    redirect:'/main',
    children:[
      {
        path:'/main',
        name:'Main',
        component:Main
      },
      {
      path:'/userinfo',
      name:'Userinfo',
      component:Userinfo
    },
    {
      path:'/lesson',
      name:'Lesson',
      component:Lesson
    },
    {
      path: '/user',
      name: 'User',
      component: User
    },
  ]
  },

  {
    path: '/portal',
    name: 'Portal',
    component: Portal,
    redirect: '/student',
    children: [
      {
        path: '/student',
        name: 'Student',
        component: Student,
      },
      {
        path: '/adminTest',
        name: 'AdminTest',
        component: AdminTest,
      }
    ]
  }

 
]

const router = new VueRouter({
  routes
})

export default router
