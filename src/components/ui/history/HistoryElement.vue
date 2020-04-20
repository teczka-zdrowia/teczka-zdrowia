<template>
  <div>
    <div
      class="list__el"
    >
      <div class="list__info">
        <MainUserInfo
          class="list__info__el list__info__el--user"
          :data="data.author"
          :type="'doctor'"
          :isBig="true"
        />
        <div
          class="list__info__el list__info__el--column"
          v-on:click="isMobile && toggleShowMore()"
        >
          <div class="list__info__el list__info__el--date">{{ data.date.slice(0, 10) }}</div>
          <div class="list__info__el--line"></div>
          <div class="list__info__el list__info__el--place">
            <MainPlaceInfo
              v-if="isMobile"
              :data="data.place"
              :noPadding="true"
              :violetIcon="true"
            />
            <MainPlaceInfo
              v-if="!isMobile"
              :data="data.place"
            />
          </div>
        </div>
      </div>
      <div
        class="list__more"
        v-if="!isMobile"
        v-on:click="toggleShowMore"
      >
        <div class="list__btn">
          <i
            class="fas"
            v-bind:class="[showMore ? 'fa-angle-up' : 'fa-angle-down']"
          />
        </div>
      </div>
    </div>
    <transition
      name="fade"
      mode="in-out"
    >
      <More
        v-if="showMore && !loading.more"
        :data="data"
      />
      <GreyBlock
        class="history__info history__info--loading"
        v-if="loading.more"
      >Ładowanie
        <MainLoading color="#67676e"/>
      </GreyBlock>
    </transition>
  </div>
</template>

