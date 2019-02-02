import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/pages/dashboard/Dashboard'
import About from '@/pages/about/About'
import Auth from '@/pages/auth/Auth'
import Main from '@/pages/main/Main'
import Panel from '@/pages/panel/Panel'
import Terms from '@/pages/terms/Terms'
import Payment from '@/pages/payment/Payment'
import Cabinetes from '@/pages/cabinetes/Cabinetes'

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
      path: '/Auth',
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
      path: '/Panel',
      name: 'Panel',
      component: Panel
    },
    {
      path: '/Cabinetes',
      name: 'Cabinetes',
      component: Cabinetes
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
    }
  ]
})
