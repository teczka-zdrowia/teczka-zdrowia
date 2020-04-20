import { apolloClient } from '@/apollo'
import { PATIENT_ROLES_QUERY } from '@/graphql/queries/_index'

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
  },
  SET_PLACE_DATA (state, data) {
    const foundIndex = state.roles.findIndex(role => role.place.id === data.id)
    state.roles[foundIndex].place = data
  }
}

const actions = {
  setSelected ({commit}, id) {
    commit('SET_SELECTED', id)
  },
  get ({commit}, id) {
    return apolloClient
      .query({
        query: PATIENT_ROLES_QUERY,
        variables: {
          id: id
        },
        fetchPolicy: 'no-cache'
      })
      .then(data => data.data.user.roles)
      .then(roles => {
        const filteredRoles = roles.filter(
          role =>
            role.permission_type !== 'ADMIN' &&
            role.permission_type !== 'EMPLOYEE'
        )
        commit('SET_DATA', filteredRoles)
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
