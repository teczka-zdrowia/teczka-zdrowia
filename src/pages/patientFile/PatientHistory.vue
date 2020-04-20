<template>
  <div class="histories">
    <div class="histories__top">
      <div class="histories__block">
        <div class="histories__title">Historia</div>
        <div class="histories__right">
          <MainSearch v-show="!loading.init">
            <input
              class="input"
              slot="input"
              type="text"
              v-model.lazy="query.search"
              placeholder="  Szukaj"
            >
            <div
              class="select"
              slot="select"
            >
              <label>
                Sortuj przez:
                <select v-model="query.sortData.field">
                  <option
                    value="date"
                    selected
                  >Data
                  </option>
                  <!--<option>Specjalista</option>
              <option>Gabinet</option>-->
                  <option value="note">Notatka</option>
                  <option value="treatments">Zabiegi</option>
                </select>
              </label>
              <label>
                Porządkuj:
                <select v-model="query.sortData.order">
                  <option
                    value="DESC"
                    selected
                  >Malejąco
                  </option>
                  <option value="ASC">Rosnąco</option>
                </select>
              </label>
              <label>
                Ładuj po:
                <select v-model="query.first">
                  <option
                    value="5"
                    selected
                  >5
                  </option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                </select>
              </label>
              <!-- <label class="label--highlight">
            Gabinet:
            <select>
              <option selected>Wszystkie</option>
              <option>Gabinet długonazwowy</option>
              <option>Lorem ipsum</option>
            </select>
          </label> -->
            </div>
          </MainSearch>
        </div>
      </div>
      <div class="histories__block">
        <MainBtn
          class="histories__btn"
          v-on:click.native="showAddHistory"
        >Dodaj
        </MainBtn>
      </div>
    </div>
    <div
      class="histories__list"
      v-if="!loading.init && !loading.newQuery"
    >
      <HistoryElement
        v-for="history in histories"
        :key="history.id"
        :data="history.node"
        :type="'patient'"
      />
      <MainShowMore
        v-on:click.native="getNextHistories"
        v-if="pageInfo.hasNextPage"
        :loading="loading.next"
      />
    </div>
    <GreyBlock
      class="histories__info"
      v-if="!loading.init && histories.length === 0"
    >Brak historii
    </GreyBlock>
    <GreyBlock
      class="histories__info histories__info--loading"
      v-if="loading.init || loading.newQuery"
    >Ładowanie
      <MainLoading color="#67676e"/>
    </GreyBlock>
  </div>
</template>

<script>
import MainBtn from '../../components/ui/basic/MainBtn'
import MainSearch from '../../components/ui/basic/MainSearch'
import HistoryElement from '../../components/ui/history/HistoryElement'
import MainLoading from '../../components/ui/basic/MainLoading'
import GreyBlock from '../../components/ui/blocks/GreyBlock'
import MainShowMore from '../../components/ui/basic/MainShowMore'

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'PatientHistory',
  props: {
    patient: {
      type: Object
    }
  },
  data: function () {
    return {
      loading: {
        init: true,
        next: false,
        newQuery: false
      },
      query: {
        search: '',
        first: 5,
        sortData: {
          order: 'ASC',
          field: 'date'
        }
      }
    }
  },
  components: {
    MainBtn,
    MainSearch,
    HistoryElement,
    GreyBlock,
    MainLoading,
    MainShowMore
  },
  computed: {
    ...mapGetters({
      histories: 'patientHistories/list',
      pageInfo: 'patientHistories/pageInfo'
    }),
    orderBy: function () {
      return [
        {
          field: this.query.sortData.field,
          order: this.query.sortData.order
        }
      ]
    }
  },
  methods: {
    ...mapActions({
      getPatientHistories: 'patientHistories/get',
      setHistoryPatient: 'addHistory/setPatient'
    }),
    getHistories: async function (payload, type) {
      this.loading[type] = true

      payload = {
        ...payload,
        id: this.patient.id
      }

      await this.getPatientHistories(payload).catch(error => {
        this.$toasted.error(
          'Wystąpił błąd podczas ładowania historii pacjenta'
        )
        console.error(error)
      })

      this.loading[type] = false
    },
    getFirstHistories: function () {
      const payload = {
        first: this.query.first,
        after: '',
        note: '',
        orderBy: this.orderBy,
        type: 'SET'
      }

      this.getHistories(payload, 'init')
    },
    getNextHistories: function () {
      const payload = {
        first: this.query.first,
        after: this.pageInfo.endCursor,
        note: `%${this.query.search}%`,
        orderBy: this.orderBy,
        type: 'ADD'
      }

      this.getHistories(payload, 'next')
    },
    showAddHistory: function () {
      this.setHistoryPatient(this.patient)
      this.$router.push({path: '/AddHistory'})
    }
  },
  watch: {
    query: {
      handler () {
        const payload = {
          first: this.query.first,
          after: '',
          note: `%${this.query.search}%`,
          date: this.date,
          orderBy: this.orderBy,
          type: 'SET'
        }

        this.getHistories(payload, 'newQuery')
      },
      deep: true
    }
  },
  mounted () {
    this.getFirstHistories()
  }
}
</script>

