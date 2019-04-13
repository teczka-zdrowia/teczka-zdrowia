const state = {
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

const mutations = {
  SET_SELECTED (state, id) {
    state.selected = id
  }
}

const actions = {
  setSelected ({ commit }, id) {
    commit('SET_SELECTED', id)
  }
}

const getters = {
  selected (state) {
    return state.list.find(place => place.id === state.selected)
  },
  list (state) {
    return state.list.filter(place => !place.isDeleted)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
