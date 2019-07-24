import { apolloClient } from '@/apollo'
import { PLACE_EMPLOYEES_QUERY } from './queries/_index'
import { CREATE_ROLE_MUTATION } from './mutations/_index'

const state = {
  list: []
}

const mutations = {
  SET_DATA (state, data) {
    state.list = data
  },
  ADD_DATA (state, data) {
    state.list.push(data)
  }
}

const actions = {
  get ({ commit }, id) {
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
  createRole ({ commit }, { userId, placeId, permissionType }) {
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
      .then(createRole => {
        if (createRole) {
          createRole = Object.assign(createRole, {
            permission_type: permissionType,
            is_active: true
          })
          commit('ADD_DATA', createRole)
        } else {
          throw new Error('Role exists')
        }
      })
  }
}

const getters = {
  list (state) {
    return state.list
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
