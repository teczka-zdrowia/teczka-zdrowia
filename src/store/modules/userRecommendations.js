import { apolloClient } from '@/apollo'
import { ME_RECOMMENDATIONS_QUERY } from '@/graphql/queries/_index'
import { UPDATE_RECOMMENDATION_MUTATION } from '@/graphql/mutations/_index'

const state = {
  paginatorInfo: {
    hasMorePages: false,
    currentPage: 1
  },
  data: []
}

const mutations = {
  SET_DATA (state, data) {
    state = Object.assign(state, data)
  },
  DELETE_LOCAL (state, id) {
    const filteredData = state.data.filter(function (recommendation) {
      return recommendation.id !== id
    })

    state.data = filteredData
  }
}

const actions = {
  get ({commit}, {page, count}) {
    return apolloClient
      .query({
        query: ME_RECOMMENDATIONS_QUERY,
        variables: {
          page: page,
          count: count
        }
      })
      .then(data => data.data.me.recommendations)
      .then(recommendations => {
        commit('SET_DATA', recommendations)
      })
  },
  update ({commit}, {data, id}) {
    return apolloClient
      .mutate({
        mutation: UPDATE_RECOMMENDATION_MUTATION,
        variables: {
          id: id,
          data: data
        }
      })
      .then(data => data.data.updateRecommendation)
      .then(recommendation => {
        commit('DELETE_LOCAL', recommendation.id)
      })
  }
}

const getters = {
  paginatorInfo (state) {
    return state.paginatorInfo
  },
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
