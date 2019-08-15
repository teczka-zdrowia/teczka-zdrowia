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
    const dataExists = state.edges[foundIndex]
    if (dataExists) {
      state.edges[foundIndex].node = Object.assign(
        state.edges[foundIndex].node,
        data
      )
    }
  },
  DELETE_LOCAL (state, data) {
    state.edges = state.edges.filter(edge => edge.node.id !== data.id)
  }
}

const actions = {
  get ({ commit }, { id, first, after, note, date, orderBy, type, authorId }) {
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
          author_id: authorId
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
  },
  updateLocal ({ commit }, data) {
    commit('UPDATE_LOCAL', data)
  },
  deleteLocal ({ commit }, data) {
    commit('DELETE_LOCAL', data)
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
