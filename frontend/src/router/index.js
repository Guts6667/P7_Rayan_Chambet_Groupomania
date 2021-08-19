import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },

  {
    path: '/forum',
    name: 'Forum',

    component: () => import( '../views/Forum.vue'),
    beforeEnter: (to, from, next) => {
      if(!localStorage.getItem('token')) {
        next("/");
      } else {
        next();
      }
    }
  },
  {
    path: '/onepost/:id',
    name: 'OnePost',

    component: () => import( '../views/OnePost.vue'),
    beforeEnter: (to, from, next) => {
      if(!localStorage.getItem('token')) {
        next("/");
      } else {
        next();
      }
    }

  },
  {
    path: '/profile/',
    name: 'Profile',

    component: () => import( '../views/Profile.vue'),
    beforeEnter: (to, from, next) => {
      if(!localStorage.getItem('token')) {
        next("/");
      } else {
        next();
      }
    }

  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
