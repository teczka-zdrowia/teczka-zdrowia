<template>
  <div
    class="appointment"
    v-on:click="moreInfo(data.id)"
  >
    <MainUserInfo
      class="appointment__user"
      :data="showUserAs === 'patient' ? data.patient : data.author"
      :type="showUserAs"
      :isClickable="false"
    />
    <div
      class="appointment__place"
      v-if="showPlace"
    >
      <MainPlaceInfo
        class="content__el"
        :noPadding="true"
        :data="data.place"
      />
    </div>
    <div
      class="appointment__doctor"
      v-if="showAddedBy"
    >
      <div class="doctor__title">
        <p>Dodano przez:</p>
      </div>
      <div class="doctor__name">
        <p>{{ data.author.name }}</p>
      </div>
    </div>
    <div class="appointment__when">
      <div class="when__date">
        <span
          aria-hidden="true"
          class="fas fa-calendar-day"
        />
        <p>{{ date }}</p>
      </div>
      <div class="when__time">
        <span
          aria-hidden="true"
          class="far fa-clock"
        />
        <p>{{ time }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import MainBtn from '../basic/MainBtn'
import MainUserInfo from '../basic/MainUserInfo'
import MainPlaceInfo from '../basic/MainPlaceInfo'

import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'AppointmentSmall',
  props: {
    data: {
      type: Object
    },
    showAddedBy: {
      type: Boolean,
      default: false
    },
    showPlace: {
      type: Boolean,
      default: false
    },
    showUserAs: {
      type: String,
      default: 'patient'
    }
  },
  components: {
    MainUserInfo,
    MainBtn,
    MainPlaceInfo
  },
  methods: {
    ...mapActions({
      showModal: 'modal/show'
    }),
    moreInfo: function (id) {
      this.showModal({
        componentName: 'AppointmentInfo',
        data: {
          hideBorders: true,
          showUserAs: this.showUserAs,
          appointment: this.data
        }
      })
    }
  },
  computed: {
    date: function () {
      const dateSlice = this.data.date.slice(0, 10)
      return new Date(dateSlice).toLocaleDateString()
    },
    time: function () {
      return this.data.date.slice(11, 16)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../main";

.appointment {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #67676e;
  cursor: pointer;
  height: 5em;
  width: 100%;
  border-radius: 0.5em;
  -webkit-box-shadow: 0 0 20px 0px rgba(213, 213, 213, 0.3);
  box-shadow: 0 0 20px 0px rgba(213, 213, 213, 0.3);
  background: #fafafc;
  transition: all 0.2s ease-in-out;
  display: flex;
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 60px 0 rgba(145, 145, 156, 0.3);
  }
  &:active {
    transform: scale(1.025);
  }
  &:not(:last-child) {
    margin-bottom: 1em;
  }
}

.appointment__when {
  height: 100%;
  width: 100%;
  max-width: 9em;
  margin-left: auto;
  background: #f5f5f8;
  font-weight: 600;
  span {
    margin: 0 1em;
    color: #6a6ee1;
  }
  p {
    color: #67676e;
    margin-right: 1em;
  }
}

.when__date,
.when__time {
  @extend %text--center;
  justify-content: left;
  height: 50%;
  width: 100%;
}

.appointments__more {
  background: #eeeef3 !important;
  color: #6a6ee1 !important;
  width: 100% !important;
  height: 3em !important;
}

.appointment__user {
  grid-template-columns: 5rem auto !important;
  height: 5rem !important;
  margin-right: 1rem;
  .user__img {
    height: 4rem !important;
  }
}

.appointment__place {
  @extend %text--center;
  height: calc(100% - 2rem);
  width: calc(100% - 2rem);
  max-width: 10em;
  margin-left: auto;
  background: #eeeef3;
  color: #67676e;
  padding: 1rem;
  font-weight: 600;
  & ~ .appointment__when {
    margin-left: unset;
  }
}

.appointment__doctor {
  height: 100%;
  width: 100%;
  max-width: 14em;
  margin-left: auto;
  background: #eeeef3;
  font-weight: 600;
  p {
    color: #67676e;
    margin: 1rem 1rem;
    text-align: center;
  }
  & ~ .appointment__when {
    margin-left: unset;
  }
}

.doctor__title p {
  color: #3e3e45;
}

.doctor__name p {
  white-space: normal;
  word-break: break-all;
}

.doctor__title,
.doctor__name {
  @extend %text--center;
  height: 50%;
  width: 100%;
}

@media only screen and (max-width: 1200px) {
  .appointment__place {
    &,
    & ~ .appointment__when {
      display: flex !important;
      justify-content: center !important;
      align-items: center !important;
      max-width: unset !important;
    }
  }
}

@media only screen and (max-width: 650px) {
  .appointment {
    display: block;
    height: auto;
  }
  .appointment__when {
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: unset;
  }
  .user__img {
    height: 3.5em !important;
  }
  .appointment__doctor,
  .appointment__place {
    display: flex;
    width: 100%;
    padding: 1rem 0;
    max-width: unset;
    margin-left: 0;
    .doctor__title {
      width: auto;
      p {
        margin-left: 0.75rem;
      }
    }
    p {
      margin: 0;
    }
  }
}
</style>
