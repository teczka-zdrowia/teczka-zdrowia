import Vue from 'vue'
import Vuex from 'vuex'
import window from './modules/window'
import settings from './modules/settings'
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
import patientHistories from './modules/patientHistories'
import patientRoles from './modules/patientRoles'
import addPatient from './modules/addPatient'
import addEmployee from './modules/addEmployee'
import addAppointment from './modules/addAppointment'
import addHistory from './modules/addHistory'
import updateAppointment from './modules/updateAppointment'
import initializeSteps from './modules/initializeSteps'
import appointmentsByMe from './modules/appointmentsByMe'
import myPatients from './modules/myPatients'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    window,
    settings,
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
    patientHistories,
    patientRoles,
    addPatient,
    addEmployee,
    addAppointment,
    addHistory,
    updateAppointment,
    initializeSteps,
    appointmentsByMe,
    myPatients
  },
  plugins: [
    createPersistedState({
      paths: ['userInfo', 'settings']
    })
  ]
})
