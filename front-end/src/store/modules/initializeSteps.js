import Hello from '@/pages/initialize/Hello'
import CreatePlace from '@/pages/initialize/CreatePlace'

const state = {
  selectedStep: 0,
  steps: [
    {
      id: 0,
      name: 'Powitanie',
      completed: true,
      component: Hello
    },
    {
      id: 1,
      name: 'Gabinet',
      completed: false,
      component: CreatePlace
    },
    {
      id: 2,
      name: 'Pacjenci',
      completed: false,
      component: {
        template: '<div></div>'
      }
    }
  ]
}

const mutations = {
  UPDATE_SELECTED_STEP (state, id) {
    state.selectedStep = id
  },
  SET_COMPLETED_STEP (state, id) {
    state.steps[id].completed = true
  }
}

const actions = {
  select ({ commit }, id) {
    const selectPreviousStep = id < state.steps[state.selectedStep].id
    const nextStep = state.steps[id - 1]
    const canSelectNextStep = nextStep ? nextStep.completed : false
    if (selectPreviousStep || canSelectNextStep) {
      commit('UPDATE_SELECTED_STEP', id)
    }
  },
  complete ({ commit }, id) {
    commit('SET_COMPLETED_STEP', id)
  }
}

const getters = {
  selectedComponent (state) {
    return state.steps[state.selectedStep].component
  },
  selected (state) {
    return state.selectedStep
  },
  list (state) {
    return state.steps
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
