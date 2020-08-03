import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('../views/Login.vue'),
    meta:{
      requiresGuest: true
    }
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/Home.vue'),
    meta:{
      requiresAuth: true
    }
  },
  {
    path: '/vaunusuunnittelu',
    name: 'vaunusuunnittelu',
    component: () => import('../views/Vaunusuunnittelu.vue'),
    meta:{
      requiresAuth: true
    }
  },
  {
    path: '/raaka-aineet',
    name: 'raaka-aineet',
    component: () => import('../views/Raaka-aineet.vue'),
    meta:{
      requiresAuth: true
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register.vue'),
    meta:{
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)){
    if(!store.getters.isLoggedIn){
      next('/');
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)){
    if(store.getters.isLoggedIn){
      next('/home');
    } else {
      next();
    }
  } else {
    next()
  }
})

export default router
