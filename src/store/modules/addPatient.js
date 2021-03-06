import { apolloClient } from '@/apollo'
import { USER_BY_PESEL_QUERY } from '@/graphql/queries/_index'
import { INITIALIZE_USER_MUTATION } from '@/graphql/mutations/_index'

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
    state = getDefaultState()
  }
}

const actions = {
  initPlace ({commit}, place) {
    commit('SET_PLACE', place)
  },
  searchByPesel ({commit}, pesel) {
    return apolloClient
      .query({
        query: USER_BY_PESEL_QUERY,
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
        } else {
          commit('SET_SEARCH_FAILED_VALUE', true)
          throw new Error('Brak użytkownika w bazie')
        }
      })
  },
  initalizePatient ({commit}, data) {
    return apolloClient
      .mutate({
        mutation: INITIALIZE_USER_MUTATION,
        variables: {
          data: data
        }
      })
      .then(data => data.data.initializeUser)
      .then(user => {
        commit('SET_PATIENT', user)
        commit('SET_COMPLETED_VALUE', true)
        commit('SET_SEARCH_FAILED_VALUE', false)
      })
  },
  clear ({commit}) {
    commit('CLEAR_ADDPATIENT')
  },
  clearPatient ({commit}) {
    commit('SET_PATIENT', false)
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
