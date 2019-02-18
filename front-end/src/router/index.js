import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/pages/dashboard/Dashboard'
import About from '@/pages/about/About'
import Auth from '@/pages/auth/Auth'
import Main from '@/pages/main/Main'
import Panel from '@/pages/panel/Panel'
import Terms from '@/pages/terms/Terms'
import Map from '@/pages/map/Map'
import Payment from '@/pages/payment/Payment'
import Places from '@/pages/places/Places'
import Redirect404 from '@/pages/404/Redirect404'
import Error404 from '@/pages/404/Error404'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/dTm6Gz',
      name: 'Auth',
      component: Auth
    },
    {
      path: '/Terms',
      name: 'Terms',
      component: Terms
    },
    {
      path: '/Dashboard',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/Map',
      name: 'Map',
      component: Map
    },
    {
      path: '/Panel',
      name: 'Panel',
      component: Panel
    },
    {
      path: '/Places',
      name: 'Places',
      component: Places
    },
    {
      path: '/About',
      name: 'About',
      component: About
    },
    {
      path: '/Payment',
      name: 'Payment',
      component: Payment
    },
    {
      path: '/404',
      name: 'Error404',
      component: Error404
    },
    {
      path: '*',
      name: 'Redirect404',
      component: Redirect404
    }
  ]
})
