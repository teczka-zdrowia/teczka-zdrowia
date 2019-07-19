<template>
  <div class="auth">
    <div class="auth__header">
      <Logo />
    </div>
    <div class="auth__image">
      <img
        src="static/img/login_bg.jpg"
        class="center--absolute"
      >
      <div class="auth__background"></div>
      <Logo class="auth__logo" />
    </div>
    <div class="auth__container">
      <div class="auth__content">
        <p class="auth__title">{{ title }}</p>
        <Login
          v-if="isLogin"
          v-on:loading="isLoading.login = $event"
        >
          <div class="login__actions">
            <MainBtn
              type="submit"
              :loading="isLoading.login"
              :disabled="isLoading.login"
            >Zaloguj się</MainBtn>
            <button
              class="btn--signup"
              v-on:click="toggleLogin()"
            >
              Rejestracja
              <span
                aria-hidden="true"
                class="fas fa-long-arrow-alt-right"
              />
            </button>
          </div>
        </Login>
        <Signup
          v-else
          v-on:loading="isLoading.signup = $event"
        >
          <div class="login__actions">
            <MainBtn
              type="submit"
              :loading="isLoading.signup"
              :disabled="isLoading.signup"
            >Zarejestruj</MainBtn>
            <button
              class="btn--signup"
              v-on:click="toggleLogin()"
            >
              Logowanie
              <span
                aria-hidden="true"
                class="fas fa-long-arrow-alt-right"
              />
            </button>
          </div>
        </Signup>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from "../../components/ui/basic/logo/Logo";
import Login from "./Login";
import Signup from "./Signup";
import MainBtn from "../../components/ui/basic/MainBtn";

export default {
  name: "Auth",
  data: function() {
    return {
      title: "Logowanie",
      isLogin: true,
      isLoading: {
        login: false,
        signup: false
      }
    };
  },
  components: {
    Login,
    Signup,
    MainBtn,
    Logo
  },
  methods: {
    toggleLogin: function() {
      this.isLogin = !this.isLogin;
      this.title = this.title == "Logowanie" ? "Rejestracja" : "Logowanie";
    }
  }
};
</script>

<style lang="scss">
@import "../../main";

.auth {
  display: flex;
  width: 100vw;
  height: 100vh;
  position: relative;
  @media (max-width: 1024px) {
    .auth__image {
      display: none;
    }
    .auth__container {
      margin: auto;
      width: 100% !important;
    }
  }
}

.auth__image {
  width: calc(100% - 30em);
  height: 100%;
  position: relative;
  overflow: hidden;
  img {
    position: absolute;
    object-fit: cover;
    width: 100%;
    height: 100%;
    z-index: 3;
  }
}

.auth__background {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 5;
  background: $darkviolet;
  background: linear-gradient(to right, $lightviolet, $darkviolet);
  opacity: 0.85;
}
.auth__logo {
  position: absolute;
  z-index: 15;
  top: 5%;
  left: 5%;
}

.auth__container {
  width: 30em;
  height: 100%;
  box-shadow: 0 0 20px 0px $lightgrey;
  overflow: auto;
}

.auth__content {
  width: 80%;
  position: relative;
  margin: auto;
  padding: 5% 0;
  .auth__title {
    color: #1a1b37;
    font-size: 2em;
    font-weight: 600;
  }
}

.login__actions {
  width: 100%;
  height: 3em;
  display: flex;
  justify-content: space-between;
  button,
  .button {
    padding: 1em;
    width: 100% !important;
    height: auto;
    display: inline;
    &:first-child {
      margin-right: 10%;
    }
  }
  .btn--signup {
    cursor: pointer;
    border: 0;
    transition: 0.2s ease-in-out;
    border-radius: 0.25rem;
    background: none;
    color: #1a1b37;
    font-weight: 600;
    &:hover {
      background: #e2e2ea;
    }
    span {
      margin-left: 0.75em;
    }
  }
}

.login__options {
  width: 100%;
  display: flex;
  margin: 2em 0;
  & > * {
    width: auto;
  }
}

.login__remember {
  display: flex;
  & > input {
    display: none !important;
  }
  .checkbox--login__remember {
    height: 1em;
    width: 1em;
    border-radius: 0.2em;
    border: 2px solid #1a1b37;
    margin-right: 0.5em;
    cursor: pointer;
    transition: 0.2s ease-in-out;
  }
  input:checked + label {
    background: $darkviolet;
    border: 2px solid $darkviolet;
    &:after {
      content: "";
      font-family: $font-awesome;
      font-weight: 600;
      font-size: 0.7em;
      color: #fafafa;
      height: 100%;
      @extend %text--center;
    }
  }
  p {
    margin: 0;
    margin-top: 1px;
    font-weight: 550;
    color: #91919c;
    a {
      color: #91919c;
      text-decoration: underline;
      font-weight: 600;
      transition: 0.2s ease-in-out;
    }
  }
}
.login__forgot {
  text-align: right;
  transition: 0.2s ease-in-out;
  font-weight: 600;
  margin-left: auto;
  color: #91919c;
  &:hover {
    color: #1a1b37;
  }
}

.auth__header {
  @extend %text--center;
  display: none;
  padding: 1rem;
  height: 3rem;
  width: calc(100% - 2rem);
  background: #fafafa;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 1000;
  box-shadow: 0 0 20px 0px rgba(213, 213, 213, 0.3);
  .logo {
    @extend %text--center;
    font-size: 1.5em !important;
    color: $darkviolet !important;
  }
}

@media only screen and (max-width: 1024px) {
  .auth {
    display: block;
  }
  .auth__content {
    width: calc(100% - 1rem);
    padding-top: 7rem;
  }
  .auth__title {
    margin-top: 0;
    text-align: center;
  }
  .login__actions {
    display: block;
    button {
      margin-bottom: 1em;
    }
  }

  .auth__header {
    display: flex;
  }
}

@media only screen and (max-width: 375px) {
  .login__forgot {
    position: absolute;
    bottom: -7rem;
    margin-bottom: 1.5rem;
    text-align: center;
    width: 100%;
  }
}
</style>