<style lang="scss" scoped>
  @import "../../main";

  .histories {
    width: 100%;
  }

  .histories__info {
    height: unset;
    padding: 1rem;
    margin-top: 1rem;

    &--loading {
      svg {
        height: 2rem;
        width: 2rem;
        margin-left: 1rem;
      }
    }
  }

  .histories__top {
    display: grid;
    grid-template-columns: auto;
    font-weight: 600;
    margin: 1rem 0;
  }

  .histories__btn {
    padding: 1rem !important;
    width: 100% !important;
  }

  .histories__block {
    @extend %text--center;
    justify-content: space-between;
    width: calc(100% - 2rem);
    padding: 1rem;
    -webkit-box-shadow: 0 0 20px 0px rgba(213, 213, 213, 0.3);
    box-shadow: 0 0 20px 0px rgba(213, 213, 213, 0.3);

    &:first-child {
      background: #fafafc;
      border-top-left-radius: 0.5rem;
      border-top-right-radius: 0.5rem;
    }

    &:last-child {
      background: #eeeef3;
      border-bottom-right-radius: 0.5rem;
      border-bottom-left-radius: 0.5rem;
    }
  }

  .histories__title {
    color: #3e3e45;
    font-size: 1.5em;
    margin-right: 1.5em;
    font-weight: 700;
  }

  .histories__right {
    display: flex;
    position: relative;
  }

  .histories__search {
    border-top-left-radius: 0.5rem;
    border-bottom-left-radius: 0.5rem;
    background: #eeeef3;
    padding: 0.75rem;
    font-weight: 600;
    width: calc(100% - 3rem);
    transition: 0.2s ease-in-out;

    &:focus {
      @include placeholder {
        opacity: 0;
      }
    }

    @include placeholder {
      transition: 0.2s ease-in-out;
      color: #6a6ee1;
      font-family: Montserrat, "Font Awesome 5 Free";
    }
  }

  .histories__sort {
    @extend %text--center;
    border-top-right-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
    transition: 0.2s ease-in-out;
    color: #3e3e45;
    background: #e4e4ec;
    padding: 0 1rem;
    cursor: pointer;

    &:hover {
      & ~ .histories__sort__content {
        visibility: visible;
        opacity: 1;
      }
    }
  }

  .histories__sort__content {
    z-index: 100;
    visibility: hidden;
    opacity: 0;
    position: absolute;
    top: calc(100% + 0.5rem);
    padding: 1rem 0.75rem;
    width: calc(100% - 1.5rem);
    background: #e4e4ec;
    border-radius: 0.5rem;
    transition: all 0.2s ease-in-out;

    label {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-weight: 600;

      &:not(:last-child) {
        margin-bottom: 1rem;
      }

      select {
        cursor: pointer;
        padding: 0.25rem;
        border-radius: 0.5rem;
        width: 50%;
        background: #fafafc;
        border: 0;
      }
    }

    &:hover {
      visibility: visible;
      opacity: 1;

      & ~ .histories__sort {
        border-radius: 0;
      }
    }
  }

  .histories__list > div:last-child {
    margin-bottom: 2em;
  }

  .list__actions {
    margin-top: 0.5em;
    height: 3em;
    display: flex;
    justify-content: center;
  }

  .list__more {
    @extend %text--center;
    border: 0;
    transition: 0.2s ease-in-out;
    border-radius: 0.5em;
    border-radius: 0.25em;
    padding: 0.5em 1.5em;
    background: none;
    color: #1a1b37;
    font-weight: 600;
    background: #fafafc;
    cursor: pointer;

    &:hover {
      background: #ffffff;
    }

    i {
      margin-left: 0.75em;
    }
  }

  @media only screen and (min-width: 960px) {
    .histories__info {
      height: 24rem;
      padding: 0 1rem;
    }
    .histories__top {
      grid-template-columns: auto 7rem;
    }
    .histories__block {
      &:first-child {
        border-radius: 0;
        border-top-left-radius: 0.5rem;
        border-bottom-left-radius: 0.5rem;
      }

      &:last-child {
        border-radius: 0;
        border-top-right-radius: 0.5rem;
        border-bottom-right-radius: 0.5rem;
      }
    }
  }
</style>
