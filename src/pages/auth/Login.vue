<template>
  <form
    class="login"
    name="login"
    @submit.prevent="login"
  >
    <div>
      <MainInput class="many">
        E-mail
        <input
          type="email"
          name="username"
          minlength="4"
          maxlength="100"
          v-model="data.username"
          placeholder="jan@kowalski.com"
          required
        >
      </MainInput>
      <MainInput class="many">
        Hasło
        <input
          type="password"
          name="password"
          minlength="8"
          v-model="data.password"
          placeholder="••••••••••••••••"
          required
        >
      </MainInput>
    </div>
    <slot></slot>
  </form>
</template>

<script>
import MainInput from "../../components/ui/basic/MainInput";
import MainBtn from "../../components/ui/basic/MainBtn";
import { mapActions } from "vuex";
import gql from "graphql-tag";

export default {
  name: "Login",
  data: function() {
    return {
      isRememberMe: false,
      data: {
        username: "",
        password: ""
      }
    };
  },
  components: {
    MainInput: MainInput,
    MainBtn: MainBtn
  },
  methods: {
    ...mapActions({
      userLogin: "userInfo/login",
      getAutheticatedUserData: "userInfo/getData"
    }),
    login: function() {
      this.$emit("loading", true);
      this.userLogin(this.data)
        .then(() => {
          this.getAutheticatedUserData();
        })
        .then(() => {
          this.$toasted.success("Pomyślnie zalogowano");
          window.location.href = "/Dashboard";
        })
        .catch(error => {
          const graphQLErrors = error.graphQLErrors;
          const validation = graphQLErrors
            ? graphQLErrors[0].extensions.validation
            : null;
          const errorMessage = validation
            ? validation[Object.keys(validation)[0]][0]
            : "Niepoprawne dane logowania";
          this.$toasted.error(errorMessage);
          console.error(error);
        })
        .finally(() => {
          this.$emit("loading", false);
        });
    }
  }
};
</script>

<style lang="scss">
</style>
