import { apolloClient } from '@/apollo'
import { PLACE_STATISTICS_QUERY } from '@/graphql/queries/_index'

const state = {
  patients_count: 0,
  appointments_count: 0,
  most_active_worker: {
    name: ''
  }
}

const mutations = {
  SET_DATA (state, data) {
    state = Object.assign(state, data)
  }
}

const actions = {
  get ({commit}, {id, date}) {
    return apolloClient
      .query({
        query: PLACE_STATISTICS_QUERY,
        variables: {
          id: id,
          date: date
        }
      })
      .then(data => data.data.placeStatistics)
      .then(statistics => {
        commit('SET_DATA', statistics)
      })
  }
}

const getters = {
  full (state) {
    return state
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
