import { apolloClient } from '@/apollo'
import { ME_ROLES_QUERY } from '@/graphql/queries/_index'
import {
  CREATE_PLACE_MUTATION,
  UPDATE_PLACE_MUTATION
} from '@/graphql/mutations/_index'

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
        const filteredRoles = roles.filter(
          role => role.permission_type !== 'PATIENT'
        )
        commit('SET_DATA', filteredRoles)
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
          place: {
            ...place,
            is_active: true
          }
        }
        commit('ADD_TO_ROLES', payload)
      })
  },
  updatePlace ({ commit }, { id, data }) {
    return apolloClient
      .mutate({
        mutation: UPDATE_PLACE_MUTATION,
        variables: {
          id: id,
          data: data
        }
      })
      .then(data => data.data.updatePlace)
      .then(place => {
        commit('SET_PLACE_DATA', place)

        if (!place.is_active) {
          commit('SET_SELECTED', null)
        }
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
