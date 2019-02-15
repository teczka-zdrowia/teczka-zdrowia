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
      const paths = ["/", "/Auth", "/Terms", "/dTm6Gz"];
      return paths.indexOf(this.$route.path) > -1 ? false : true;
    },
    isRouteMap: function() {
      return this.$route.path == "/Map";
    }
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

html,
body {
  overscroll-behavior-y: contain;
}

*:focus {
  outline: none;
}

body {
  background: $background;
  font-family: $primrary-font;
}

input {
  border: 0;
  padding: 0;
  margin: 0;
  display: block;
}

.block--blur {
  filter: blur(4px);
  pointer-events: none;
}

a {
  text-decoration: none;
  color: #444444;
}

.a--light {
  color: #fafafa;
}

.a--light:hover {
  text-decoration: underline;
}

.a--light:visited {
  color: #fafafa;
}

button {
  border: 0;
  display: block;
}

.app__router {
  position: absolute;
  left: 5em;
  padding: 4em;
  width: calc(100% - 13em);
  min-height: calc(100% - 14em);
  height: auto;
  background: linear-gradient(to bottom right, $background, $background-light);
}

.input--double-container {
  display: flex;
  border-bottom: 0.5px solid rgba(145, 145, 156, 0.3);
}

@media only screen and (max-width: 960px) {
  .app {
    width: 100vw;
  }
  .app__router {
    left: 0;
    padding: 0.5rem;
    padding-top: 5.5rem;
    width: calc(100% - 1rem);
    height: auto;
    overflow: hidden;
    &.app--absolute {
      height: calc(100vh - 6rem);
      padding: 0;
    }
  }
}
</style>
