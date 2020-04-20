<template>
  <div id="app">
    <div v-if="isAppRoute">
      <AppSidebar v-if="!isMobile && isUserLoggedIn"/>
      <AppSidebarMobile v-if="isMobile && isUserLoggedIn"/>
      <AppHeader v-if="!isMobile && isUserLoggedIn"/>
      <AppHeaderMobile v-if="isMobile && isUserLoggedIn"/>

      <transition name="fade">
        <div
          class="app__payment-info"
          v-if="!isPaymentValid && routeRequiresDoctorPermissions"
        ><span
          class="fas fa-exclamation-circle"
          aria-hidden="true"
        /> Plan nieaktywny
        </div>
      </transition>

      <transition name="fade">
        <router-view
          class="app__router"
          v-bind:class="{ 'app--absolute' : isRouteMap }"
        />
      </transition>
    </div>
    <router-view v-else/>
    <Modal/>
  </div>
</template>

<script>
import AppHeader from './components/layout/AppHeader'
import AppSidebar from './components/layout/AppSidebar'
import AppHeaderMobile from './components/layout/AppHeaderMobile'
import AppSidebarMobile from './components/layout/AppSidebarMobile'
import Modal from './components/modal'

import { mapActions, mapGetters } from 'vuex'

import './main.scss'

export default {
  name: 'App',
  components: {
    AppHeader,
    AppHeaderMobile,
    AppSidebar,
    AppSidebarMobile,
    Modal
  },
  methods: {
    ...mapActions({
      updateWindowWidthAndHeight: 'window/updateWidthAndHeight',
      getAutheticatedUserData: 'userInfo/getData'
    }),
    updateWindowDimensions: function () {
      this.updateWindowWidthAndHeight({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }
  },
  computed: {
    ...mapGetters({
      isMobile: 'window/isMobile',
      isModalVisible: 'modal/visible',
      isUserLoggedIn: 'userInfo/isLoggedIn',
      isPaymentValid: 'userInfo/isPaymentValid'
    }),
    isAppRoute: function () {
      const paths = ['/', '/auth', '/terms', '/dtm6gz', '/404', '/initialize']
      const routePath = this.$route.path.toLowerCase()
      return !(paths.indexOf(routePath) > -1)
    },
    isRouteMap: function () {
      const routePath = this.$route.path.toLowerCase()
      return routePath == '/map'
    },
    routeRequiresDoctorPermissions: function () {
      return !!this.$route.meta.requiresDoctorPermissions
    }
  },
  created () {
    this.updateWindowDimensions()
  },
  mounted () {
    window.onresize = () => this.updateWindowDimensions()

    if (this.isUserLoggedIn) {
      this.getAutheticatedUserData().catch(error => {
        console.error(error)
        this.$toasted.error('Wystąpił błąd')
        this.$router.push({name: 'Auth'})
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .app {
    &__payment-info {
      position: fixed;
      bottom: 0;
      width: 100%;
      padding: 1rem;
      text-align: center;
      font-weight: 600;
      color: #67676e;
      box-shadow: 0 0 20px 0px rgba(213, 213, 213, 0.3);
      background: #eeeef3;
      z-index: 10000;
    }
  }
</style>
