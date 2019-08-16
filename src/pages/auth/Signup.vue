<template>
  <form
    class="signup"
    name="signup"
    @submit.prevent="signup"
  >
    <div class="login__type">
      <div class="type__top">
        <div class="type__btn">
          <div class="type__title">Wybierz typ konta</div>
        </div>
      </div>
      <div class="type__content">
        <div class="type__el">
          <div
            class="el__btn"
            v-on:click="profileType = 1;"
            v-bind:class="{'selected' : profileType == 1}"
          >
            <div class="el__icon">
              <span
                aria-hidden="true"
                class="fas fa-user"
              />
            </div>
            <div class="el__title">Pacjent</div>
          </div>
          <div
            class="el__info"
            v-on:click="showPatientInfo = !showPatientInfo"
          >
            <span
              aria-hidden="true"
              class="fas fa-question"
            />
          </div>
        </div>
        <div
          class="type__el type__el--info"
          v-if="showPatientInfo"
          v-on:click="showPatientInfo = !showPatientInfo"
        >
          <div>Pełen dostęp do historii wizyt i kartoteki</div>
          <div>BEZPŁATNIE</div>
        </div>
        <div class="type__el">
          <div
            class="el__btn"
            v-on:click="profileType = 2;"
            v-bind:class="{'selected' : profileType == 2}"
          >
            <div class="el__icon">
              <span
                aria-hidden="true"
                class="fas fa-user-md"
              />
            </div>
            <div class="el__title">Specjalista</div>
          </div>
          <div
            class="el__info"
            v-on:click="showSpecInfo = !showSpecInfo"
          >
            <span
              aria-hidden="true"
              class="fas fa-question"
            />
          </div>
        </div>
        <div
          class="type__el type__el--info"
          v-if="showSpecInfo"
          v-on:click="showSpecInfo = !showSpecInfo"
        >
          <div>Pełne zarządzanie gabinetem</div>
          <div>30 DNI BEZPŁATNIE</div>
        </div>
      </div>
    </div>
    <div v-if="profileType != 0">
      <MainInput class="many">
        Imię i nazwisko
        <input
          name="name"
          type="text"
          v-model="data.name"
          placeholder="Jan Kowalski"
          maxlength="100"
          required
        >
      </MainInput>
      <MainInput class="many">
        Hasło
        <input
          name="password"
          type="password"
          minlength="8"
          v-model="data.password"
          placeholder="••••••••••••••••"
          required
        >
      </MainInput>
      <MainInput
        class="many"
        v-bind:class="{ novalid: !isPeselCorrect }"
      >
        PESEL
        <input
          type="text"
          name="pesel"
          v-model="data.pesel"
          placeholder="12345678912"
          required
        >
      </MainInput>
      <MainInput class="many">
        E-mail
        <input
          type="email"
          name="email"
          v-model="data.email"
          placeholder="jan@kowalski.com"
          minlength="4"
          maxlength="100"
          required
        >
      </MainInput>
      <MainInput class="many">
        Telefon
        <input
          type="tel"
          name="phone"
          v-model="data.phone"
          placeholder="123654789"
          minlength="9"
          maxlength="15"
          required
        >
      </MainInput>
      <MainInput
        class="many"
        v-if="profileType == 2"
      >
        Specjalizacja
        <input
          type="text"
          minlength="1"
          name="specialization"
          v-model="doctorData.specialization"
          placeholder="Fizjoterapeuta"
          required
        >
      </MainInput>
    </div>
    <div
      class="login__options"
      v-if="profileType != 0"
    >
      <div class="login__remember">
        <input
          v-model="data.rules_accepted"
          type="checkbox"
          id="rulesAccepted"
        >
        <label
          for="rulesAccepted"
          class="checkbox--login__remember"
        ></label>
        <p>Akceptuję
          <router-link
            to="/Terms"
            target="_blank"
          >regulamin</router-link>
        </p>
      </div>
    </div>
    <slot></slot>
  </form>
</template>

<script>
import MainInput from '../../components/ui/basic/MainInput'
import MainBtn from '../../components/ui/basic/MainBtn'

import { mapActions } from 'vuex'

