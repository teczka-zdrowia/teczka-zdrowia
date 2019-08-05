import { apolloClient } from '@/apollo'
import { PLACE_APPOINTMENTS_QUERY } from '@/graphql/queries/_index'

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
  UPDATE_LOCAL (state, data) {
    const foundIndex = state.edges.findIndex(edge => edge.node.id === data.id)
    state.edges[foundIndex].node = data
  }
}

const actions = {
  get ({ commit }, { id, first, after, note, date, orderBy, type, author_id }) {
    return apolloClient
      .query({
        query: PLACE_APPOINTMENTS_QUERY,
        variables: {
          id: id,
          first: first,
          after: after,
          note: note,
          date: date,
          orderBy: orderBy,
          author_id: author_id
        }
      })
      .then(data => data.data.place.appointments)
      .then(appointments => {
        if (type === 'SET') {
          commit('SET_DATA', appointments)
        }

        if (type === 'ADD') {
          commit('ADD_DATA', appointments)
        }
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
