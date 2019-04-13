const state = {
  list: [
    {
      id: 1,
      title: 'Witamina C',
      info: '5mg • 2x dziennie',
      days: 16,
      isActive: true
    },
    {
      id: 10,
      title: 'Sport',
      info: '2h tygodniowo',
      days: 9,
      isActive: true
    },
    {
      id: 66,
      title: 'Witamina D',
      info: '60 tabletek',
      days: false,
      isActive: true
    },
    {
      id: 92,
      title: 'Witamina D',
      info: '600 tabletek',
      days: false,
      isActive: false
    }
  ]
}

const getters = {
  active (state) {
    return state.list.filter(prescription => prescription.isActive)
  },
  all (state) {
    return state.list
  }
}

export default {
  namespaced: true,
  state,
  getters
}
