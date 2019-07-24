import Vue from 'vue'
import Vuex from 'vuex'
import window from './modules/window'
import modal from './modules/modal'
import userInfo from './modules/userInfo'
import userRecommendations from './modules/userRecommendations'
import userHistories from './modules/userHistories'
import userRoles from './modules/userRoles'
import userAppointments from './modules/userAppointments'
import placeAppointments from './modules/placeAppointments'
import placePatients from './modules/placePatients'
import placeEmployees from './modules/placeEmployees'
import placeStatistics from './modules/placeStatistics'
import addPatient from './modules/addPatient'
import addEmployee from './modules/addEmployee'
import initializeSteps from './modules/initializeSteps'
import appointmentsByMe from './modules/appointmentsByMe'
import myPatients from './modules/myPatients'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    window,
    modal,
    userInfo,
    userRecommendations,
    userHistories,
    userRoles,
    userAppointments,
    placeAppointments,
    placePatients,
    placeEmployees,
    placeStatistics,
    addPatient,
    addEmployee,
    initializeSteps,
    appointmentsByMe,
    myPatients
  },
  plugins: [
    createPersistedState({
      paths: ['userInfo']
    })
  ]
})
