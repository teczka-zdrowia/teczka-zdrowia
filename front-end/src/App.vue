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
      ></router-view>
    </div>
    <router-view v-else />
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
      return this.$store.getters["userInfo/isValid"];
    },
    isValidRoute: function() {
      const paths = ["/", "/Auth", "/Terms", "/dTm6Gz", "/404"];
      return paths.indexOf(this.$route.path) > -1 ? false : true;
    },
    isRouteMap: function() {
      return this.$route.path == "/Map";
    },
    isMobile: function() {
      return this.$store.getters["window/isMobile"];
    }
  },
  created() {
    console.log(this.$store);
    this.$store.dispatch("window/updateWidthAndHeight", {
      width: window.innerWidth,
      height: window.innerHeight
    });
  },
  mounted() {
    if (!this.isValid) {
      this.$router.push("/Auth");
    }

    window.onresize = () => {
      this.$store.dispatch("window/updateWidthAndHeight", {
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
