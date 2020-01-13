<template>
  <div class="addpatient">
    <div class="addpatient__place">
      <span class="addpatient__place__title">
        Gabinet:
      </span>
      <MainPlaceInfo class="addpatient__place__info" :data="place" />
    </div>
    <form
      class="addpatient__form"
      v-if="!initalizeNew"
      v-on:submit.prevent="searchPatient"
    >
      <MainInput v-bind:class="{ novalid: !isPeselCorrect }">
        PESEL
        <input
          type="text"
          name="pesel"
          minlength="11"
          maxlength="11"
          v-model="data.pesel"
          placeholder="12345678912"
          required
        />
      </MainInput>
      <MainBtn
        class="addpatient__form__btn"
        v-if="isPeselCorrect"
        color="#fafafa"
        :loading="loading.search"
        :disabled="loading.search"
        >Wyszukaj pacjenta po PESEL</MainBtn
      >
    </form>
    <MainBtn
      class="addpatient__form__btn addpatient__form__btn--red"
      v-if="isPeselCorrect && searchFailed && !initalizeNew"
      v-on:click.native="initalizeNew = !initalizeNew"
      >Utwórz konto użytkownika</MainBtn
    >
    <form
      class="addpatient__form"
      v-if="initalizeNew"
      v-on:submit.prevent="initalizePatient"
    >
      <div>
        <MainInput class="many">
          Imię i nazwisko
          <input
            name="name"
            type="text"
            v-model="data.name"
            placeholder="Jan Kowalski"
            maxlength="100"
            required
          />
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
          />
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
          />
        </MainInput>
        <MainInput class="many">
          Adres
          <input
            type="text"
            name="address"
            v-model="data.address"
            placeholder="Kwiatowa 4, Warszawa"
            maxlength="100"
            required
          />
        </MainInput>
      </div>
      <MainBtn
        class="addpatient__form__btn"
        color="#fafafa"
        :loading="loading.initalize"
        :disabled="loading.initalize"
        >Utwórz konto</MainBtn
      >
    </form>
    <GreyBlock class="addpatient__info" v-if="newAccountCreated"
      >Utworzono nowe konto użytkownika. Dane logowania zostały wysłane na
      podany wcześniej adres e-mail.</GreyBlock
    >
    <MainUserBlockInfo
      class="addpatient__patient"
      v-if="patient"
      :user="patient"
    />
  </div>
</template>

<script>
import MainPlaceInfo from '../ui/basic/MainPlaceInfo'
import MainBtn from '../ui/basic/MainBtn'
import MainInput from '../ui/basic/MainInput'
import MainUserBlockInfo from '../ui/basic/MainUserBlockInfo'
import GreyBlock from '../ui/blocks/GreyBlock'
import handleErrors from '../../utils/handleErrors'

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'AddPatientComponent',
  data: function () {
    return {
      data: {
        pesel: '',
        name: '',
        email: '',
        phone: '',
        address: ''
      },
      loading: {
        search: false,
        initalize: false
      },
      initalizeNew: false,
      newAccountCreated: false
    }
  },
  computed: {
    ...mapGetters({
      place: 'addPatient/place',
      patient: 'addPatient/patient',
      searchFailed: 'addPatient/searchFailed'
    }),
    isPeselCorrect: function () {
      if (!/^[0-9]{11}$/.test(this.data.pesel)) {
        return false
      }
      const times = [1, 3, 7, 9]
      const digits = `${this.data.pesel}`
        .split('')
        .map(digit => parseInt(digit, 10))
      const dig11 = digits.splice(-1)[0]
      let control =
        digits.reduce(
          (previousValue, currentValue, index) =>
            previousValue + currentValue * times[index % 4]
        ) % 10

      return 10 - (control === 0 ? 10 : control) === dig11
    }
  },
  methods: {
    ...mapActions({
      searchPatientByPesel: 'addPatient/searchByPesel',
      initalizePatientAccount: 'addPatient/initalizePatient',
      clearData: 'addPatient/clear',
      clearPatient: 'addPatient/clearPatient'
    }),
    searchPatient: async function () {
      this.clearPatient()
      this.loading.search = true

      await this.searchPatientByPesel(this.data.pesel)
        .then(() => {
          this.$toasted.success('Znaleziono użytkownika')
        })
        .catch(error => handleErrors(error))

      this.loading.search = false
    },
    initalizePatient: async function () {
      this.loading.initalize = true

      await this.initalizePatientAccount(this.data)
        .then(() => {
          this.newAccountCreated = true
          this.$toasted.success('Użytkownik utworzony pomyślnie')
          this.$toasted.success(
            'Dane logowania zostały wysłane na podany email',
            {
              duration: 1000
            }
          )
        })
        .catch(error => handleErrors(error))

      this.loading.initalize = false
    }
  },
  watch: {
    isPeselCorrect: function (newVal, oldVal) {
      if (newVal === false && oldVal === true) {
        this.clearPatient()
      }
    }
  },
  mounted () {
    this.clearPatient()
  },
  components: {
    MainBtn,
    MainInput,
    MainPlaceInfo,
    MainUserBlockInfo,
    GreyBlock
  }
}
</script>

<style lang="scss" scoped>
@import "../../main";

.addpatient {
  &__place {
    display: flex;
    width: 100%;
    margin-bottom: 1rem;
    background: #f5f5f5;
    border-radius: 0.5rem;
    &__title {
      @extend %text--center;
      font-weight: 600;
      padding: 1rem;
    }
    &__info {
      width: 100%;
    }
  }

  &__form {
    @media only screen and (min-width: 35rem) {
      width: 30rem;
    }

    label {
      padding: 1.5rem !important;
      width: calc(100% - 3rem) !important;
      background: #eeeef3 !important;
    }
    &__btn {
      margin-top: 1rem;
      width: 100%;
      &--red {
        background: #d91e18 !important;
        color: #fafafc !important;
      }
    }
  }

  &__info {
    font-size: 1rem;
    padding: 1rem;
    margin-top: 1rem;
    width: 28rem;
     max-width: 90vw;
  }

  &__patient {
    width: 100% !important;
    margin-top: 1rem;
  }
}
</style>
