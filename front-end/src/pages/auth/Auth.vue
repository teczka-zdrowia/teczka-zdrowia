<template>
  <div class="auth">
    <div class="auth__image">
      <img src="static/img/login_bg.jpg" class="center--absolute">
      <div class="auth__background"></div>
      <div class="auth__logo">
        <i class="fas fa-briefcase-medical"></i>
        Teczka
        <span>Zdrowia</span>
      </div>
    </div>
    <div class="auth__container">
      <div class="auth__content">
        <p class="auth__title">{{ title }}</p>
        <Login v-if="isLogin">
          <div class="login__actions">
            <MainBtn type="submit">Zaloguj się</MainBtn>
            <button class="btn--create" v-on:click="toggleLogin()">
              Rejestracja
              <i class="fas fa-long-arrow-alt-right"></i>
            </button>
          </div>
        </Login>
        <Signup v-else>
          <div class="login__actions">
            <MainBtn type="submit">Zarejestruj</MainBtn>
            <button class="btn--create" v-on:click="toggleLogin()">
              Logowanie
              <i class="fas fa-long-arrow-alt-right"></i>
            </button>
          </div>
        </Signup>
      </div>
    </div>
  </div>
</template>

<script>
import Login from "./Login";
import Signup from "./Signup";
import MainBtn from "../../components/ui/MainBtn";

export default {
  name: "Auth",
  data: function() {
    return {
      title: "Logowanie",
      isLogin: true
    };
  },
  components: {
    Login: Login,
    Signup: Signup,
    MainBtn: MainBtn
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
  .auth__image {
    width: calc(100% - 30em);
    height: 100%;
    position: relative;
    overflow: hidden;
    img {
      position: absolute;
      width: auto;
      height: 100%;
      z-index: 3;
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
      color: #fafafa;
      font-size: 2em;
      top: 5%;
      left: 5%;
      display: flex;
      vertical-align: middle;
      i {
        margin-right: 0.5em;
      }
      span {
        font-weight: 600;
        margin-left: 10px;
      }
    }
  }
  .auth__container {
    width: 30em;
    height: 100%;
    box-shadow: 0 0 20px 0px $lightgrey;
    overflow: auto;
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
      .login__actions {
        width: 100%;
        button {
          width: 45%;
          height: 3em;
          cursor: pointer;
          display: inline;
        }
        .btn--create {
          border: 0;
          transition: 0.2s ease-in-out;
          border-radius: 0.5em;
          float: right;
          border-radius: 0.25em;
          padding: 0.5em 1.5em;
          background: none;
          color: #1a1b37;
          font-weight: 600;
          &:hover {
            background: #e2e2ea;
          }
          i {
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
        .login__remember {
          display: flex;
          input {
            display: none;
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
              color: #1a1b37;
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
      }
    }
  }
}
</style>
