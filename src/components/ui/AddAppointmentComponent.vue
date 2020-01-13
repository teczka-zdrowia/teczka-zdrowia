<template>
  <div class="addappointment">
    <div class="addappointment__info">
      <date-pick
        v-model="data.date"
        :hasInputElement="false"
        :pickTime="true"
        :selectableYearRange="20"
        :format="'YYYY-MM-DD HH:mm:ss'"
        :required="true"
      />
      <MainSelect
        :disabled="loading.roles"
        class="addappointment__select"
        v-on:change.native="selectPlace($event)"
      >
        Gdzie?
        <option v-if="loading.roles" selected disabled :value="null"
          >Ładowanie gabinetów</option
        >
        <option v-else selected disabled :value="null">Wybierz gabinet</option>
        <option
          v-for="(role, index) in roles"
          :key="index"
          :value="role.place.id"
          >{{ role.place.name }}</option
        >
      </MainSelect>
      <MainTextarea class="addappointment__textarea">
        Notatka
        <textarea
          v-model="data.note"
          :required="true"
          placeholder="Krótki opis wizyty"
        ></textarea>
      </MainTextarea>
    </div>
    <div class="addappointment__who">
      <MainSearch
        class="addappointment__search"
        v-show="!loading.patients && patients.length > 0"
      >
        <input
          class="input"
          v-model="search"
          slot="input"
          type="text"
          placeholder="  Szukaj"
        />
        <div class="select" slot="select">
          <label>
            Sortuj:
            <select v-model="sortBy">
              <option value="ASC" selected>A - Z</option>
              <option value="DESC">Z - A</option>
            </select>
          </label>
        </div>
      </MainSearch>
      <div v-if="data.place_id">
        <transition-group
          class="addappointment__patients"
          v-if="!loading.patients"
          name="fade"
          tag="div"
        >
          <div
            class="patient__el"
            v-for="patient in sortedSearchResults"
            :key="patient.id"
          >
            <MainUserInfo
              class="patient__el__info"
              :data="patient.user"
              :isClickable="false"
            />
            <div
              class="patient__el__checkbox"
              v-on:click="data.patient_id = patient.user.id"
              v-bind:class="{ checked: patient.user.id === data.patient_id }"
            >
              <span aria-hidden="true" class="fas fa-check" />
            </div>
          </div>
        </transition-group>
        <GreyBlock
          class="patients__info"
          v-if="!loading.patients && patients.length === 0"
          >Brak pacjentów</GreyBlock
        >
        <GreyBlock
          class="patients__info patients__info--loading"
          v-if="loading.patients"
          >Ładowanie
          <MainLoading color="#67676e" />
        </GreyBlock>
      </div>
    </div>
  </div>
</template>

<script>
import DatePick from "../../components/ui/vue-date-pick/vueDatePick"
import MainSearch from "../../components/ui/basic/MainSearch"
import MainInput from "../ui/basic/MainInput"
import MainSelect from "../ui/basic/MainSelect"
import MainTextarea from "../ui/basic/MainTextarea"
import MainUserInfo from "../ui/basic/MainUserInfo"
import MainLoading from "../../components/ui/basic/MainLoading"
import GreyBlock from "../../components/ui/blocks/GreyBlock"

import { mapGetters, mapActions } from "vuex"

const moment = require("moment")
moment.locale("pl")

