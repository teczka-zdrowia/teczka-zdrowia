const state = {
  patient: false,
  place: null,
  isCompleted: false
}

const mutations = {
  SET_PATIENT (state, patient) {
    state.patient = patient
  },
  SET_PLACE (state, place) {
    state.place = place
  },
  SET_COMPLETED (state, value) {
    state.isCompleted = value
  },
  CLEAR_ADDPATIENT (state, value) {
    state = {
      patient: false,
      place: null,
      isCompleted: false
    }
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
    setTimeout(() => {
      if (pesel == 96011999231) {
        commit('SET_PATIENT', patientData)
        commit('SET_COMPLETED', true)
        return true
      } else {
        return false
      }
    }, 400)
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
    return state.isCompleted
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
