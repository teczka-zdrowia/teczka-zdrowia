import { apolloClient } from '@/apollo'
import {
  CREATE_HISTORY_MUTATION,
  CREATE_ATTACHMENTS_MUTATION,
  CREATE_RECOMMENDATIONS_MUTATION
} from '@/graphql/mutations/_index'

const getDefaultState = () => {
  return {
    history: null,
    patient: null,
    data: {
      place_id: null,
      patient_id: null,
      date: '',
      note: '',
      treatments: '',
      agreement: null,
      recommendations: [],
      attachments: []
    }
  }
}

const state = getDefaultState()

const mutations = {
  SET_DATA (state, data) {
    state.data = data
  },
  SET_PATIENT (state, patient) {
    state.patient = patient
  },
  SET_HISTORY (state, history) {
    state.history = history
  },
  CLEAR (state) {
    getDefaultState()
  }
}

const actions = {
  add ({ commit }, data) {
    return apolloClient
      .mutate({
        mutation: CREATE_HISTORY_MUTATION,
        variables: {
          data: data
        },
        context: {
          hasUpload: true
        }
      })
      .then(data => data.data.createHistory)
      .then(history => commit('SET_HISTORY', history))
  },
  addRecommendations ({ commit }, { data, historyId }) {
    return apolloClient
      .mutate({
        mutation: CREATE_RECOMMENDATIONS_MUTATION,
        variables: {
          data: data,
          history_id: historyId
        },
        context: {
          hasUpload: true
        }
      })
      .then(data => data.data.createRecommendations)
  },
  addAttachments ({ commit }, { data, historyId }) {
    return apolloClient
      .mutate({
        mutation: CREATE_ATTACHMENTS_MUTATION,
        variables: {
          data: data,
          history_id: historyId
        },
        context: {
          hasUpload: true
        }
      })
      .then(data => data.data.createAttachments)
  },
  clearData ({ commit }) {
    commit('CLEAR')
  },
  setData ({ commit }, data) {
    commit('SET_DATA', data)
  },
  setPatient ({ commit }, patient) {
    commit('SET_PATIENT', patient)
  }
}

const getters = {
  data (state) {
    return state.data
  },
  patient (state) {
    return state.patient
  },
  history (state) {
    return state.history
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
