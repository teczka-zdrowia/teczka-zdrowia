import { apolloClient } from '@/apollo'
import { APPOINTMENTS_BY_ME_QUERY } from '@/graphql/queries/_index'

const state = {
  pageInfo: {
    endCursor: '',
    hasNextPage: false
  },
  edges: [],
  date: ''
}

const mutations = {
  SET_DATA (state, data) {
    state = Object.assign(state, data)
  },
  SET_DATE (state, data) {
    state.date = data
  },
  ADD_DATA (state, data) {
    state.pageInfo = Object.assign(state.pageInfo, data.pageInfo)
    state.edges = state.edges.concat(data.edges)
  },
  UPDATE_LOCAL (state, data) {
    const foundIndex = state.edges.findIndex(edge => edge.node.id === data.id)
    const dataExists = state.edges[foundIndex]
    if (dataExists) {
      state.edges[foundIndex].node = Object.assign(state.edges[foundIndex].node, data)
    }
  },
  DELETE_LOCAL (state, data) {
    state.edges = state.edges.filter(edge => edge.node.id !== data.id)
  }
}

const actions = {
  get ({ commit }, { first, after, note, date, orderBy, type }) {
    return apolloClient
      .query({
        query: APPOINTMENTS_BY_ME_QUERY,
        variables: {
          first: first,
          after: after,
          note: note,
          date: date,
          orderBy: orderBy
        }
      })
      .then(data => data.data.appointmentsByMe)
      .then(appointments => {
        if (type === 'SET') {
          commit('SET_DATA', appointments)
        }

        if (type === 'ADD') {
          commit('ADD_DATA', appointments)
        }
      })
  },
  setDate ({ commit }, date) {
    commit('SET_DATE', date)
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
  },
  date (state) {
    return state.date
  },
  dates (state) {
    return state.edges.map(edge => edge.node.date.slice(0, 10))
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
