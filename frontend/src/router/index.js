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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Forum.vue'),
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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/OnePost.vue'),
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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Profile.vue'),
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