export default {
  name: 'Signup',
  data: function () {
    return {
      showPatientInfo: false,
      showSpecInfo: false,
      profileType: 0,
      data: {
        password: '',
        name: '',
        pesel: '',
        email: '',
        phone: '',
        rules_accepted: false
      },
      doctorData: {
        specialization: ''
      }
    }
  },
  methods: {
    ...mapActions({
      userSignup: 'userInfo/signup',
      userLogin: 'userInfo/login',
      userGetFreePlan: 'userInfo/getFreePlan'
    }),
    signup: function () {
      this.$emit('loading', true)
      this.userSignup(this.userData)
        .then(() => this.userLogin(this.loginData))
        .then(() => {
          if (this.profileType == 2) {
            this.userGetFreePlan()
            this.$toasted.info('Przyznano 30 dni darmowego planu')
          }
        })
        .then(() => {
          this.$toasted.success('Pomyślnie zarejestrowano')
          window.location.href = '/Dashboard'
        })
        .catch(error => {
          this.$toasted.error('Niepoprawne dane')
          console.error(error)
        })
        .finally(() => {
          this.$emit('loading', false)
        })
    }
  },
  computed: {
    isPeselCorrect: function () {
      let weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3]
      let sum = 0
      let controlNumber = parseInt(this.data.pesel.substring(10, 11))
      for (let i = 0; i < weights.length; i++) {
        sum += parseInt(this.data.pesel.substring(i, i + 1)) * weights[i]
      }
      sum = sum % 10
      return this.data.pesel == null ? false : 10 - sum === controlNumber
    },
    userData: function () {
      if (this.profileType === 2) {
        return Object.assign(this.data, this.doctorData)
      } else {
        return this.data
      }
    },
    loginData: function () {
      const { email, password } = this.data
      const data = {
        username: email,
        password: password
      }
      return data
    }
  },
  components: {
    MainInput: MainInput,
    MainBtn: MainBtn
  }
}
</script>

<style lang="scss" scoped>
@import "../../main";

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

.login__type {
  margin: 1em 0;
  background: #f0f0f4;
  position: relative;
  width: 100%;
  border-radius: 0.5em;
  transition: 0.2s ease-in-out;
  height: auto;
  transition: height 5s ease-in-out;
  box-shadow: 0 0 20px 0px rgba(213, 213, 213, 0.5);
  display: block;
  overflow: hidden;
}

.type__top {
  display: flex;
  width: 100%;
}

.type__btn {
  @extend %text--center;
  padding: 5%;
  display: flex;
  color: #3e3e45;
  font-weight: 600;
  width: 90%;
  cursor: pointer;
}

.type__content {
  width: 100%;
  display: block;
  background: #fff;
}

.type__el {
  width: 100%;
  cursor: pointer;
  display: flex;
  .el__icon {
    @extend %text--center;
    font-size: 1.5rem;
    padding: 1.5rem;
    color: #3e3e45;
    transition: 0.2s ease-in-out;
  }
  .el__title {
    @extend %text--center;
    font-weight: 600;
    width: 100%;
    padding: 1em 0;
  }
  .el__info {
    @extend %text--center;
    font-size: 1.5rem;
    padding: 1.5rem;
    min-width: 1.5rem;
    color: #3e3e45;
    background: #e8e8ec;
    cursor: pointer;
  }
  &--info {
    @extend %text--center;
    flex-direction: column;
    text-align: center;
    font-weight: 600;
    color: #3e3e45;
    background: #e8e8ec;
    padding: 1rem;
    width: calc(100% - 2rem);
    user-select: none;
    div:last-child {
      margin-top: 0.5rem;
      color: #6a6ee1;
    }
  }
  .el__btn {
    transition: 0.2s ease-in-out;
    display: flex;
    width: 100%;
    &:hover {
      background: #f5f5f5;
      &,
      .el__icon {
        color: #7f82e6;
      }
    }
    &.selected {
      background: #f5f5f5;
      &,
      .el__icon {
        color: #5356ae;
      }
    }
  }
}

.type__btn--action {
  background: transparent;
  span {
    transition: 0.2s ease-in-out;
    color: #3e3e45;
    font-size: 1.2em;
    margin-left: 0.5em;
  }
}

@media only screen and (max-width: 425px) {
  .input--double-container {
    display: block;
    border-bottom: none !important;
    .input--main {
      width: 90% !important;
      border-right: none !important;
      border-bottom: 0.5px solid rgba(145, 145, 156, 0.3) !important;
      &:first-child {
        border-top-right-radius: 0.5em !important;
      }
      &:last-child {
        border-radius: 0 !important;
      }
    }
  }
}
</style>
