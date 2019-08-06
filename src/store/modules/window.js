const state = {
  width: 0,
  height: 0
}

const actions = {
  updateWidthAndHeight ({ commit }, params) {
    commit('SET_WINDOW_DIMENSIONS', params)
  }
}

const mutations = {
  SET_WINDOW_DIMENSIONS (state, { width, height }) {
    state.width = width
    state.height = height
  }
}

const getters = {
  isMobile (state) {
    return state.width < 960
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
