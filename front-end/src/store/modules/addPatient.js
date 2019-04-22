const state = {
  patient: false,
  place: null,
  searchFailed: false,
  completed: false
}

const mutations = {
  SET_PATIENT (state, patient) {
    state.patient = patient
  },
  SET_PLACE (state, place) {
    state.place = place
  },
  SET_SEARCH_FAILED_VALUE (state, value) {
    state.searchFailed = value
  },
  SET_COMPLETED_VALUE (state, value) {
    state.completed = value
  },
  CLEAR_ADDPATIENT (state, value) {
    state.patient = false
    state.place = null
    state.searchFailed = false
    state.completed = false
  }
}

const actions = {
  setPlace ({ commit }, place) {
    commit('SET_PLACE', place)
  },
  searchByPESEL ({ commit }, pesel) {
    // TODO API : SEARCH FOR PATIENT AND GET THE DATA
    const patientData = {
      img:
        'https://www.mendeley.com/careers/getasset/c475b7c0-d36c-4c73-be33-a34030b6ca82/',
      name: 'Adrian Orłów',
      email: 'adrian@orlow.me',
      phone: '792138222',
      birthdate: '2002-12-23 00:11:32.000000'
    }
    // MOCKUP
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (pesel == 96011999231) {
          commit('SET_PATIENT', patientData)
          commit('SET_COMPLETED_VALUE', true)
          commit('SET_SEARCH_FAILED_VALUE', false)
          resolve('Znaleziono użytkownika')
        } else {
          commit('SET_SEARCH_FAILED_VALUE', true)
          reject(new Error('Brak użytkownika w bazie'))
        }
      }, 400)
    })
  },
  createNew ({ commit }, patientData) {
    // MOCKUP
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('SET_PATIENT', {
          img: '/static/img/icons/profile-icon-720x720.png',
          ...patientData
        })
        commit('SET_COMPLETED_VALUE', true)
        commit('SET_SEARCH_FAILED_VALUE', false)
        resolve('Znaleziono użytkownika')
      }, 400)
    })
  },
  add () {
    // TODO
  },
  clear ({ commit }) {
    commit('CLEAR_ADDPATIENT')
  }
}

const getters = {
  place (state) {
    return state.place
  },
  patient (state) {
    return state.patient
  },
  isCompleted (state) {
    return state.completed
  },
  searchFailed (state) {
    return state.searchFailed
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
