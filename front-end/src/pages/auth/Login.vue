<template>
  <form
    class="login"
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
    <div class="login__options">
      <div class="login__remember">
        <input
          v-model="isRememberMe"
          type="checkbox"
          id="rememberMe"
        >
        <label
          for="rememberMe"
          class="checkbox--login__remember"
        ></label>
        <p>Zapamiętaj mnie</p>
      </div>
      <a
        class="login__forgot"
        href="#"
      >Przypomnij hasło</a>
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
      isLoading: false,
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
      this.isLoading = true;
      this.userLogin(this.data)
        .then(() => {
          this.getAutheticatedUserData();
        })
        .then(() => {
          this.$toasted.success("Poprawnie zalogowano");
          this.$router.push("/Dashboard");
        })
        .catch(error => {
          this.$toasted.error("Niepoprawne dane logowania");
          console.error(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    }
  }
};
</script>

<style lang="scss">
</style>