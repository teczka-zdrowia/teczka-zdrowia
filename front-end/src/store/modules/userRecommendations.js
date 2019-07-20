import { apolloClient } from '@/apollo'
import { ME_RECOMMENDATIONS_QUERY } from './queries/_index'

const state = {
  edges: [],
  pageInfo: {
    hasPreviousPage: false,
    hasNextPage: false,
    startCursor: '',
    endCursor: ''
  }
}

const mutations = {
  SET_DATA (state, data) {
    state = Object.assign(state, data)
  }
}

const actions = {
  get ({ commit }, { first, after }) {
    apolloClient
      .query({
        query: ME_RECOMMENDATIONS_QUERY,
        variables: {
          first: first,
          after: after
        }
      })
      .then(data => data.data.me.recommendations)
      .then(recommendations => {
        commit('SET_DATA', recommendations)
      })
  }
}

const getters = {
  pageInfo (state) {
    return state.pageInfo
  },
  list (state) {
    return Array.from(state.edges, edge => edge.node)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
