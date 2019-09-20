import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [{
    name: 'login',
    path: '/login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/login/index.vue')
  },
  {
    path: '/',
    component: () => import(/* webpackChunkName: "layout" */ '@/views/layout-tabbar/index.vue'),
    children: [
      {
        name: 'home',
        path: '',
        component: () => import(/* webpackChunkName: "home" */ '@/views/home/index.vue')
      }
    ]
  }
  ]
})
