import Vue from 'vue'
import Router from 'vue-router'
import { store } from '../store'
import Dashboard from '@/pages/dashboard/Dashboard'
import About from '@/pages/about/About'
import Auth from '@/pages/auth/Auth'
import Main from '@/pages/main/Main'
import Panel from '@/pages/panel/Panel'
import Terms from '@/pages/terms/Terms'
import Initialize from '@/pages/initialize/Initialize'
import Map from '@/pages/map/Map'
import Payment from '@/pages/payment/Payment'
import Places from '@/pages/places/Places'
import Appointments from '@/pages/appointments/Appointments'
import AddAppointment from '@/pages/addAppointment/AddAppointment'
import AddHistory from '@/pages/addHistory/AddHistory'
import UpdateAppointment from '@/pages/updateAppointment/UpdateAppointment'
import PatientFile from '@/pages/patientFile/PatientFile'
import PasswordReset from '@/pages/passwordReset/PasswordReset'
import Redirect404 from '@/pages/404/Redirect404'
import Error404 from '@/pages/404/Error404'

Vue.use(Router)

const router = new Router({
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
      path: '/Initialize',
      name: 'Initialize',
      component: Initialize,
      meta: {
        requiresLogin: true
      }
    },
    {
      path: '/Dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: {
        requiresLogin: true
      }
    },
    {
      path: '/Map',
      name: 'Map',
      component: Map
    },
    {
      path: '/Panel',
      name: 'Panel',
      component: Panel,
      meta: {
        requiresLogin: true,
        requiresDoctorPermissions: true
      }
    },
    {
      path: '/Places',
      name: 'Places',
      component: Places,
      meta: {
        requiresLogin: true,
        requiresDoctorPermissions: true
      }
    },
    {
      path: '/AddAppointment',
      name: 'AddAppointment',
      component: AddAppointment,
      meta: {
        requiresLogin: true,
        requiresDoctorPermissions: true
      }
    },
    {
      path: '/UpdateAppointment',
      name: 'UpdateAppointment',
      component: UpdateAppointment,
      meta: {
        requiresLogin: true,
        requiresDoctorPermissions: true
      }
    },
    {
      path: '/AddHistory',
      name: 'AddHistory',
      component: AddHistory,
      meta: {
        requiresLogin: true,
        requiresDoctorPermissions: true
      }
    },
    {
      path: '/About',
      name: 'About',
      component: About,
      meta: {
        requiresLogin: true
      }
    },
    {
      path: '/Appointments',
      name: 'Appointments',
      component: Appointments,
      meta: {
        requiresLogin: true
      }
    },
    {
      path: '/Payment',
      name: 'Payment',
      component: Payment,
      meta: {
        requiresLogin: true
      }
    },
    {
      path: '/PatientFile/:id',
      name: 'PatientFile',
      component: PatientFile,
      meta: {
        requiresLogin: true,
        requiresDoctorPermissions: true
      }
    },
    {
      path: '/PasswordReset/:token/:email',
      name: 'PasswordReset',
      component: PasswordReset
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

router.beforeEach((to, from, next) => {
  const userLoggedIn = store.getters['userInfo/isLoggedIn']
  const userHasDoctorPermissions = store.getters['userInfo/hasDoctorPermissions']
  const pathRequiresLogin = to.matched.some(record => record.meta.requiresLogin)
  const pathRequiresDoctorPermissions = to.matched.some(
    record => record.meta.requiresDoctorPermissions
  )

  if (pathRequiresLogin && !userLoggedIn) {
    next({name: 'Auth'})
  } else if (pathRequiresDoctorPermissions && !userHasDoctorPermissions) {
    next({name: 'Dashboard'})
  } else {
    next()
  }
})

export default router
