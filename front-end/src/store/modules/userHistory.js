const state = [
  {
    id: 1,
    doctor: {
      img:
        'https://www.mendeley.com/careers/getasset/c475b7c0-d36c-4c73-be33-a34030b6ca82/',
      name: 'Jan Iksiński',
      spec: 'psycholog'
    },
    date: '16.10.2018',
    place: 'Medmax Warszawa',
    desc: 'Ból klatki piersiowej'
  },
  {
    id: 2,
    doctor: {
      img:
        'https://www.mendeley.com/careers/getasset/c475b7c0-d36c-4c73-be33-a34030b6ca82/',
      name: 'Anna Igrecka',
      spec: 'doktor'
    },
    date: '19.10.2018',
    place: 'Medmax Katowice centrum',
    desc: 'Lorem impsum dolor sit amet'
  }
]

const mutations = {
  TOGGLE_HISTORY_ELEMENT (state, id) {
    state.userHistory[id].isOpened = !state.userHistory[id].isOpened
  }
}

const actions = {
  toggleHistoryElement ({ commit }, id) {
    commit('TOGGLE_HISTORY_ELEMENT', id)
  }
}

const getters = {
  all (state) {
    return state
  },
  count (state) {
    return state.length
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
