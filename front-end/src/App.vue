<template>
  <div id="app">
    <div v-if="isValid && isValidRoute">
      <AppSidebar></AppSidebar>
      <AppHeader/>
      <div class="app__router">
        <router-view/>
      </div>
    </div>
    <router-view v-else/>
  </div>
</template>

<script>
import AppHeader from "./components/layout/AppHeader";
import AppSidebar from "./components/layout/AppSidebar";
import Auth from "./components/modals/Auth";

export default {
  name: "App",
  components: {
    AppHeader: AppHeader,
    AppSidebar: AppSidebar,
    Auth: Auth
  },
  computed: {
    isValid: function() {
      return this.$store.getters.userInfo.isValid;
    },
    isValidRoute: function() {
      const paths = ["/", "/Auth", "/Terms"];
      return paths.indexOf(this.$route.path) > -1 ? false : true;
    }
  },
  mounted() {
    if (!this.isValid) {
      this.$router.push("/Auth");
    }
  }
};
</script>

<style lang="scss">
@import "main";

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
  height: calc(100% - 14em);
  background: linear-gradient(to bottom right, $background, $background-light);
}

.input--double-container {
  display: flex;
  border-bottom: 0.5px solid rgba(145, 145, 156, 0.3);
}

@media only screen and (max-width: 900px) {
  .sidebar,
  .header {
    display: none !important;
  }
  .app__router {
    left: 0;
    padding: 2em;
    width: calc(100% - 4em);
  }
}
</style>
