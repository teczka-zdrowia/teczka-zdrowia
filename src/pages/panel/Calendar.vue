<template>
  <div>
    <date-pick
      :value="date"
      v-on:input="e => setDate(e)"
      :hasInputElement="false"
      :highlighted="[]"
      :selectableYearRange="20"
    />
    <div class="calendar__bottom">
      <div
        class="calendar__btn"
        v-on:click="setDate(today)"
      >
        <span
          aria-hidden="true"
          class="fas fa-calendar-day"
        />
        Dzisiaj
      </div>
      <div
        class="calendar__btn"
        v-on:click="setDate('')"
      >
        Wyczyść
      </div>
    </div>
  </div>
</template>

<script>
import DatePick from '../../components/ui/vue-date-pick/vueDatePick'

import { mapActions, mapGetters } from 'vuex'

const moment = require('moment')
moment.locale('pl')

export default {
  name: 'Calendar',
  components: { DatePick },
  computed: {
    ...mapGetters({
      date: 'appointmentsByMe/date',
      dates: 'appointmentsByMe/dates'
    }),
    today: function () {
      return new Date().toISOString().slice(0, 10)
    }
  },
  methods: {
    ...mapActions({
      setDate: 'appointmentsByMe/setDate'
    })
  }
}
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
  span {
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
