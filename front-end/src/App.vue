<template>
  <div id="app">
    <div v-if="isValid && isValidRoute">
      <AppSidebar v-if="this.$store.getters.window.width > 959"/>
      <AppSidebarMobile v-if="this.$store.getters.window.width < 960"/>
      <AppHeader v-if="this.$store.getters.window.width > 959"/>
      <AppHeaderMobile v-if="this.$store.getters.window.width < 960"/>

      <router-view class="app__router" v-bind:class="{ 'app--absolute' : isRouteMap }"></router-view>
    </div>
    <router-view v-else/>
  </div>
</template>

<script>
import AppHeader from "./components/layout/AppHeader";
import AppSidebar from "./components/layout/AppSidebar";
import AppHeaderMobile from "./components/layout/AppHeaderMobile";
import AppSidebarMobile from "./components/layout/AppSidebarMobile";
import Auth from "./components/modals/Auth";

export default {
  name: "App",
  components: {
    AppHeader,
    AppHeaderMobile,
    AppSidebar,
    AppSidebarMobile,
    Auth
  },
  computed: {
    isValid: function() {
      return this.$store.getters.userInfo.isValid;
    },
    isValidRoute: function() {
      const paths = ["/", "/Auth", "/Terms", "/dTm6Gz", "/404"];
      return paths.indexOf(this.$route.path) > -1 ? false : true;
    },
    isRouteMap: function() {
      return this.$route.path == "/Map";
    }
  },
  created() {
    this.$store.dispatch("updateWindowWidthAndHeight", {
      width: window.innerWidth,
      height: window.innerHeight
    });
  },
  mounted() {
    if (!this.isValid) {
      this.$router.push("/Auth");
    }

    window.onresize = () => {
      this.$store.dispatch("updateWindowWidthAndHeight", {
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
  }
};
</script>

<style lang="scss">
@import "main";
</style>
