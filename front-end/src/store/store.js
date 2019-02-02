import Vue from 'vue'
import Vuex from 'vuex'
import { api } from '../api/api'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    userInfo: {
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
    },
    showModals: { user: false, auth: false },
    places: [],
    upcoming: [
      {
        doctor: {
          img:
            'https://www.mendeley.com/careers/getasset/c475b7c0-d36c-4c73-be33-a34030b6ca82/',
          name: 'Jan Iksiński',
          spec: 'psycholog'
        },
        place: 'Medmax Warszawa',
        date: '2019-03-26 16:48:40.000000',
        note: 'xxx',
        status: null
      }
    ],
    userHistory: [
      {
        doctor: {
          img:
            'https://www.mendeley.com/careers/getasset/c475b7c0-d36c-4c73-be33-a34030b6ca82/',
          name: 'Jan Iksiński',
          spec: 'psycholog'
        },
        date: '16.10.2018',
        place: 'Medmax Warszawa',
        desc: 'Ból klatki piersiowej',
        more: {},
        isOpened: false
      },
      {
        doctor: {
          img:
            'https://www.mendeley.com/careers/getasset/c475b7c0-d36c-4c73-be33-a34030b6ca82/',
          name: 'Anna Igrecka',
          spec: 'doktor'
        },
        date: '19.10.2018',
        place: 'Medmax Katowice centrum',
        desc: 'Lorem impsum dolor sit amet',
        more: {},
        isOpened: false
      }
    ],
    appointments: [
      {
        doctor: {
          img:
            'https://www.mendeley.com/careers/getasset/c475b7c0-d36c-4c73-be33-a34030b6ca82/',
          name: 'Jan Iksiński',
          spec: 'psycholog'
        },
        date: '16.10.2018',
        time: '18:30',
        place: 'Medmax Warszawa',
        desc: 'Ból klatki piersiowej',
        isAccepted: false
      },
      {
        doctor: {
          img:
            'https://www.mendeley.com/careers/getasset/c475b7c0-d36c-4c73-be33-a34030b6ca82/',
          name: 'Jan Iksiński',
          spec: 'psycholog'
        },
        date: '16.10.2018',
        time: '18:30',
        place: 'Medmax Warszawa',
        desc: 'Ból klatki piersiowej',
        isAccepted: true
      }
    ]
  },
  actions: {
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
    },
    toggleHistoryElement ({ commit }, id) {
      commit('TOGGLE_HISTORY_ELEMENT', id)
    }
  },
  mutations: {
    SET_JWT (state, JWT) {
      state.userInfo.jwt = JWT
    },
    SET_NAME (state, { name, surname }) {
      state.userInfo.name = name
      state.userInfo.surname = surname
    },
    SET_ISPAID (state, status) {
      state.userInfo.isPaid = status
    },
    SET_ISVALID (state, status) {
      state.userInfo.isValid = status
    },
    SET_PLACES (state, places) {
      state.places = places
    },
    TOGGLE_HISTORY_ELEMENT (state, id) {
      state.userHistory[id].isOpened = !state.userHistory[id].isOpened
    }
  },
  getters: {
    userInfo (state) {
      return state.userInfo
    },
    userHistory (state) {
      return state.userHistory
    },
    userHistoryCount (state) {
      return state.userHistory.length
    },
    userAppointments (state) {
      return state.appointments
    },
    getPlaces (state) {
      return state.places
    },
    modalsShowed (state) {
      return state.showModals
    }
  },
  plugins: [createPersistedState()]
})
