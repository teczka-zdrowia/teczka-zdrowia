<template>
  <div class="addappointment">
    <div class="addappointment__info">
      <MainInput>
        Kiedy?
        <DatePick
          v-model="data.date"
          :pickTime="true"
          :format="'YYYY-MM-DD HH:mm'"
          :highlighted="[]"
          :required="true"
        />
      </MainInput>
      <MainSelect
        class="addappointment__select"
        @change.native="onPlaceSelectChange"
      >
        Gdzie?
        <option
          selected
          disabled
          :value="null"
        >Gdzie?</option>
        <option
          v-for="(place, index) in places"
          :key="index"
          :value="place.id"
        >{{ place.name }}</option>
      </MainSelect>
      <MainTextarea class="addappointment__textarea">
        Notatka
        <textarea
          v-model="data.note"
          placeholder="Krótki opis wizyty"
        ></textarea>
      </MainTextarea>
    </div>
    <div class="addappointment__who">
      <div
        class="patient__el"
        v-for="(patient, index) in patients"
        :key="index"
      >
        <MainUserInfo
          class="patient__el__info"
          :userId="patient.id"
          :name="patient.name"
          :phone="patient.phone"
          :img="patient.img"
          :isClickable="false"
        />
        <div
          class="patient__el__checkbox"
          v-on:click="data.patient = patient.id"
          v-bind:class="{ checked: patient.id === data.patient }"
        >
          <span
            aria-hidden="true"
            class="fas fa-check"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DatePick from "../ui/vue-date-pick/vueDatePick";
import MainInput from "../ui/basic/MainInput";
import MainSelect from "../ui/basic/MainSelect";
import MainTextarea from "../ui/basic/MainTextarea";
import MainUserInfo from "../ui/basic/MainUserInfo";

import { mapGetters, mapActions } from "vuex";

export default {
  name: "AddPatientComponent",
  data: function() {
    return {
      data: {
        place_id: null,
        patient_id: null,
        date: "",
        note: ""
      },
      patients: [
        {
          id: 0,
          img:
            "https://www.mendeley.com/careers/getasset/c475b7c0-d36c-4c73-be33-a34030b6ca82/",
          name: "Adrian Orłów",
          phone: "111222333"
        },
        {
          id: 1,
          img:
            "https://www.mendeley.com/careers/getasset/c475b7c0-d36c-4c73-be33-a34030b6ca82/",
          name: "Adrian Orłów2",
          phone: "111222333"
        },
        {
          id: 2,
          img:
            "https://www.mendeley.com/careers/getasset/c475b7c0-d36c-4c73-be33-a34030b6ca82/",
          name: "Adrian Orłów3",
          phone: "111222333"
        },
        {
          id: 3,
          img:
            "https://www.mendeley.com/careers/getasset/c475b7c0-d36c-4c73-be33-a34030b6ca82/",
          name: "Adrian Orłów3",
          phone: "111222333"
        },
        {
          id: 4,
          img:
            "https://www.mendeley.com/careers/getasset/c475b7c0-d36c-4c73-be33-a34030b6ca82/",
          name: "Adrian Orłów3",
          phone: "111222333"
        },
        {
          id: 5,
          img:
            "https://www.mendeley.com/careers/getasset/c475b7c0-d36c-4c73-be33-a34030b6ca82/",
          name: "Adrian Orłów3",
          phone: "111222333"
        },
        {
          id: 6,
          img:
            "https://www.mendeley.com/careers/getasset/c475b7c0-d36c-4c73-be33-a34030b6ca82/",
          name: "Adrian Orłów3",
          phone: "111222333"
        },
        {
          id: 7,
          img:
            "https://www.mendeley.com/careers/getasset/c475b7c0-d36c-4c73-be33-a34030b6ca82/",
          name: "Adrian Orłów3",
          phone: "111222333"
        },
        {
          id: 8,
          img:
            "https://www.mendeley.com/careers/getasset/c475b7c0-d36c-4c73-be33-a34030b6ca82/",
          name: "Adrian Orłów3",
          phone: "111222333"
        }
      ]
    };
  },
  computed: {
    ...mapGetters({
      places: "userPlaces/active"
    })
  },
  methods: {
    onPlaceSelectChange: function(event) {
      this.data.place = parseInt(event.target.value);
    }
  },
  components: {
    DatePick,
    MainInput,
    MainSelect,
    MainTextarea,
    MainUserInfo
  }
};
</script>

<style lang="scss" scoped>
@import "../ui/vue-date-pick/vueDatePick.scss";
@import "../../main";

.addappointment {
  background: #f5f5f5;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  display: flex;
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
    border-top-right-radius: 0.5rem;
    padding: 1rem;
    background: #ececec;
    max-height: 20rem;
    overflow: auto;
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
      background: #f5f5f5;
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

@media only screen and (max-width: 720px) and (orientation: portrait) {
  .addappointment {
    flex-direction: column;
    height: calc(100% - 5rem);
    //justify-content: space-between;
    &__info {
      max-width: 100%;
      height: auto;
    }

    &__who {
      height: 50vh;
      border-top-right-radius: 0;
      max-height: 50vh;
    }
  }
}
</style>
