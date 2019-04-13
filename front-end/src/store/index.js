import Vue from 'vue'
import Vuex from 'vuex'
import window from './modules/window'
import userInfo from './modules/userInfo'
import userPrescriptions from './modules/userPrescriptions'
import userHistory from './modules/userHistory'
import userPlaces from './modules/userPlaces'
import userAppointments from './modules/userAppointments'
// import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    window,
    userInfo,
    userPrescriptions,
    userHistory,
    userPlaces,
    userAppointments
  },
  state: {
    showModals: {
      user: false,
      auth: false
    }
  }
})
