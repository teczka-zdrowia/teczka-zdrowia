<template>
  <div class="addpatient">
    <div class="addpatient__place">
      <span class="addpatient__place__title">
        Gabinet:
      </span>
      <MainPlaceInfo
        class="addpatient__place__info"
        :name="place.name"
        :id="place.id"
      />
    </div>
    <form
      class="addpatient__form"
      v-if="!createNew"
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
        >
      </MainInput>
      <MainBtn
        class="addpatient__form__btn"
        v-if="isPeselCorrect"
        color="#fafafa"
        :loading="loading.search"
        :disabled="loading.search"
      >Wyszukaj pacjenta po PESEL</MainBtn>
    </form>
    <MainBtn
      class="addpatient__form__btn addpatient__form__btn--red"
      v-if="isPeselCorrect && searchFailed && !createNew"
      v-on:click.native="createNew = !createNew"
    >Utwórz konto użytkownika</MainBtn>
    <form
      class="addpatient__form"
      v-if="createNew"
      v-on:submit.prevent="createPatient"
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
      </div>
      <MainBtn class="addpatient__form__btn">Utwórz konto</MainBtn>
    </form>
    <Patient
      class="addpatient__patient"
      v-if="patient"
      :patient="patient || undefined"
    />
  </div>
</template>

<script>
import MainPlaceInfo from "../ui/basic/MainPlaceInfo";
import MainBtn from "../ui/basic/MainBtn";
import MainInput from "../ui/basic/MainInput";
import MainPatientBlockInfo from "../ui/basic/MainPatientBlockInfo";

import { mapGetters, mapActions } from "vuex";

export default {
  name: "AddPatientComponent",
  data: function() {
    return {
      data: {
        pesel: "",
        name: "",
        surname: "",
        email: "",
        phone: ""
      },
      loading: {
        search: false
      },
      createNew: false
    };
  },
  computed: {
    ...mapGetters({
      place: "addPatient/place",
      patient: "addPatient/patient",
      searchFailed: "addPatient/searchFailed"
    }),
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
  methods: {
    ...mapActions({
      searchPatientByPesel: "addPatient/searchByPesel",
      createNewPatient: "addPatient/createNew",
      clearData: "addPatient/clear"
    }),
    searchPatient: async function() {
      this.loading.search = true;

      await this.searchPatientByPesel(this.data.pesel)
        .then(() => {
          this.$toasted.success("Znaleziono użytkownika");
        })
        .catch(error => {
          console.error(error);
          this.$toasted.error("Brak użytkownika w bazie");
        });

      this.loading.search = false;
    },
    createPatient: function() {
      this.$toasted.show("Dodawanie...");
      this.createNewPatient(this.data).then(
        result => {
          this.$toasted.success(result);
          this.createNew = false;
        },
        error => this.$toasted.error(error)
      );
    }
  },
  mounted() {
    this.clearData();
  },
  components: {
    MainBtn,
    MainInput,
    MainPlaceInfo,
    Patient: MainPatientBlockInfo
  }
};
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
    width: 30rem;
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

  &__patient {
    width: 100% !important;
    margin-top: 1rem;
  }
}
</style>
