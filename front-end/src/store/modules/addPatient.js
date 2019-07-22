import { apolloClient } from '@/apollo'
import { USER_BY_PESEL } from './queries/_index'

const getDefaultState = () => {
  return {
    patient: false,
    place: null,
    searchFailed: false,
    completed: false
  }
}

const state = getDefaultState()

const mutations = {
  SET_PATIENT (state, patient) {
    state.patient = patient
  },
  SET_PLACE (state, place) {
    state.place = place
  },
  SET_SEARCH_FAILED_VALUE (state, value) {
    state.searchFailed = value
  },
  SET_COMPLETED_VALUE (state, value) {
    state.completed = value
  },
  CLEAR_ADDPATIENT (state, value) {
    getDefaultState()
  }
}

const actions = {
  initPlace ({ commit }, place) {
    commit('SET_PLACE', place)
  },
  searchByPesel ({ commit }, pesel) {
    console.log(pesel)
    return apolloClient
      .query({
        query: USER_BY_PESEL,
        variables: {
          pesel: pesel
        }
      })
      .then(data => data.data.user)
      .then(user => {
        if (user) {
          commit('SET_PATIENT', user)
          commit('SET_COMPLETED_VALUE', true)
          commit('SET_SEARCH_FAILED_VALUE', false)
          return 'Znaleziono użytkownika'
        } else {
          commit('SET_SEARCH_FAILED_VALUE', true)
          throw new Error('Brak użytkownika w bazie')
        }
      })
  },
  createNew ({ commit }, patientData) {
    // MOCKUP
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('SET_PATIENT', {
          img: '/static/img/icons/profile-icon-720x720.png',
          ...patientData
        })
        commit('SET_COMPLETED_VALUE', true)
        commit('SET_SEARCH_FAILED_VALUE', false)
        resolve('Znaleziono użytkownika')
      }, 400)
    })
  },
  add () {
    // TODO
  },
  clear ({ commit }) {
    commit('CLEAR_ADDPATIENT')
  }
}

const getters = {
  place (state) {
    return state.place
  },
  patient (state) {
    return state.patient
  },
  isCompleted (state) {
    return state.completed
  },
  searchFailed (state) {
    return state.searchFailed
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
