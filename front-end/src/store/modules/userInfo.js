import { apolloClient } from '@/apollo'
import { AUTH_TOKEN, API_URL } from '@/apollo/constants'
import {
  LOGIN_MUTATION,
  CREATE_USER_MUTATION,
  UPDATE_ME_MUTATION,
  UPDATE_PASSWORD_MUTATION,
  LOGOUT_MUTATION,
  DELETE_ME_MUTATION
} from './mutations/_index'
import {
  ME_QUERY,
  ME_PESEL_QUERY
} from './queries/_index'

const getDefaultState = () => {
  return {
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
}

const state = getDefaultState()

const mutations = {
  SET_DATA (state, data) {
    state = Object.assign(state, data)
  },
  SET_PESEL (state, pesel) {
    state.pesel = pesel
  },
  RESET_DATA (state) {
    Object.assign(state, getDefaultState())
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
  signup ({ commit }, data) {
    return apolloClient
      .mutate({
        mutation: CREATE_USER_MUTATION,
        variables: {
          data: data
        }
      })
      .then(data => data.data.createUser)
  },
  getData ({ commit }) {
    return apolloClient
      .query({ query: ME_QUERY })
      .then(data => data.data.me)
      .then(me => {
        commit('SET_DATA', me)
      })
  },
  updateData ({ commit }, data) {
    return apolloClient
      .mutate({
        mutation: UPDATE_ME_MUTATION,
        variables: {
          data: data
        },
        context: {
          hasUpload: true
        }
      })
      .then(data => data.data.updateMe)
      .then(me => commit('SET_DATA', me))
  },
  updatePassword ({ commit }, data) {
    return apolloClient
      .mutate({
        mutation: UPDATE_PASSWORD_MUTATION,
        variables: {
          data: data
        }
      })
      .then(data => data.data.updatePassword)
      .then(data => {
        if (data.status === 'PASSWORD_NOT_UPDATED') {
          throw new Error(data.message)
        }
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
          commit('RESET_DATA')
          window.localStorage.removeItem(AUTH_TOKEN)
        } else {
          throw new Error('Token is not valid')
        }
      })
  },
  delete ({ commit }, data) {
    return apolloClient
      .mutate({
        mutation: DELETE_ME_MUTATION,
        variables: {
          data: data
        }
      })
      .then(data => data.data.deleteMe)
      .then(deleteMe => {
        commit('RESET_DATA')
        window.localStorage.removeItem(AUTH_TOKEN)
      })
  },
  getPESEL ({ commit }, password) {
    return apolloClient
      .query({
        query: ME_PESEL_QUERY,
        variables: {
          password
        }
      })
      .then(data => data.data.pesel)
      .then(pesel => {
        commit('SET_PESEL', pesel)
      })
  },
  hidePESEL ({ commit }) {
    commit('SET_PESEL', null)
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
