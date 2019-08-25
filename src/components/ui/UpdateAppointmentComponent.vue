<template>
  <div class="addappointment">
    <div class="addappointment__info">
      <MainInput>
        Kiedy?
        <input
          :value="date"
          type="datetime-local"
          v-on:change="setFormattedDate($event)"
          :required="true"
        >
      </MainInput>
      <MainSelect
        class="addappointment__select"
        disabled
        v-on:change.native="selectPlace($event)"
      >
        Gdzie?
        <option :value="data.place_id">{{ oldData.place.name }}</option>
      </MainSelect>
      <MainTextarea class="addappointment__textarea">
        Notatka
        <textarea
          v-model="data.note"
          placeholder="Krótki opis wizyty"
          :required="true"
        ></textarea>
      </MainTextarea>
    </div>
    <div class="addappointment__who">
      <div class="addappointment__patients">
        <MainUserInfo
          class="patient__el__info"
          :data="oldData.patient"
          :isClickable="false"
        />
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

const moment = require("moment");
moment.locale("pl");

export default {
  name: "AddPatientComponent",
  data: function() {
    return {
      date: "",
      data: {
        place_id: null,
        patient_id: null,
        date: "",
        note: ""
      }
    };
  },
  methods: {
    ...mapActions({
      setAppointmentData: "addAppointment/setData"
    }),
    setFormattedDate: function(event) {
      this.data.date = moment(event.target.value).format("YYYY-MM-DD HH:mm:ss");
    }
  },
  computed: {
    ...mapGetters({
      isMobile: "window/isMobile",
      oldData: "updateAppointment/oldData",
      loadedData: "updateAppointment/data"
    })
  },
  watch: {
    data: {
      handler(val) {
        this.setAppointmentData(val);
      },
      deep: true
    }
  },
  components: {
    DatePick,
    MainInput,
    MainSelect,
    MainTextarea,
    MainUserInfo
  },
  mounted() {
    this.data = this.loadedData;
    this.date = moment(this.data.date).format("YYYY-MM-DDTHH:mm");
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
    max-height: 20rem;
  }

  &__patients,
  &__places {
    overflow: auto;
    padding: 1rem;
    width: calc(100% - 2rem);
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100% - 2rem);
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
