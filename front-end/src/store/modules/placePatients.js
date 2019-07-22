import { apolloClient } from '@/apollo'
import { PLACE_PATIENTS_QUERY } from './queries/_index'

const state = {
  list: []
}

const mutations = {
  SET_DATA (state, data) {
    state.list = Object.assign(state.list, data)
  },
  ADD_DATA (state, data) {
    state.list = state.list.push(data)
  }
}

const actions = {
  get ({ commit }, id) {
    return apolloClient
      .query({
        query: PLACE_PATIENTS_QUERY,
        variables: {
          id: id
        }
      })
      .then(data => data.data.place.patients)
      .then(patients => {
        commit('SET_DATA', patients)
      })
  }
}

const getters = {
  list (state) {
    return state.list
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
