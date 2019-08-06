const state = {
  visible: false,
  component: null,
  data: null
}

const mutations = {
  SHOW_MODAL (state, params) {
    state.visible = true
    state.component = params.componentName
    if (params.data !== undefined) state.data = params.data
  },
  HIDE_MODAL (state) {
    state.visible = false
    state.data = null
  },
  UPDATE_MODAL_DATA (state, data) {
    state.data = Object.assign(state.data, data)
  }
}

const actions = {
  show ({ commit }, params) {
    commit('SHOW_MODAL', params)
  },
  hide ({ commit }) {
    commit('HIDE_MODAL')
  },
  updateData ({ commit }, data) {
    commit('UPDATE_MODAL_DATA', data)
  }
}

const getters = {
  visible (state) {
    return state.visible
  },
  component (state) {
    return state.component
  },
  data (state) {
    return state.data
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
