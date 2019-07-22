import { apolloClient } from '@/apollo'
import { ME_ROLES_QUERY } from './queries/_index'
import { CREATE_PLACE_MUTATION } from './mutations/_index'

const state = {
  selected: null,
  roles: []
}

const mutations = {
  SET_DATA (state, data) {
    state.roles = data
  },
  SET_SELECTED (state, id) {
    state.selected = id
  },
  ADD_TO_ROLES (state, data) {
    state.roles.push(data)
  }
}

const actions = {
  setSelected ({ commit }, id) {
    commit('SET_SELECTED', id)
  },
  get ({ commit }) {
    return apolloClient
      .query({
        query: ME_ROLES_QUERY
      })
      .then(data => data.data.me.roles)
      .then(roles => {
        commit('SET_DATA', roles)
      })
  },
  createPlace ({ commit }, data) {
    return apolloClient
      .mutate({
        mutation: CREATE_PLACE_MUTATION,
        variables: {
          data: data
        }
      })
      .then(data => data.data.createPlace)
      .then(place => {
        const payload = {
          permissionType: 'ADMIN',
          place: place
        }
        commit('ADD_TO_ROLES', payload)
      })
  }
}

const getters = {
  selected (state) {
    return state.roles.find(role => role.id === state.selected)
  },
  list (state) {
    return state.roles
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
