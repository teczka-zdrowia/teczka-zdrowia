const state = {
  viewAs: 'patient'
}

const mutations = {
  SET_VIEW_AS (state, value) {
    state.viewAs = value
  }
}

const actions = {
  setViewAs ({ commit }, value) {
    commit('SET_VIEW_AS', value)
  }
}

const getters = {
  viewAs (state) {
    return state.viewAs
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
