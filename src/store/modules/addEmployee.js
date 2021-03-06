import { apolloClient } from '@/apollo'
import { USER_BY_PESEL_QUERY } from '@/graphql/queries/_index'
import { INITIALIZE_USER_MUTATION } from '@/graphql/mutations/_index'

const getDefaultState = () => {
  return {
    employee: false,
    place: null,
    searchFailed: false,
    completed: false
  }
}

const state = getDefaultState()

const mutations = {
  SET_EMPLOYEE (state, employee) {
    state.employee = employee
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
          commit('SET_EMPLOYEE', user)
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
        commit('SET_EMPLOYEE', user)
        commit('SET_COMPLETED_VALUE', true)
        commit('SET_SEARCH_FAILED_VALUE', false)
      })
  },
  clear ({commit}) {
    commit('CLEAR_ADDPATIENT')
  }
}

const getters = {
  place (state) {
    return state.place
  },
  employee (state) {
    return state.employee
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
