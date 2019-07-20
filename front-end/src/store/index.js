import Vue from 'vue'
import Vuex from 'vuex'
import window from './modules/window'
import modal from './modules/modal'
import userInfo from './modules/userInfo'
import userRecommendations from './modules/userRecommendations'
import userHistory from './modules/userHistory'
import userPlaces from './modules/userPlaces'
import userAppointments from './modules/userAppointments'
import addPatient from './modules/addPatient'
import initializeSteps from './modules/initializeSteps'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    window,
    modal,
    userInfo,
    userRecommendations,
    userHistory,
    userPlaces,
    userAppointments,
    addPatient,
    initializeSteps
  },
  plugins: [
    createPersistedState({
      paths: ['userInfo']
    })
  ]
})
