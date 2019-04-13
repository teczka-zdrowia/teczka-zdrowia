const state = [
  {
    doctor: {
      img:
        'https://www.mendeley.com/careers/getasset/c475b7c0-d36c-4c73-be33-a34030b6ca82/',
      name: 'Jan Iksiński',
      spec: 'psycholog',
      phone: '123 456 789'
    },
    date: '16.10.2018',
    time: '18:30',
    place: 'Medmax Warszawa',
    desc: 'Ból klatki piersiowej',
    isAccepted: false
  },
  {
    doctor: {
      img:
        'https://www.mendeley.com/careers/getasset/c475b7c0-d36c-4c73-be33-a34030b6ca82/',
      name: 'Jan Iksiński',
      spec: 'psycholog',
      phone: '123 456 789'
    },
    date: '16.10.2018',
    time: '18:30',
    place: 'Medmax Warszawa',
    desc: 'Ból klatki piersiowej',
    isAccepted: true
  },
  {
    doctor: {
      img:
        'https://www.mendeley.com/careers/getasset/c475b7c0-d36c-4c73-be33-a34030b6ca82/',
      name: 'Jan Iksiński',
      spec: 'psycholog',
      phone: '123 456 789'
    },
    date: '16.10.2018',
    time: '18:31',
    place: 'Medmax Warszawa',
    desc: 'Ból klatki piersiowej',
    isAccepted: null
  },
  {
    doctor: {
      img:
        'https://www.mendeley.com/careers/getasset/c475b7c0-d36c-4c73-be33-a34030b6ca82/',
      name: 'Jan Iksiński',
      spec: 'psycholog',
      phone: '123 456 789'
    },
    date: '16.10.2018',
    time: '18:32',
    place: 'Medmax Warszawa',
    desc: 'Ból klatki piersiowej',
    isAccepted: false
  },
  {
    doctor: {
      img:
        'https://www.mendeley.com/careers/getasset/c475b7c0-d36c-4c73-be33-a34030b6ca82/',
      name: 'Jan Iksiński',
      spec: 'psycholog',
      phone: '123 456 789'
    },
    date: '16.10.2018',
    time: '18:33',
    place: 'Medmax Warszawa',
    desc: 'Ból klatki piersiowej',
    isAccepted: true
  }
]

const mutations = {}

const actions = {}

const getters = {
  all (state) {
    return state
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
