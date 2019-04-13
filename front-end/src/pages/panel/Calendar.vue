<template>
  <div>
    <date-pick
      v-model="date"
      :hasInputElement="false"
      :highlighted="['2019-4-24','2019-4-8','2019-4-9']"
      :selectableYearRange="20"
    />
    <div class="calendar__bottom">
      <div
        class="calendar__btn"
        v-on:click="date = today"
      >
        <i class="fas fa-calendar-day"></i>
        Dzisiaj
      </div>
      <div
        class="calendar__btn"
        v-on:click="date = ''"
      >
        Wyczyść
      </div>
    </div>
  </div>
</template>

<script>
import DatePick from "../../components/ui/vue-date-pick/vueDatePick";

const moment = require("moment");
moment.locale("pl");

export default {
  name: "Calendar",
  components: { DatePick },
  data: function() {
    return {
      date: "Wybierz datę"
    };
  },
  computed: {
    today: function() {
      return moment().format("YYYY-MM-DD");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../main";

.calendar__bottom {
  display: flex;
}

.calendar__btn {
  @extend %text--center;
  padding: 1rem;
  width: 100%;
  max-width: 50%;
  text-align: center;
  font-weight: 700;
  cursor: pointer;
  background: #f5f5f5;
  transition: 0.5s ease-in-out;
  color: #3e3e45;
  i {
    margin-right: 0.75rem;
  }
  &:hover {
    background: #ececec;
  }
  &:first-child {
    border-bottom-left-radius: 0.5rem;
    &:hover {
      color: #6a6ee1;
    }
  }
  &:last-child {
    border-bottom-right-radius: 0.5rem;
  }
}
</style>
