// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Toasted from 'vue-toasted'
import { store } from './store'
import { api } from './api'

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
  api,
  components: { App },
  template: '<App/>'
})

window.Vue = Vue
