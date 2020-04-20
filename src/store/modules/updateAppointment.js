import { apolloClient } from '@/apollo'
import {
  UPDATE_APPOINTMENT_MUTATION,
  DELETE_APPOINTMENT_MUTATION
} from '@/graphql/mutations/_index'

const getDefaultState = () => {
  return {
    oldData: {
      id: null,
      patient: null,
      place: null
    },
    data: {
      date: '',
      note: ''
    }
  }
}

const state = getDefaultState()

const mutations = {
  SET_DATA (state, data) {
    state.data = data
  },
  SET_OLD_DATA (state, data) {
    state.oldData = data
  },
  CLEAR (state) {
    getDefaultState()
  }
}

const actions = {
  update ({commit}, {id, data}) {
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
        commit('CLEAR')
        return appointment
      })
  },
  delete ({commit}, id) {
    return apolloClient
      .mutate({
        mutation: DELETE_APPOINTMENT_MUTATION,
        variables: {
          id: id
        }
      })
      .then(data => data.data.deleteAppointment)
      .then(appointment => {
        commit('CLEAR')
        return appointment
      })
  },
  setData ({commit}, data) {
    commit('SET_DATA', data)
  },
  setOldData ({commit}, data) {
    commit('SET_OLD_DATA', data)
  }
}

const getters = {
  data (state) {
    return state.data
  },
  oldData (state) {
    return state.oldData
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