export default {
  name: "AddPatientComponent",
  data: function() {
    return {
      search: "",
      sortBy: "ASC",
      selected: false,
      date: "",
      loading: {
        roles: false,
        patients: false
      },
      data: {
        place_id: null,
        patient_id: null,
        date: "",
        note: ""
      }
    }
  },
  computed: {
    ...mapGetters({
      isMobile: "window/isMobile",
      roles: "userRoles/list",
      selectedRole: "userRoles/selected",
      placePatients: "placePatients/list"
    }),
    patients: function() {
      return this.placePatients
    },
    searchResults: function() {
      return this.patients.filter(role => {
        const userName = role.user.name.toLowerCase()
        const search = this.search.toLowerCase()
        return ~userName.search(search)
      })
    },
    sortedSearchResults: function() {
      return this.sortBy === "ASC"
        ? this.searchResults.sort(
            (a, b) => (a.user.name > b.user.name) - (a.user.name < b.user.name)
          )
        : this.searchResults.sort(
            (a, b) => (a.user.name < b.user.name) - (a.user.name > b.user.name)
          )
    }
  },
  methods: {
    ...mapActions({
      getPlacePatients: "placePatients/get",
      getUserRoles: "userRoles/get",
      setAppointmentData: "addAppointment/setData"
    }),
    getPatients: async function() {
      this.loading.patients = true

      await this.getPlacePatients(this.data.place_id).catch(error => {
        this.$toasted.error(
          "Wystąpił błąd podczas ładowania pacjentów gabinetu"
        )
        console.error(error)
      })

      this.loading.patients = false
    },
    getRoles: async function() {
      this.loading.roles = true

      await this.getUserRoles().catch(error => {
        this.$toasted.error("Wystąpił błąd podczas ładowania gabientów")
        console.error(error)
      })

      this.loading.roles = false
    },
    selectPlace: function(event) {
      this.data.place_id = event.target.value
      this.getPatients()
      this.selected = true
    },
    setFormattedDate: function(value) {
      this.date = value
      this.data.date = value
    }
  },
  watch: {
    data: {
      handler(val) {
        this.setAppointmentData(val)
      },
      deep: true
    }
  },
  components: {
    DatePick,
    MainInput,
    MainSelect,
    MainTextarea,
    MainUserInfo,
    MainSearch,
    MainLoading,
    GreyBlock
  },
  mounted() {
    if (this.roles.length === 0) {
      this.getRoles()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../ui/vue-date-pick/vueDatePick.scss";
@import "../../main";

.addappointment {
  background: #f5f5f5;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  border-bottom: 1px solid rgba(145, 145, 156, 0.15);
  &__info {
    padding: 1rem;
    max-width: 20rem;
  }

  &__select {
    width: 100%;
    margin-top: 1rem;
    background-color: #fdfdff !important;
  }

  &__textarea {
    margin-top: 1rem;
  }

  &__who {
    border-left: 1px solid rgba(145, 145, 156, 0.15);
    border-top-right-radius: 0.5rem;
    max-height: 40rem;
  }

  &__patients,
  &__places {
    overflow: auto;
    max-height: 28rem;
    padding: 0 1rem;
    width: calc(100% - 2rem);
  }

  &__search {
    padding: 1rem;
    width: calc(100% - 2rem);
  }

  .places__info,
  .patients__info {
    width: calc(100% - 2rem);
    padding: 1rem;
    &--loading {
      svg {
        height: 2rem;
        width: 2rem;
        margin-left: 1rem;
        margin-right: unset;
      }
    }
  }

  .patient__el {
    display: flex;
    border-radius: 0.5rem;
    overflow: hidden;
    background: #fafafc;
    &:not(:last-child) {
      margin-bottom: 1rem;
    }
    &__info {
      padding: 0.5rem;
      padding-right: 1rem;
    }
    &__checkbox {
      @extend %text--center;
      margin-left: auto;
      font-size: 1.75rem;
      height: 4.5rem;
      width: 4.5rem;
      background: #eeeef3;
      cursor: pointer;
      input {
        display: none;
      }
      span {
        color: #27ae60;
        opacity: 0;
        transition: 0.2s ease-in-out;
      }
      &:hover span {
        opacity: 0.5;
      }
      &.checked span {
        opacity: 1;
      }
    }
  }
}

.places__list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 1rem;
  margin-bottom: 1rem;
  margin: 1rem;
}

.place {
  @extend %text--center;
  color: #3e3e45;
  font-weight: 600;
  width: calc(100% - 2.5rem);
  padding: 1.25rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 20px 0px rgba(213, 213, 213, 0.3);
  background: #eeeef3;
  transition: 0.2s ease-in-out;
  text-align: center;
  cursor: pointer;
  &.selected,
  &.places__title {
    background: #fafafc;
  }
  &.inactive {
    display: none;
  }
  &--selected {
    display: grid;
    grid-template-columns: 10rem auto 5rem;
    margin-bottom: 1rem;
    & > .places__title {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
    & > .place.selected {
      border-radius: 0;
      background: #efefef;
      cursor: unset;
    }
    & > .place__back {
      padding: 1rem;
      background: #8789e8;
      color: #fafafa;
      border-top-right-radius: 0.5rem;
      border-bottom-right-radius: 0.5rem;
      font-weight: 600;
      cursor: pointer;
    }
  }
}

.place__select {
  margin-left: auto;
  font-size: 1.5em;
  width: 1em;
  height: 1em;
  text-align: center;
  border-radius: 0.5em;
  transition: 0.2s ease-in-out;
  color: #6a6ee1;
}

@media only screen and (max-width: 720px) and (orientation: portrait) {
  .addappointment {
    grid-template-columns: 1fr;
    height: calc(100% - 5rem);
    &__info {
      max-width: 100%;
      height: auto;
    }

    &__who {
      border-top-right-radius: 0;
    }
  }
}
</style>
