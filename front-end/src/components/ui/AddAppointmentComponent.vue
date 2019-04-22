<template>
  <div class="addappointment">
    <div class="addappointment__info">
      <MainInput>
        Kiedy?
        <DatePick
          v-model="data.dateAndTime"
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
    <div class="addappointment__patient">

    </div>
  </div>
</template>

<script>
import DatePick from "../ui/vue-date-pick/vueDatePick";
import MainInput from "../ui/basic/MainInput";
import MainSelect from "../ui/basic/MainSelect";
import MainTextarea from "../ui/basic/MainTextarea";

import { mapGetters, mapActions } from "vuex";

export default {
  name: "AddPatientComponent",
  data: function() {
    return {
      data: {
        place: null,
        dateAndTime: "",
        note: ""
      }
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
    MainTextarea
  }
};
</script>

<style lang="scss" scoped>
@import "../ui/vue-date-pick/vueDatePick.scss";

.addappointment {
  background: #f5f5f5;
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  display: flex;
  width: 100%;
  border-bottom: 1px solid rgba(145, 145, 156, 0.15);
  &__info {
    position: relative;
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

  &__patient {
    border-top-right-radius: 0.5rem;
    padding: 1rem;
    background: #ececec;
  }
}
</style>
