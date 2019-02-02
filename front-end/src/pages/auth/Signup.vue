<template>
  <form class="signup" @submit.prevent="signup">
    <div>
      <div class="input--double-container">
        <MainInput class="double many">
          Imię
          <input type="text" name="name" v-model="data.name" placeholder="Jan" required>
        </MainInput>
        <MainInput class="double many">
          Nazwisko
          <input
            type="text"
            name="surname"
            v-model="data.surname"
            placeholder="Kowalski"
            required
          >
        </MainInput>
      </div>
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
          name="password"
          type="password"
          minlength="6"
          v-model="data.password"
          placeholder="••••••••••••••••"
          required
        >
      </MainInput>
      <MainInput class="many" v-bind:class="{ novalid: !isPeselCorrect }">
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
        Data urodzenia
        <input
          type="date"
          name="birthdate"
          v-model="data.birthdate"
          class="login__birthdate"
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
    </div>
    <div class="login__doctor">
      <div class="doctor__btn" v-on:click="isDoctorShowed = !isDoctorShowed">
        <div class="doctor__title">Jestem specjalistą</div>
        <div class="doctor__btn--action">
          <i class="fas" v-bind:class="[isDoctorShowed ? 'fa-angle-up' : 'fa-angle-down']"></i>
        </div>
      </div>
      <div
        class="doctor__content"
        v-bind:style="[isDoctorShowed ? {'height': '100%', 'visibility': 'visible', 'opacity': 1} : {'height': '0', 'visibility': 'hidden', 'opacity': 0}]"
      >
        <MainInput>
          Specjalizacja
          <input
            type="text"
            name="specialization"
            v-model="data.specialization"
            placeholder="Fizjoterapeuta"
          >
        </MainInput>
      </div>
    </div>
    <div class="login__options">
      <div class="login__remember">
        <input v-model="isTermsAccepted" type="checkbox" id="termsAccepted" required>
        <label for="termsAccepted" class="checkbox--login__remember"></label>
        <p>Akceptuję
          <router-link to="/terms" target="_blank">regulamin</router-link>
        </p>
      </div>
    </div>
    <slot></slot>
  </form>
</template>

<script>
import MainInput from "../../components/ui/MainInput";
import MainBtn from "../../components/ui/MainBtn";

export default {
  name: "Signup",
  data: function() {
    return {
      isTermsAccepted: false,
      isDoctorShowed: false,
      data: {
        login: "",
        password: "",
        name: "",
        surname: "",
        pesel: "",
        email: "",
        phone: "",
        birthdate: "",
        specialization: ""
      }
    };
  },
  watch: {
    isPeselCorrect: function(val) {
      if (val == true) {
        let pesel = this.data.pesel;
        let y = parseInt(pesel.substring(0, 2), 10);
        let m = parseInt(pesel.substring(2, 4), 10) - 1;
        let d = parseInt(pesel.substring(4, 6), 10);

        if (m > 80) {
          y += 1800;
          m -= 80;
        } else if (m > 60) {
          y += 2200;
          m -= 60;
        } else if (m > 40) {
          y += 2100;
          m -= 40;
        } else if (m > 20) {
          y += 2000;
          m -= 20;
        } else {
          y += 1900;
        }

        m = ("0" + m).slice(-2);

        this.data.birthdate = `${y}-${m}-${d}`;
      }
    }
  },
  computed: {
    isPeselCorrect: function() {
      let weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
      let sum = 0;
      let controlNumber = parseInt(this.data.pesel.substring(10, 11));
      for (let i = 0; i < weights.length; i++) {
        sum += parseInt(this.data.pesel.substring(i, i + 1)) * weights[i];
      }
      sum = sum % 10;
      return this.data.pesel == null ? false : 10 - sum === controlNumber;
    }
  },
  components: {
    MainInput: MainInput,
    MainBtn: MainBtn
  }
};
</script>

<style lang="scss">
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

.login__doctor {
  margin: 1em 0;
  background: #f0f0f4;
  position: relative;
  cursor: pointer;
  width: 100%;
  border-radius: 0.5em;
  transition: 0.2s ease-in-out;
  height: auto;
  transition: height 5s ease-in-out;
  box-shadow: 0 0 20px 0px rgba(213, 213, 213, 0.5);
  display: block;
  .doctor__btn {
    @extend %text--center;
    padding: 5%;
    display: flex;
    color: #3e3e45;
    font-weight: 600;
    width: auto;
    .doctor__btn--action {
      background: transparent;
      i {
        transition: 0.2s ease-in-out;
        color: #3e3e45;
        font-size: 1.2em;
        margin-left: 0.5em;
      }
    }
  }
  .doctor__content {
    width: 100%;
    height: 0;
    opacity: 0;
    visibility: hidden;
  }
}
</style>