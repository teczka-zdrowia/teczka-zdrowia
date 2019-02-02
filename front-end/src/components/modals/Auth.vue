<template>
  <div class="main">
    <div class="modal--login">
      <div class="login__top">
        <img src="static/img/login_bg.jpg">
        <div class="background--login__top"></div>
        <p>{{title}}</p>
      </div>
      <div class="login__container">
        <form id="login" v-if="isLogin" @submit.prevent="loginUser">
          <div class="login__row">
            <label>Login</label>
            <input type="text" name="login" v-model="data.login" placeholder="jankowalski" required>
          </div>
          <div class="login__row">
            <label>Hasło</label>
            <input
              type="password"
              name="password"
              v-model="data.password"
              placeholder="••••••••••••••••"
              required
            >
          </div>
          <div class="login__options">
            <div class="login__remember">
              <input v-model="isRememberMe" type="checkbox" id="rememberMe">
              <label for="rememberMe" class="checkbox--login__remember"></label>
              <p>Zapamiętaj mnie</p>
            </div>
            <a class="login__forgot" href="#">Przypomnij hasło</a>
          </div>
          <div class="login__actions">
            <button class="btn--login" type="submit">Zaloguj się</button>
            <button class="btn--create" v-on:click="toggleLogin()">
              Utwórz konto
              <i class="fas fa-long-arrow-alt-right"></i>
            </button>
          </div>
        </form>
        <form id="register" v-if="!isLogin" @submit.prevent="signupUser">
          <div class="login__row--inline">
            <div class="login__row login__row--small">
              <label>Imię</label>
              <input type="text" name="name" v-model="data.name" placeholder="Jan" required>
            </div>
            <div class="login__row login__row--small">
              <label>Nazwisko</label>
              <input
                type="text"
                name="surname"
                v-model="data.surname"
                placeholder="Kowalski"
                required
              >
            </div>
          </div>
          <div class="login__row">
            <label>Login</label>
            <input type="text" name="login" v-model="data.login" placeholder="jankowalski" required>
          </div>
          <div class="login__row">
            <label>Hasło</label>
            <input
              name="password"
              type="password"
              minlength="6"
              v-model="data.password"
              placeholder="••••••••••••••••"
              required
            >
          </div>
          <div class="login__row">
            <label>PESEL</label>
            <input
              type="number"
              name="pesel"
              v-model="data.pesel"
              placeholder="12345678912"
              maxlength="15"
              required
            >
            <div
              v-if="isPeselCorrect"
              title="PESEL poprawny"
              class="login__row__about login__row__correct"
            ></div>
            <div
              v-if="!isPeselCorrect && isPeselCorrect != null"
              title="PESEL niepoprawny"
              class="login__row__about login__row__incorrect"
            ></div>
            <div
              v-if="isPeselCorrect == null"
              title="PESEL służy powiązaniu Ciebie z Twoją kartoteką"
              class="login__row__about login__row__info"
            ></div>
          </div>
          <div class="login__row">
            <label>Data urodzenia</label>
            <input
              type="date"
              name="birthdate"
              v-model="data.birthdate"
              class="login__birthdate"
              required
            >
          </div>
          <div class="login__row">
            <label>E-mail</label>
            <input
              type="email"
              name="email"
              v-model="data.email"
              placeholder="jan@kowalski.com"
              required
            >
          </div>
          <div class="login__row">
            <label>Nr tel.</label>
            <input
              type="tel"
              name="phone"
              v-model="data.phone"
              placeholder="123654789"
              maxlength="15"
              required
            >
          </div>
          <div class="login__options">
            <div class="login__remember">
              <input v-model="isTermsAccepted" type="checkbox" id="remember" required>
              <label for="remember" class="checkbox--login__remember"></label>
              <p>
                Akceptuję
                <a href="#">regulamin</a>
              </p>
            </div>
          </div>
          <div class="login__actions">
            <button class="btn--login" type="submit">Zarejestruj się</button>
            <button class="btn--create" v-on:click="toggleLogin()">
              Logowanie
              <i class="fas fa-long-arrow-alt-right"></i>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Auth",
  data: function() {
    return {
      title: "LOGOWANIE",
      isLogin: true,
      isPeselCorrect: null,
      isRememberMe: false,
      isTermsAccepted: false,
      data: {
        login: "",
        password: "",
        name: "",
        surname: "",
        pesel: "",
        email: "",
        phone: "",
        birthdate: ""
      }
    };
  },
  watch: {
    "data.pesel": function(val) {
      this.isPeselCorrect = this.validatePesel(val);
    }
  },
  methods: {
    validatePesel: function(pesel) {
      var reg = /^[0-9]{11}$/;
      if (reg.test(pesel) == false) return false;
      else {
        var digits = ("" + pesel).split("");
        if (
          parseInt(pesel.substring(4, 6)) > 31 ||
          parseInt(pesel.substring(2, 4)) > 12
        )
          return false;

        var checksum =
          (1 * parseInt(digits[0]) +
            3 * parseInt(digits[1]) +
            7 * parseInt(digits[2]) +
            9 * parseInt(digits[3]) +
            1 * parseInt(digits[4]) +
            3 * parseInt(digits[5]) +
            7 * parseInt(digits[6]) +
            9 * parseInt(digits[7]) +
            1 * parseInt(digits[8]) +
            3 * parseInt(digits[9])) %
          10;
        if (checksum == 0) checksum = 10;
        checksum = 10 - checksum;

        return parseInt(digits[10]) == checksum;
      }
    },
    getElPosition: function(el) {
      var xPos = 0;
      var yPos = 0;

      while (el) {
        if (el.tagName == "BODY") {
          var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
          var yScroll = el.scrollTop || document.documentElement.scrollTop;

          xPos += el.offsetLeft - xScroll + el.clientLeft;
          yPos += el.offsetTop - yScroll + el.clientTop;
        } else {
          xPos += el.offsetLeft - el.scrollLeft + el.clientLeft;
          yPos += el.offsetTop - el.scrollTop + el.clientTop;
        }

        el = el.offsetParent;
      }
      return {
        x: xPos,
        y: yPos
      };
    },
    correctRelativeMainPosition: function(pos) {
      const main = document.querySelector(".main");
      return pos - main.clientHeight / 2;
    },
    toggleLogin: function() {
      const main = document.querySelector(".main");
      let newPos = this.correctRelativeMainPosition(this.getElPosition(main).y);

      main.style.top = this.isLogin ? `${newPos}px` : "50%";
      main.classList.toggle("main--relative");

      this.isLogin = !this.isLogin;
      this.title = this.title == "LOGOWANIE" ? "REJESTRACJA" : "LOGOWANIE";
    },
    loginUser: function() {
      const loginAPI = "http://localhost/api/auth";
      let loginUrl = `${loginAPI}?login=${this.data.login}&password=${
        this.data.password
      }`;

      fetch(loginUrl, {
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "GET"
      })
        .then(response => {
          return response.json();
        })
        .then(response => {
          if (response.jwt) {
            this.$store.commit("updateJWT", response.jwt);
            this.$toasted.success("Pomyślnie zalogowano", {
              icon: "check",
              onComplete: () => {
                this.$router.push("/Timetable");
              }
            });
          } else {
            this.$toasted.error("Błędne dane logowania", {
              icon: "times"
            });
          }
        })
        .catch(err => console.error(err));
    },
    signupUser: function() {
      if (this.isTermsAccepted) {
        const signupAPI = "http://localhost/api/auth";
        let signupData = JSON.stringify({
          login: this.data.login,
          password: this.data.password,
          name: this.data.name,
          surname: this.data.surname,
          pesel: this.data.pesel,
          email: this.data.email,
          phone: this.data.phone,
          birthdate: this.data.birthdate
        });

        fetch(signupAPI, {
          mode: "cors",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          method: "POST",
          body: signupData
        })
          .then(response => {
            return response.json();
          })
          .then(response => {
            if (response.created == true) {
              this.toggleLogin();
              this.$toasted.success(
                "Pomyślnie zarejestrowano, teraz się zaloguj.",
                {
                  icon: "check"
                }
              );
            } else {
              this.$toasted.error("Wystąpił błąd", {
                icon: "times"
              });
            }
          })
          .catch(err => console.error(err));
      }
    }
  }
};
</script>