<script>
import MainBtn from '../basic/MainBtn'
import MainUserInfo from '../basic/MainUserInfo'
import MainRecommendation from '../basic/MainRecommendation'
import MainPlaceInfo from '../basic/MainPlaceInfo'
import HistoryMoreElement from './HistoryMoreElement'
import MainLoading from '../basic/MainLoading'
import GreyBlock from '../blocks/GreyBlock'

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'HistoryElement',
  data: function () {
    return {
      showMore: false,
      loading: {
        more: false
      }
    }
  },
  props: {
    data: {
      type: Object
    },
    type: {
      type: String,
      default: 'user'
    }
  },
  components: {
    More: HistoryMoreElement,
    MainPlaceInfo,
    MainUserInfo,
    MainBtn,
    MainLoading,
    GreyBlock
  },
  computed: {
    ...mapGetters({
      isMobile: 'window/isMobile'
    })
  },
  methods: {
    ...mapActions({
      getMoreUserHistory: 'userHistories/getMore',
      getMorePatientHistory: 'patientHistories/getMore'
    }),
    getMore: async function () {
      this.loading.more = true
      const historyId = this.data.id

      if (this.type === 'user') {
        await this.getMoreUserHistory(historyId).catch(error => {
          this.$toasted.error('Wystąpił błąd podczas ładowania historii')
          console.error(error)
        })
      }

      if (this.type === 'patient') {
        await this.getMorePatientHistory(historyId).catch(error => {
          this.$toasted.error('Wystąpił błąd podczas ładowania historii')
          console.error(error)
        })
      }

      this.loading.more = false
    },
    toggleShowMore: async function () {
      if (!this.showMore) {
        await this.getMore()
      }

      this.showMore = !this.showMore
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../../main";

  .history__info {
    height: unset;
    padding: 1rem;
    margin: 1rem 0;

    &--loading {
      svg {
        height: 2rem;
        width: 2rem;
        margin-left: 1rem;
      }
    }
  }

  .history__list > div:last-child {
    margin-bottom: 2em;
  }

  .list__el {
    height: 5.5em;
    display: flex;
    justify-content: space-between;
    margin-bottom: 1em;
  }

  .list__info {
    width: 100%;
    margin-right: 1rem;
    padding: 1em;
    border-radius: 0.5em;
    font-weight: 600;
    box-shadow: 0 0 20px 0px rgba(213, 213, 213, 0.3);
    background: #fafafc;
    color: #67676e;
    display: flex;
    align-items: center;
    overflow: hidden;
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: 100%;
  }

  .list__info__el {
    &:not(:first-child) {
      padding-left: 1rem;
    }

    &:not(:last-child) {
      padding-right: 1rem;
      border-right: 1px solid rgba(0, 0, 0, 0.1);
    }

    &--user {
      width: 15rem;
    }

    &--date {
      width: 6rem;
      text-align: center;
    }

    &--column {
      display: flex;
      align-items: center;
      height: 100%;

      .list__info__el {
        height: auto;
        padding: 0;
        border-right: 0;

        &--line {
          width: 1px;
          height: 100%;
          background: rgba(0, 0, 0, 0.1);
          margin: 0 1rem;
        }
      }
    }
  }

  .list__more {
    @extend %text--center;
    width: 3.5rem;
    min-width: 3.5rem;
    padding: 1rem;
    border-radius: 0.5rem;
    box-shadow: 0 0 20px 0px rgba(213, 213, 213, 0.3);
    background: #fafafc;
    color: #3e3e45;
    font-size: 2rem;
    cursor: pointer;
    transition: 0.2s ease-in-out;
  }

  .more__container {
    margin-bottom: 1rem;
    border-radius: 0.5rem;
    overflow: hidden;
  }

  .more__content {
    width: calc(100% - 2em);
    padding: 1em;
    height: auto;
    box-shadow: 0 0 20px 0px rgba(213, 213, 213, 0.3);
    background: #fafafc;
    font-weight: 600;
    color: #67676e;
    display: flex;

    &--actions {
      background: #f5f5f8;
      justify-content: space-between;
    }
  }

  .more__column {
    &--left {
      width: 66%;
      padding-right: 1rem;
      border-right: 1px solid rgba(0, 0, 0, 0.1);
    }

    &--right {
      width: 33%;
      padding-left: 1rem;
    }
  }

  .more__row {
    display: block;
    margin-bottom: auto;

    &:not(:last-child) {
      padding-bottom: 1rem;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }

    &:not(:first-child) {
      padding-top: 1rem;
    }
  }

  .more__row__title {
    font-weight: 700;
    color: #3e3e45;
    margin-bottom: 1em;
  }

  .more__row__text {
    white-space: pre-wrap;
    line-height: 1.2;
  }

  .more__row__attachments {
    display: block;
  }

  .more__row__attachment {
    @extend %text--center;
    justify-content: left;
    transition: ease-in-out 0.2s;
    border-radius: 0.5em;
    overflow: hidden;
    cursor: pointer;

    i {
      margin-left: 0;
      margin-right: 1rem;
      padding: 0.5em;
      font-size: 1.5em;
      color: #6a6ee1;
      background: #eeeef3;
      border-radius: 0.5em;
    }

    &:not(:last-child) {
      margin-bottom: 1em;
    }

    &:hover {
      background: #eeeef3;
    }
  }

  .more__row__recommendation {
    width: 100%;
    font-weight: 600;
    display: grid;
    grid-template-columns: 3rem auto;
    grid-template-areas: "icon info" "time time";
    grid-column-gap: 1em;
    grid-row-gap: 0.5rem;

    & > i {
      grid-area: icon;
      margin-right: 1rem;
      padding: 0.5em;
      font-size: 1.5em;
      width: 1em;
      height: 1em;
      text-align: center;
      color: #6a6ee1;
      background: #eeeef3;
      border-radius: 0.5em;
    }

    &:not(:last-child) {
      margin-bottom: 1.5rem;
    }
  }

  .recommendation__content {
    grid-area: info;
    height: calc(100% - 0.5rem);
    white-space: normal;
    display: flex;
    flex-direction: column;
    margin: 0.25rem 0;
  }

  .recommendation__title {
    font-weight: 700;
    color: #3e3e45;
    margin-bottom: 0.25em;
  }

  .recommendation__info {
    color: #67676e;
  }

  .recommendation__time {
    @extend %text--center;
    grid-area: time;
    border-radius: 0.5rem;
    padding: 0.5rem;
    background: #eeeef3;
    color: #3e3e45;
    font-weight: 600;
    max-width: 100%;
    min-width: 9.5em;

    span {
      margin: 0 6px;
      color: #3e3e45;
      font-weight: 700;
    }
  }

  .more__signature {
    @extend %text--center;
    height: 2rem;
    width: auto;
    padding: 0.5rem;
    border-radius: 0.5rem;
    background: #eeeef3;
  }

  .more__print {
    @extend %text--center;
    background: #eeeef3;
    color: #3e3e45;
    font-weight: 600;
    padding: 0 1rem;
    border-radius: 0.5rem;
    cursor: pointer;

    i {
      margin-right: 0.5rem;
    }
  }

  @media only screen and (max-width: 960px) {
    .more__content {
      display: block;

      &--actions {
        display: flex;
      }
    }
    .more__column {
      &--left {
        width: 100%;
        padding-right: 0;
        padding-bottom: 1rem;
        border-right: 0;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      }

      &--right {
        width: 100%;
        padding-left: 0;
        padding-top: 1rem;
      }
    }
    .list__info__el--user,
    .list__info__el--date {
      width: unset;
    }
    .list__info__el {
      cursor: pointer;
    }
  }

  @media only screen and (max-width: 650px) {
    .list__el {
      height: 11rem;
    }
    .list__info {
      display: block;
    }
    .list__info__el:not(:last-child) {
      border-right: 0;
      padding-right: 0;
    }
    .list__info__el--line {
      display: none;
    }
    .list__info__el--column {
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-between;
      margin-top: 1rem;
      height: 3rem;
      background: #f5f5f8;
      padding: 1rem;
      margin-left: -1rem;
      width: 100%;

      .list__info__el {
        &::before {
          content: "";
          font-family: "Font Awesome 5 Free";
          color: #6a6ee1;
          margin-right: 1rem;
        }

        &:first-child::before {
          content: "\f783";
        }

        &:last-child {
          &::before {
            content: none;
          }

          & > div {
            color: #67676e !important;
            padding: 0.5rem;
            margin: -0.5rem;
            margin-top: 0.25rem;
          }
        }
      }
    }
  }
</style>
