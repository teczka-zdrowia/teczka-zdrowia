import { apolloClient } from '@/apollo'
import { PLACE_EMPLOYEES_QUERY } from '@/graphql/queries/_index'
import {
  CREATE_ROLE_MUTATION,
  UPDATE_ROLE_MUTATION,
  DELETE_ROLE_MUTATION
} from '@/graphql/mutations/_index'

const state = {
  data: []
}

const mutations = {
  SET_DATA (state, data) {
    state.data = data
  },
  ADD_DATA (state, data) {
    state.data.push(data)
  },
  UPDATE_LOCAL (state, data) {
    const foundIndex = state.data.findIndex(role => role.id === data.id)
    state.data[foundIndex] = Object.assign(state.data[foundIndex], data)
  },
  DELETE_DATA (state, data) {
    const filteredData = state.data.filter(employee => employee.id !== data.id)
    state.data = filteredData
  }
}

const actions = {
  get ({commit}, id) {
    return apolloClient
      .query({
        query: PLACE_EMPLOYEES_QUERY,
        variables: {
          id: id
        }
      })
      .then(data => data.data.place.employees)
      .then(employees => {
        commit('SET_DATA', employees)
      })
  },
  createRole ({commit}, {userId, placeId, permissionType}) {
    return apolloClient
      .mutate({
        mutation: CREATE_ROLE_MUTATION,
        variables: {
          data: {
            user_id: userId,
            place_id: placeId,
            permission_type: permissionType
          }
        }
      })
      .then(data => data.data.createRole)
      .then(role => {
        if (role) {
          role = Object.assign(role, {
            permission_type: permissionType,
            is_active: true
          })
          commit('ADD_DATA', role)
        } else {
          throw new Error('Role exists')
        }
      })
  },
  updateRole ({commit}, {id, data}) {
    return apolloClient
      .mutate({
        mutation: UPDATE_ROLE_MUTATION,
        variables: {
          id: id,
          data: data
        }
      })
      .then(data => data.data.updateRole)
      .then(role => {
        commit('UPDATE_LOCAL', role)
      })
  },
  deleteRole ({commit}, id) {
    return apolloClient
      .mutate({
        mutation: DELETE_ROLE_MUTATION,
        variables: {
          id: id
        }
      })
      .then(data => data.data.deleteRole)
      .then(role => {
        commit('DELETE_DATA', role)
      })
  }
}

const getters = {
  list (state) {
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
