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
      v-on:submit.prevent="searchPatient"
    >
      <MainInput v-bind:class="{ novalid: !isPeselCorrect }">
        PESEL
        <input
          type="text"
          name="pesel"
          minlength="1"
          v-model="pesel"
          placeholder="12345678912"
          required
        >
      </MainInput>
      <MainBtn
        class="addpatient__form__btn"
        v-if="isPeselCorrect"
      >Wyszukaj pacjenta po PESEL</MainBtn>
    </form>
    <Patient
      class="addpatient__patient"
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
      pesel: ""
    };
  },
  computed: {
    ...mapGetters({
      place: "addPatient/place",
      patient: "addPatient/patient"
    }),
    isPeselCorrect: function() {
      let weights = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
      let sum = 0;
      let controlNumber = parseInt(this.pesel.substring(10, 11));
      for (let i = 0; i < weights.length; i++) {
        sum += parseInt(this.pesel.substring(i, i + 1)) * weights[i];
      }
      sum = sum % 10;
      return this.pesel == null ? false : 10 - sum === controlNumber;
    }
  },
  methods: {
    ...mapActions({
      searchPatientByPESEL: "addPatient/searchByPESEL"
    }),
    searchPatient: function() {
      this.$toasted.show("Ładowanie...");
      try {
        this.searchPatientByPESEL(this.pesel);
      } catch (error) {
        console.error(error);
      }
    }
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
    width: calc(100% - 2px);
    label {
      background: #f5f5f5 !important;
    }
    &__btn {
      width: 100%;
      margin-top: 1rem;
    }
  }

  &__patient {
    width: 100% !important;
    margin-top: 1rem;
  }
}
</style>
