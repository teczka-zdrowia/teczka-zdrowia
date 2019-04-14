<template>
  <div id="app">
    <div v-if="isValid && isValidRoute">
      <AppSidebar v-if="!isMobile" />
      <AppSidebarMobile v-if="isMobile" />
      <AppHeader v-if="!isMobile" />
      <AppHeaderMobile v-if="isMobile" />

      <router-view
        class="app__router"
        v-bind:class="{ 'app--absolute' : isRouteMap }"
      />
    </div>
    <router-view v-else />
    <Modal />
  </div>
</template>

<script>
import AppHeader from "./components/layout/AppHeader";
import AppSidebar from "./components/layout/AppSidebar";
import AppHeaderMobile from "./components/layout/AppHeaderMobile";
import AppSidebarMobile from "./components/layout/AppSidebarMobile";
import Modal from "./components/modal";

import { mapActions, mapGetters } from "vuex";

export default {
  name: "App",
  components: {
    AppHeader,
    AppHeaderMobile,
    AppSidebar,
    AppSidebarMobile,
    Modal
  },
  methods: {
    ...mapActions({
      updateWindowWidthAndHeight: "window/updateWidthAndHeight"
    }),
    updateWindowDimensions: function() {
      this.updateWindowWidthAndHeight({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }
  },
  computed: {
    ...mapGetters({
      isValid: "userInfo/isValid",
      isMobile: "window/isMobile"
    }),
    isValidRoute: function() {
      const paths = ["/", "/Auth", "/Terms", "/dTm6Gz", "/404"];
      return paths.indexOf(this.$route.path) > -1 ? false : true;
    },
    isRouteMap: function() {
      return this.$route.path == "/Map";
    }
  },
  created() {
    this.updateWindowDimensions();
  },
  mounted() {
    if (!this.isValid) {
      this.$router.push("/Auth");
    }

    window.onresize = () => this.updateWindowDimensions();
  }
};
</script>

<style lang="scss">
@import "main";
</style>
