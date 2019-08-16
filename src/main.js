import Vue from 'vue'
import App from './App'
import router from './router'
import apolloProvider from './apollo'
import Toasted from 'vue-toasted'
import { store } from './store'
import './registerServiceWorker'

Vue.use(Toasted, {
  iconPack: 'fontawesome',
  position: 'bottom-right',
  duration: 1500
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  apolloProvider,
  render: h => h(App)
})

window.Vue = Vue
