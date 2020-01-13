import { apolloClient } from '@/apollo'
import { CREATE_APPOINTMENT_MUTATION } from '@/graphql/mutations/_index'

const getDefaultState = () => {
  return {
    data: {
      place_id: null,
      patient_id: null,
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
  CLEAR (state) {
    state = getDefaultState()
  }
}

const actions = {
  add ({ commit }, data) {
    return apolloClient
      .mutate({
        mutation: CREATE_APPOINTMENT_MUTATION,
        variables: {
          data: data
        }
      })
      .then(data => data.data.createAppointment)
      .then(appointment => {
        commit('CLEAR')
        return appointment
      })
  },
  setData ({ commit }, data) {
    commit('SET_DATA', data)
  }
}

const getters = {
  data (state) {
    return state.data
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
