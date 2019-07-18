import { apolloClient } from '@/apollo'
import { AUTH_TOKEN, API_URL } from '@/apollo/constants'
import LOGIN_MUTATION from './mutations/login.gql'
import LOGOUT_MUTATION from './mutations/logout.gql'
import ME_QUERY from './queries/me.gql'

const state = {
  id: null,
  avatar: null,
  name: null,
  pesel: null,
  email: null,
  phone: null,
  birthdate: null,
  paid_until: null,
  is_payment_valid: null
}

const mutations = {
  SET_DATA (state, data) {
    data.avatar = `${API_URL}/storage/avatars/` + data.avatar
    state = Object.assign(state, data)
  },
  SET_PESEL (state, pesel) {
    state.pesel = pesel
  }
}

const actions = {
  login ({ commit }, credentials) {
    return apolloClient
      .mutate({
        mutation: LOGIN_MUTATION,
        variables: {
          data: credentials
        }
      })
      .then(data => data.data.login)
      .then(login => {
        window.localStorage.setItem(AUTH_TOKEN, login.access_token)
      })
  },
  getData ({ commit }) {
    return apolloClient
      .query({ query: ME_QUERY })
      .then(data => data.data.me)
      .then(me => {
        commit('SET_DATA', me)
      })
  },
  logout ({ commit }) {
    return apolloClient
      .mutate({
        mutation: LOGOUT_MUTATION
      })
      .then(data => data.data.logout)
      .then(logout => {
        if (logout.status === 'TOKEN_REVOKED') {
          window.localStorage.removeItem(AUTH_TOKEN)
        } else {
          throw new Error('Token is not valid')
        }
      })
  },
  updatePESEL ({ commit }, pesel) {
    commit('UPDATE_PESEL', 96011999231)
  },
  hidePESEL ({ commit }) {
    commit('UPDATE_PESEL', null)
  }
}

const getters = {
  full (state) {
    return state
  },
  name (state) {
    return state.name
  },
  avatar (state) {
    return state.avatar
  },
  specialization (state) {
    return state.specialization
  },
  pesel (state) {
    return state.pesel
  },
  paidUntil (state) {
    return state.paid_until
  },
  isPaymentValid (state) {
    return state.is_payment_valid
  },
  isLoggedIn (state) {
    return window.localStorage.getItem(AUTH_TOKEN) !== null
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
