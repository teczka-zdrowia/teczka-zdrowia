import { apolloClient } from '@/apollo'
import {
  PATIENT_HISTORIES_QUERY,
  HISTORY_MORE_QUERY
} from '@/graphql/queries/_index'

const state = {
  pageInfo: {
    endCursor: '',
    hasNextPage: false
  },
  edges: []
}

const mutations = {
  SET_DATA (state, data) {
    state = Object.assign(state, data)
  },
  ADD_DATA (state, data) {
    state.pageInfo = Object.assign(state.pageInfo, data.pageInfo)
    state.edges = state.edges.concat(data.edges)
  },
  UPDATE_ONE (state, data) {
    const foundIndex = state.edges.findIndex(edge => edge.node.id === data.id)
    let foundHistory = state.edges[foundIndex].node
    foundHistory = Object.assign(foundHistory, data)
  }
}

const actions = {
  get ({commit}, {id, first, after, note, orderBy, type}) {
    return apolloClient
      .query({
        query: PATIENT_HISTORIES_QUERY,
        variables: {
          id: id,
          first: first,
          after: after,
          note: note,
          orderBy: orderBy
        },
        fetchPolicy: 'no-cache'
      })
      .then(data => data.data.user.histories)
      .then(histories => {
        if (type === 'SET') {
          commit('SET_DATA', histories)
        }

        if (type === 'ADD') {
          commit('ADD_DATA', histories)
        }
      })
  },
  getMore ({commit}, id) {
    return apolloClient
      .query({
        query: HISTORY_MORE_QUERY,
        variables: {
          id: id
        },
        fetchPolicy: 'no-cache'
      })
      .then(data => data.data.history)
      .then(history => {
        commit('UPDATE_ONE', history)
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
