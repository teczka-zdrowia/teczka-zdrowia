import Vue from 'vue'
import Vuex from 'vuex'
import window from './modules/window'
import modal from './modules/modal'
import userInfo from './modules/userInfo'
import userPrescriptions from './modules/userPrescriptions'
import userHistory from './modules/userHistory'
import userPlaces from './modules/userPlaces'
import userAppointments from './modules/userAppointments'
import addPatient from './modules/addPatient'
import initializeSteps from './modules/initializeSteps'
import localStoragePlugin from './plugins/localStorage'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    window,
    modal,
    userInfo,
    userPrescriptions,
    userHistory,
    userPlaces,
    userAppointments,
    addPatient,
    initializeSteps
  },
  plugins: [localStoragePlugin]
})
