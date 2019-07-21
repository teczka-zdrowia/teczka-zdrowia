import { apolloClient } from '@/apollo'
import { ME_HISTORIES_QUERY } from './queries/_index'

const state = {
  pageInfo: {
    endCursor: '',
    hasNextPage: false
  },
  edges: []
}

const mutations = {
  ADD_DATA (state, data) {
    state.pageInfo = Object.assign(state.pageInfo, data.pageInfo)
    state.edges = state.edges.concat(data.edges)
  }
}

const actions = {
  get ({ commit }, { first, after, note, orderBy }) {
    return apolloClient
      .query({
        query: ME_HISTORIES_QUERY,
        variables: {
          first: first,
          after: after,
          note: note,
          orderBy: orderBy
        }
      })
      .then(data => data.data.me.histories)
      .then(histories => {
        commit('ADD_DATA', histories)
      })
  }
}

const getters = {
  pageInfo (state) {
    return state.pageInfo
  },
  list (state) {
    return state.edges
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
