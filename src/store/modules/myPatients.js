import { apolloClient } from '@/apollo'
import { MY_PATIENTS_QUERY } from '@/graphql/queries/_index'

const state = {
  list: []
}

const mutations = {
  SET_DATA (state, data) {
    state.list = data
  },
  ADD_DATA (state, data) {
    state.list.push(data)
  }
}

const actions = {
  get ({commit}) {
    return apolloClient
      .query({
        query: MY_PATIENTS_QUERY
      })
      .then(data => data.data.myPatients)
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
