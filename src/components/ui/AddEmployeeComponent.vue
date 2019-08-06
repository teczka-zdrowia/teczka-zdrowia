<template>
  <div class="addemployee">
    <div class="addemployee__place">
      <span class="addemployee__place__title">
        Gabinet:
      </span>
      <MainPlaceInfo
        class="addemployee__place__info"
        :data="place"
      />
    </div>
    <form
      class="addemployee__form"
      v-if="!initalizeNew"
      v-on:submit.prevent="searchEmployee"
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
        class="addemployee__form__btn"
        v-if="isPeselCorrect"
        color="#fafafa"
        :loading="loading.search"
        :disabled="loading.search"
      >Wyszukaj pracownika po PESEL</MainBtn>
    </form>
    <MainBtn
      class="addemployee__form__btn addemployee__form__btn--red"
      v-if="isPeselCorrect && searchFailed && !initalizeNew"
      v-on:click.native="initalizeNew = !initalizeNew"
    >Utwórz konto użytkownika</MainBtn>
    <form
      class="addemployee__form"
      v-if="initalizeNew"
      v-on:submit.prevent="initalizeEmployee"
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
      <MainBtn
        class="addemployee__form__btn"
        color="#fafafa"
        :loading="loading.initalize"
        :disabled="loading.initalize"
      >Utwórz konto</MainBtn>
    </form>
    <MainUserBlockInfo
      class="addemployee__employee"
      v-if="employee"
      :user="employee || undefined"
    />
  </div>
</template>

<script>
import MainPlaceInfo from "../ui/basic/MainPlaceInfo";
import MainBtn from "../ui/basic/MainBtn";
import MainInput from "../ui/basic/MainInput";
import MainUserBlockInfo from "../ui/basic/MainUserBlockInfo";

import { mapGetters, mapActions } from "vuex";

export default {
  name: "AddPatientComponent",
  data: function() {
    return {
      data: {
        pesel: "",
        name: "",
        email: "",
        phone: ""
      },
      loading: {
        search: false,
        initalize: false
      },
      initalizeNew: false
    };
  },
  computed: {
    ...mapGetters({
      place: "addEmployee/place",
      employee: "addEmployee/employee",
      searchFailed: "addEmployee/searchFailed"
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
      searchEmployeeByPesel: "addEmployee/searchByPesel",
      initalizeEmployeeAccount: "addEmployee/initalizeEmployee",
      clearData: "addEmployee/clear"
    }),
    searchEmployee: async function() {
      this.loading.search = true;

      await this.searchEmployeeByPesel(this.data.pesel)
        .then(() => {
          this.$toasted.success("Znaleziono użytkownika");
        })
        .catch(error => {
          console.error(error);
          this.$toasted.error("Brak użytkownika w bazie");
        });

      this.loading.search = false;
    },
    initalizeEmployee: async function() {
      this.loading.initalize = true;

      await this.initalizeEmployeeAccount(this.data)
        .then(() => {
          this.$toasted.success("Użytkownik utworzony pomyślnie");
          this.$toasted.success(
            "Dane logowania zostały wysłane na podany email",
            {
              duration: 1000
            }
          );
        })
        .catch(error => {
          this.$toasted.error("Wystąpił błąd");
          console.error(error);
        });

      this.loading.initalize = false;
    }
  },
  mounted() {
    this.clearData();
  },
  components: {
    MainBtn,
    MainInput,
    MainPlaceInfo,
    MainUserBlockInfo
  }
};
</script>

<style lang="scss" scoped>
@import "../../main";

.addemployee {
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

  &__employee {
    width: 100% !important;
    margin-top: 1rem;
  }
}
</style>
