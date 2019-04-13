import { api } from '../../api'

const state = {
  jwt:
    'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3RcLyIsImF1ZCI6Imh0dHA6XC9cL2xvY2FsaG9zdFwvIiwiaWF0IjoxNTQ3NDkxMTA2LCJuYmYiOjE1NDc0OTExMDYsImV4cCI6MTU0NzU3NzUwNiwiZGF0YSI6eyJpZCI6IjgiLCJuYW1lIjoiQWRyaWFuIiwic3VybmFtZSI6Ik9yXHUwMTQyXHUwMGYzdyIsImlzUGFpZCI6IjEifX0.kxo8DvoDa3WdQNzXDr02TUnc7d3onsoYJNhavnCHSs4',
  img:
    'https://www.mendeley.com/careers/getasset/c475b7c0-d36c-4c73-be33-a34030b6ca82/',
  name: 'Adrian',
  surname: 'Orłów',
  pesel: '96011999231',
  email: 'adrian@orlow.me',
  phone: '792138222',
  birthdate: '2002-12-23 00:11:32.000000',
  paidUntil: '2019-12-26 16:48:40.000000',
  spec: 'doktor',
  isPaid: true,
  isDeleted: false,
  isValid: true
}

const mutations = {
  SET_JWT (state, JWT) {
    state.userInfo.jwt = JWT
  },
  SET_NAME (state, { name, surname }) {
    state.name = name
    state.surname = surname
  },
  SET_ISPAID (state, status) {
    state.isPaid = status
  },
  SET_ISVALID (state, status) {
    state.isValid = status
  }
}

const actions = {
  updateName ({ commit }, params) {
    commit('SET_NAME', params)
  },
  updateIsPaid ({ commit }, status) {
    commit('SET_ISPAID', status)
  },
  checkIsValid ({ commit, state }) {
    const status = api.isTokenValid(state.userInfo.jwt)
    status.then(response => {
      commit('SET_ISVALID', response)
    })
  },
  loginWithUsernameAndPassword ({ commit }, credentials) {
    const status = api.loginWithUsernameAndPassword(credentials)
    return status.then(response => {
      if (response !== false) {
        commit('SET_JWT', response.data.jwt)
        commit('SET_ISVALID', true)
      } else {
        return false
      }
    })
  },
  logout ({ commit }) {
    commit('SET_JWT', '')
    return true
  }
}

const getters = {
  fullInfo (state) {
    return state
  },
  fullName (state) {
    return `${state.name} ${state.surname}`
  },
  image (state) {
    return state.img
  },
  specialization (state) {
    return state.spec
  },
  isValid (state) {
    return state.isValid
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}