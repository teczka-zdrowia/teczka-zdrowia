import Vue from 'vue'
import Vuex from 'vuex'
import { api } from '../api/api'
// import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    window: {
      width: 0,
      height: 0
    },
    showModals: {
      user: false,
      auth: false
    },
    userInfo: {
      jwt:
        'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3RcLyIsImF1ZCI6Imh0dHA6XC9cL2xvY2FsaG9zdFwvIiwiaWF0IjoxNTQ3NDkxMTA2LCJuYmYiOjE1NDc0OTExMDYsImV4cCI6MTU0NzU3NzUwNiwiZGF0YSI6eyJpZCI6IjgiLCJuYW1lIjoiQWRyaWFuIiwic3VybmFtZSI6Ik9yXHUwMTQyXHUwMGYzdyIsImlzUGFpZCI6IjEifX0.kxo8DvoDa3WdQNzXDr02TUnc7d3onsoYJNhavnCHSs4',
      img: 'https://thispersondoesnotexist.com/',
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
    userHistory: [
      {
        doctor: {
          img: 'https://thispersondoesnotexist.com/',
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
          img: 'https://thispersondoesnotexist.com/',
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
          img: 'https://thispersondoesnotexist.com/',
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
          img: 'https://thispersondoesnotexist.com/',
          name: 'Jan Iksiński',
          spec: 'psycholog'
        },
        date: '16.10.2018',
        time: '18:30',
        place: 'Medmax Warszawa',
        desc: 'Ból klatki piersiowej',
        isAccepted: true
      },
      {
        doctor: {
          img: 'https://thispersondoesnotexist.com/',
          name: 'Jan Iksiński',
          spec: 'psycholog'
        },
        date: '16.10.2018',
        time: '18:31',
        place: 'Medmax Warszawa',
        desc: 'Ból klatki piersiowej',
        isAccepted: true
      },
      {
        doctor: {
          img: 'https://thispersondoesnotexist.com/',
          name: 'Jan Iksiński',
          spec: 'psycholog'
        },
        date: '16.10.2018',
        time: '18:32',
        place: 'Medmax Warszawa',
        desc: 'Ból klatki piersiowej',
        isAccepted: true
      },
      {
        doctor: {
          img: 'https://thispersondoesnotexist.com/',
          name: 'Jan Iksiński',
          spec: 'psycholog'
        },
        date: '16.10.2018',
        time: '18:33',
        place: 'Medmax Warszawa',
        desc: 'Ból klatki piersiowej',
        isAccepted: true
      }
    ],
    places: {
      selected: null,
      list: [
        {
          id: 1,
          name: 'MedMax',
          address: 'Kwiatowa 45',
          city: 'Jaworzno',
          isActive: true,
          isDeleted: false,
          isAdmin: false
        },
        {
          id: 6,
          name: 'MaxMed',
          address: 'Różowa 100',
          city: 'Wrocław',
          isActive: true,
          isDeleted: false,
          isAdmin: true
        },
        {
          id: 2,
          name: 'MedMax 2',
          address: 'Lipowa 6',
          city: 'Warszawa',
          isActive: false,
          isDeleted: false,
          isAdmin: true
        }
      ]
    }
  },
  actions: {
    updateWindowWidthAndHeight ({ commit }, params) {
      commit('SET_WINDOW_DIMENSIONS', params)
    },
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
    },
    setSelectedPlace ({ commit }, id) {
      commit('SET_SELECTED_PLACE', id)
    }
  },
  mutations: {
    SET_WINDOW_DIMENSIONS (state, { width, height }) {
      state.window.width = width
      state.window.height = height
    },
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
    TOGGLE_HISTORY_ELEMENT (state, id) {
      state.userHistory[id].isOpened = !state.userHistory[id].isOpened
    },
    SET_SELECTED_PLACE (state, id) {
      state.places.selected = id
    }
  },
  getters: {
    window (state) {
      return state.window
    },
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
    selectedPlace (state) {
      return state.places.list.find(place => place.id === state.places.selected)
    },
    userPlaces (state) {
      return state.places.list.filter(place => !place.isDeleted)
    }
  }
})
