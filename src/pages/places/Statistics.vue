<template>
  <div class="stats">
    <MainSelect
      class="stats__select"
      v-on:change.native="daysBack = $event.target.value"
    >
      <option
        selected
        disabled
      >Wybierz okres
      </option>
      <option value="7">Ostatni tydzień</option>
      <option value="14">Ostatnie 2 tygodnie</option>
      <option value="30">Ostatnie 30 dni</option>
      <option value="90">Ostatnie 90 dni</option>
      <option value="365">Ostatni rok</option>
    </MainSelect>
    <div v-if="statistics && initialized && !loading">
      <div class="stats__el">
        <div class="stats__title">Obsłużonych pacjentów:</div>
        <div class="stats__data">{{ statistics.patients_count }}</div>
      </div>
      <div class="stats__el">
        <div class="stats__title">Wizyt:</div>
        <div class="stats__data">{{ statistics.appointments_count }}</div>
      </div>
      <div class="stats__el">
        <div class="stats__title">Najaktywniejszy pracownik:</div>
        <div class="stats__data">{{ statistics.most_active_worker.name || 'Brak danych' }}</div>
      </div>
    </div>
    <GreyBlock
      class="stats__info stats__info--loading"
      v-if="loading"
    >Ładowanie
      <MainLoading color="#67676e"/>
    </GreyBlock>
  </div>
</template>

<script>
import MainSelect from '../../components/ui/basic/MainSelect'
import GreyBlock from '../../components/ui/blocks/GreyBlock'
import MainLoading from '../../components/ui/basic/MainLoading'

import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'PlaceStatistics',
  data: function () {
    return {
      initialized: false,
      daysBack: 0,
      loading: false
    }
  },
  computed: {
    ...mapGetters({
      statistics: 'placeStatistics/full',
      selectedRole: 'userRoles/selected'
    }),
    selectedPlace: function () {
      return this.selectedRole.place
    },
    date: function () {
      const daysBack = this.daysBack
      const today = new Date().toISOString().slice(0, 10)

      var to = new Date()
      to.setDate(to.getDate() - daysBack)
      to = to.toISOString().slice(0, 10)

      return {
        to: today,
        from: to
      }
    }
  },
  methods: {
    ...mapActions({
      getPlaceStatistics: 'placeStatistics/get'
    }),
    getStatistics: async function () {
      this.initialized = true
      this.loading = true

      const payload = {
        id: this.selectedPlace.id,
        date: this.date
      }

      await this.getPlaceStatistics(payload).catch(error => {
        this.$toasted.error('Brak danych')
        console.error(error)
      })

      this.loading = false
    }
  },
  watch: {
    daysBack: function () {
      this.getStatistics()
    }
  },
  components: {
    MainSelect,
    GreyBlock,
    MainLoading
  }
}
</script>

<style lang="scss" scoped>
  @import "../../main";

  .stats__info {
    height: unset;
    padding: 1rem;

    &--loading {
      border-top-left-radius: 0 !important;
      border-top-right-radius: 0 !important;

      svg {
        height: 2rem;
        width: 2rem;
        margin-left: 1rem;
      }
    }
  }

  .stats {
    margin-top: -1rem;
  }

  .stats__select {
    width: 100%;
    text-align-last: center;
    background-color: #eeeef3 !important;

    &:not(:last-child) {
      border-bottom-left-radius: 0 !important;
      border-bottom-right-radius: 0 !important;
    }
  }

  .stats__el {
    display: flex;
    flex-direction: column;
    font-weight: 600;
    background: #eeeef3;

    &:not(:last-child) {
      border-bottom: 1px solid rgba(213, 213, 213, 0.6);
    }

    &:last-child {
      border-bottom-left-radius: 0.5rem;
      border-bottom-right-radius: 0.5rem;
    }
  }

  .stats__title,
  .stats__data {
    padding: 0.75rem 0;
    text-align: center;
  }

  .stats__title {
    color: #67676e;
  }

  .stats__data {
    color: #3e3e45;
  }

  @media only screen and (min-width: 960px) {
    .stats__info {
      height: 24rem;
      padding: 0 1rem;
    }
  }
</style>
