<template>
  <form class="signup" @submit.prevent="signup">
    <div class="login__type">
      <div class="type__top">
        <div class="type__btn" v-on:click="showType = !showType">
          <div class="type__title">Wybierz typ konta</div>
          <div class="type__btn--action">
            <i class="fas" v-bind:class="[showType ? 'fa-angle-up' : 'fa-angle-down']"></i>
          </div>
        </div>
        <div class="type__info" v-on:click="showMoreInfo = !showMoreInfo">
          <i class="fas fa-question"></i>
        </div>
      </div>
      <div class="info__content" v-if="showMoreInfo">
        <div class="info__el">
          <i class="fas fa-user"></i>
          <div class="el__content">
            <div class="el__title">Pacjent</div>
            <div class="el__desc">Dostęp do kartoteki, mapy specjalistów i historii wizyt</div>
            <div class="el__cost">DARMOWE</div>
          </div>
        </div>
        <div class="info__el">
          <i class="fas fa-user-md"></i>
          <div class="el__content">
            <div class="el__title">Specjalista</div>
            <div class="el__desc">Zarządzanie pacjentami, gabinetami i wizytami</div>
            <div class="el__cost">PIERWSZE 30 DNI ZA ZERO</div>
          </div>
        </div>
      </div>
      <div
        class="type__content"
        v-bind:style="[showType ? {'height': '100%', 'visibility': 'visible', 'opacity': 1} : {'height': '0', 'visibility': 'hidden', 'opacity': 0}]"
      >
        <div
          class="type__el"
          v-on:click="profileType = 1; showType = !showType"
          v-bind:class="[profileType == 1 ? 'selected' : '']"
        >
          <div class="el__title">
            <i class="fas fa-user"></i>
          </div>
          <div class="el__cost">Pacjent</div>
        </div>
        <div
          class="type__el"
          v-on:click="profileType = 2; showType = !showType"
          v-bind:class="[profileType == 2 ? 'selected' : '']"
        >
          <div class="el__title">
            <i class="fas fa-user-md"></i>
          </div>
          <div class="el__cost">Specjalista</div>
        </div>
      </div>
    </div>
    <div v-if="profileType != 0">
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
      <MainInput class="many" v-if="profileType == 2">
        Specjalizacja
        <input
          type="text"
          minlength="1"
          name="spec"
          v-model="data.spec"
          placeholder="Fizjoterapeuta"
        >
      </MainInput>
    </div>
    <div class="login__options" v-if="profileType != 0">
      <div class="login__remember">
        <input v-model="isTermsAccepted" type="checkbox" id="termsAccepted" required>
        <label for="termsAccepted" class="checkbox--login__remember"></label>
        <p>Akceptuję
          <router-link to="/Terms" target="_blank">regulamin</router-link>
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
      showMoreInfo: false,
      showType: true,
      profileType: 0,
      data: {
        login: "",
        password: "",
        name: "",
        surname: "",
        pesel: "",
        email: "",
        phone: "",
        birthdate: "",
        spec: ""
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
  width: 75%;
  cursor: pointer;
}

.type__info {
  @extend %text--center;
  padding: 5%;
  width: 5%;
  background: #e8e8ec;
  cursor: pointer;
}

.info__content {
  padding: 1rem;
  width: calc(100% - 2rem);
  background: #e8e8ec;
}

.info__el {
  display: flex;
  i {
    margin: auto;
    margin-right: 1rem;
    margin-left: 0;
    padding: 0.5em;
    font-size: 1.5em;
    width: 1em;
    height: 1em;
    text-align: center;
    color: #6a6ee1;
    background: #eeeef5;
    border-radius: 0.5em;
  }
  .el__title {
    font-weight: 700;
    margin-bottom: 0.25rem;
    color: #3e3e45;
  }
  .el__desc {
    line-height: 1.2;
    font-weight: 600;
    color: #67676e;
    margin-bottom: 0.25rem;
  }
  .el__cost {
    font-weight: 700;
    color: #3e3e45;
  }
  &:not(:last-child) {
    padding-bottom: 0.5rem;
    border-bottom: 1px solid rgba(213, 213, 213, 0.6);
  }
  &:not(:first-child) {
    padding-top: 0.5rem;
  }
}

.type__content {
  width: 100%;
  height: 0;
  opacity: 0;
  visibility: hidden;
  display: flex;
  background: #fff;
}

.type__el {
  width: 100%;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  .el__title {
    @extend %text--center;
    font-size: 2em;
    padding: 1em;
    color: #3e3e45;
    transition: 0.2s ease-in-out;
  }
  .el__cost {
    @extend %text--center;
    font-weight: 600;
    width: 100%;
    padding: 1em 0;
  }
  &:hover {
    background: #f5f5f5;
    &,
    .el__title {
      color: #7f82e6;
    }
  }
  &.selected {
    background: #f5f5f5;
    &,
    .el__title {
      color: #5356ae;
    }
  }
}

.type__btn--action {
  background: transparent;
  i {
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