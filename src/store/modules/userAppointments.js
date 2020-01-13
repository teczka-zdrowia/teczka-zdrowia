import { apolloClient } from '@/apollo'
import { ME_APPOINTMENTS_QUERY } from '@/graphql/queries/_index'
import {
  UPDATE_APPOINTMENT_MUTATION,
  UPDATE_APPOINTMENT_CONFIRMATION_MUTATION
} from '@/graphql/mutations/_index'

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
      state.edges[foundIndex].node = Object.assign(state.edges[foundIndex].node, data)
    }
  },
  UPDATE_CONFIRMATION_LOCAL (state, data) {
    const foundIndex = state.edges.findIndex(edge => edge.node.id === data.id)
    state.edges[foundIndex].node.confirmed = data.confirmed
  },
  DELETE_LOCAL (state, data) {
    state.edges = state.edges.filter(edge => edge.node.id !== data.id)
  }
}

const actions = {
  get ({ commit }, { first, after, note, date, orderBy, type }) {
    return apolloClient
      .query({
        query: ME_APPOINTMENTS_QUERY,
        variables: {
          first: first,
          after: after,
          note: note,
          date: date,
          orderBy: orderBy
        }
      })
      .then(data => data.data.me.appointments)
      .then(appointments => {
        if (type === 'SET') {
          commit('SET_DATA', appointments)
        }

        if (type === 'ADD') {
          commit('ADD_DATA', appointments)
        }
      })
  },
  updateConfirmation ({ commit }, { id, confirmed }) {
    return apolloClient
      .mutate({
        mutation: UPDATE_APPOINTMENT_CONFIRMATION_MUTATION,
        variables: {
          id: id,
          confirmed: confirmed
        }
      })
      .then(data => data.data.updateAppointmentConfirmation)
      .then(appointment => {
        commit('UPDATE_CONFIRMATION_LOCAL', appointment)
      })
  },
  update ({ commit }, { data, id }) {
    return apolloClient
      .mutate({
        mutation: UPDATE_APPOINTMENT_MUTATION,
        variables: {
          id: id,
          data: data
        }
      })
      .then(data => data.data.updateAppointment)
      .then(appointment => {
        commit('UPDATE_LOCAL', appointment)
      })
  },
  addLocal ({ commit }, data) {
    commit('ADD_LOCAL', data)
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
