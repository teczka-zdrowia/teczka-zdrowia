<template>
  <form class="login" @submit.prevent="login">
    <div>
      <MainInput class="many">
        Login
        <input
          type="text"
          name="login"
          minlength="3"
          v-model="data.login"
          placeholder="jankowalski"
          required
        >
      </MainInput>
      <MainInput class="many">
        Hasło
        <input
          type="password"
          name="password"
          minlength="6"
          v-model="data.password"
          placeholder="••••••••••••••••"
          required
        >
      </MainInput>
    </div>
    <div class="login__options">
      <div class="login__remember">
        <input v-model="isRememberMe" type="checkbox" id="rememberMe">
        <label for="rememberMe" class="checkbox--login__remember"></label>
        <p>Zapamiętaj mnie</p>
      </div>
      <a class="login__forgot" href="#">Przypomnij hasło</a>
    </div>
    <slot></slot>
  </form>
</template>

<script>
import MainInput from "../../components/ui/basic/MainInput";
import MainBtn from "../../components/ui/basic/MainBtn";

export default {
  name: "Login",
  data: function() {
    return {
      isRememberMe: false,
      data: {
        login: "",
        password: ""
      }
    };
  },
  components: {
    MainInput: MainInput,
    MainBtn: MainBtn
  },
  methods: {
    login: function() {
      const credentials = {
        login: this.data.login,
        password: this.data.password
      };
      const status = this.$store.dispatch(
        "loginWithUsernameAndPassword",
        credentials
      );
      status.then(response => {
        if (response !== false) {
          this.$toasted.success("Pomyślnie zalogowano", {
            icon: "check",
            onComplete: () => {
              this.$router.push("/Dashboard");
            }
          });
        } else {
          this.$toasted.error("Błędne dane logowania", {
            icon: "times"
          });
        }
      });
    }
  },
  watch: {
    formValid: function(val) {
      this.$store.dispatch("updateLoginAuthData", {
        type: "isAllFieldsFilled",
        data: val
      });
    }
  },
  computed: {
    formValid: function() {
      return !Object.keys(this.data).some(key => this.data[key].length < 6);
    }
  }
};
</script>

<style lang="scss">
</style>