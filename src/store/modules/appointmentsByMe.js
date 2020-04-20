import { apolloClient } from '@/apollo'
import { APPOINTMENTS_BY_ME_QUERY } from '@/graphql/queries/_index'

const state = {
  data: {
    pageInfo: {
      endCursor: '',
      hasNextPage: false
    },
    edges: []
  },
  variables: {
    first: '',
    after: '',
    note: '',
    date: '',
    orderBy: ''
  },
  date: ''
}

const mutations = {
  SET_DATA (state, data) {
    state.data = Object.assign(state.data, data)
  },
  ADD_DATA (state, data) {
    state.data.pageInfo = Object.assign(state.data.pageInfo, data.pageInfo)
    state.data.edges = state.data.edges.concat(data.edges)
  },
  UPDATE_LOCAL (state, data) {
    const foundIndex = state.data.edges.findIndex(edge => edge.node.id === data.id)
    const dataExists = state.data.edges[foundIndex]
    if (dataExists) {
      state.data.edges[foundIndex].node = Object.assign(state.data.edges[foundIndex].node, data)
    }
  },
  DELETE_LOCAL (state, data) {
    state.data.edges = state.data.edges.filter(edge => edge.node.id !== data.id)
  },
  SET_DATE (state, data) {
    state.date = data
  },
  SET_VARIABLES (state, data) {
    state.variables = data
  }
}

const actions = {
  get ({commit}, {first, after, note, date, orderBy, type}) {
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
  addLocal ({commit}, data) {
    commit('ADD_DATA', data)
  },
  updateLocal ({commit}, data) {
    commit('UPDATE_LOCAL', data)
  },
  deleteLocal ({commit}, data) {
    commit('DELETE_LOCAL', data)
  },
  setDate ({commit}, data) {
    commit('SET_DATE', data)
  },
  setVariables ({commit}, data) {
    commit('SET_VARIABLES', data)
  }
}

const getters = {
  pageInfo (state) {
    return state.data.pageInfo
  },
  list (state) {
    return state.data.edges
  },
  dates (state) {
    return state.data.edges.map(edge => edge.node.date.slice(0, 10))
  },
  date (state) {
    return state.date
  },
  variables (state) {
    return state.variables
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
