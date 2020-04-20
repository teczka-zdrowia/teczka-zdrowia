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
  select ({commit}, id) {
    const selectPreviousStep = id < state.steps[state.selectedStep].id
    const nextStep = state.steps[id - 1]
    const canSelectNextStep = nextStep ? nextStep.completed : false
    if (selectPreviousStep || canSelectNextStep) {
      commit('UPDATE_SELECTED_STEP', id)
    }
  },
  complete ({commit}) {
    commit('SET_COMPLETED_STEP', state.selectedStep)
  },
  next ({commit}) {
    commit('UPDATE_SELECTED_STEP', state.selectedStep + 1)
  }
}

const getters = {
  getSelectedComponent (state) {
    return state.steps[state.selectedStep].component
  },
  getSelected (state) {
    return state.selectedStep
  },
  getList (state) {
    return state.steps
  },
  isSelectedCompleted (state) {
    return state.steps[state.selectedStep].completed
  },
  isLastStep (state) {
    return state.selectedStep + 1 === state.steps.length
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