<style lang="scss" scoped>
$violet: #6c7ae0;
$violet-darker: #5864b7;
$primrary-light: #fafafa;
$font-awesome: "Font Awesome 5 Free";

%text--center {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: center;
  justify-content: center;
  -ms-flex-align: center;
  align-items: center;
}

%block--rounded {
  border-radius: 0.5em;
  overflow: hidden;
  box-shadow: 0 5px 20px -1px #44444440;
}

%btn--small {
  @extend %text--center;
  @extend %block--rounded;
}

input[type="date"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  display: none;
}

::-webkit-clear-button {
  display: none;
  -webkit-appearance: none;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.main {
  width: 100%;
  height: auto;
  transform: translate(-50%, -50%);
  position: absolute;
  z-index: 100;
  top: 50%;
  left: 50%;
}

.modal--login {
  @extend %block--rounded;
  background: #fafafa;
  width: 40em;
  height: auto;
  margin: auto;
  .login__top {
    @extend %text--center;
    background: $violet;
    width: 100%;
    height: 8em;
    overflow: hidden;
    position: relative;
    p {
      color: $primrary-light;
      font-weight: 700;
      font-size: 1.5em;
      z-index: 10;
    }
    img {
      position: absolute;
      width: 100%;
      height: auto;
    }
    .background--login__top {
      position: absolute;
      width: 100%;
      height: 100%;
      z-index: 5;
      background: rgba(88, 100, 183, 0.8);
    }
  }

  .login__container {
    width: 80%;
    height: auto;
    padding: 10%;
    .login__row {
      width: 100%;
      height: auto;
      display: flex;
      margin-bottom: 1.5em;
      position: relative;
      label {
        @extend %text--center;
        font-size: 1.1em;
        font-weight: 600;
        color: #444;
      }

      input {
        width: 80%;
        margin-left: auto;
        padding: 1em;
        background: #ececec;
        border-radius: 0.5em;
        transition: 0.2s ease-in-out;
        &:focus {
          background: #e4e4e4;
        }
      }
    }
    .login__row--inline {
      display: flex;
      .login__row--small {
        width: 47.5%;
        display: inline-block;
        label,
        input {
          float: left;
        }
        label {
          margin-bottom: 0.5em;
        }
        input {
          width: calc(100% - 2em);
        }
        &:first-child {
          margin-right: 5%;
        }
      }
    }
    #register {
      .login__birthdate {
        width: 60%;
      }

      .login__row__about {
        position: absolute;
        right: 0;
        width: 10%;
        height: 100%;
        font-family: $font-awesome;
        font-weight: 600;
        font-size: 1.2em;
        border-top-right-radius: 0.5em;
        border-bottom-right-radius: 0.5em;
        @extend %text--center;
      }

      .login__row__info {
        background: #d3d3d3;
      }

      .login__row__correct {
        background: #2ecc71;
        color: $primrary-light;
      }

      .login__row__incorrect {
        background: #e74c3c;
        color: $primrary-light;
      }
    }
    .login__options {
      width: calc(2em + 80%);
      margin-left: auto;
      display: flex;
      margin-bottom: 2.5em;
      & > * {
        width: 50%;
        color: #555;
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
          border: 1px solid rgba(0, 0, 0, 0.14);
          margin-right: 0.5em;
          cursor: pointer;
          transition: 0.2s ease-in-out;
        }
        input:checked + label {
          background: #f5f5f5;
          &:after {
            content: "";
            font-family: $font-awesome;
            font-weight: 600;
            font-size: 0.8em;
            color: #27ae60;
            height: 100%;
            @extend %text--center;
          }
        }
        p {
          margin: 0;
          margin-top: 1px;
          a {
            font-weight: 600;
            transition: 0.2s ease-in-out;
            &:hover {
              color: #222;
            }
          }
        }
      }
      .login__forgot {
        text-align: right;
        transition: 0.2s ease-in-out;
        &:hover {
          color: #222;
        }
      }
    }
  }

  .login__actions {
    width: calc(2em + 80%);
    margin-left: auto;
    display: flex;
    justify-content: space-between;
    button {
      border: 0;
      transition: 0.2s ease-in-out;
      padding: 1em;
      border-radius: 0.5em;
      cursor: pointer;
    }
    .btn--login {
      color: $primrary-light;
      background: $violet;
      &:hover {
        background: $violet-darker;
      }
    }
    .btn--create {
      background: none;
      color: #222;
      font-weight: 600;
      &:hover {
        background: #ececec;
      }
      i {
        margin-left: 0.75em;
      }
    }
  }
}

.main--relative {
  position: relative;
  -webkit-transform: translate(-50%, 0);
  transform: translate(-50%, 0);
  margin-bottom: 5em;
}

.hide--none {
  display: none;
}
</style>
