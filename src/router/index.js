import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      name: 'login',
      path: '/login',
      component: () => import(/* webpackChunkName: "login" */ '@/views/login/index.vue')
    },
    {
      name: 'search',
      path: '/search',
      component: () => import(/* webpackChunkName: "search" */ '@/views/search/index.vue')
    },
    {
      name: 'search-result',
      path: '/search-result/:q',
      props: true,
      component: () => import(/* webpackChunkName: "search-result" */ '@/views/search-result/index.vue')
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
