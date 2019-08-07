<template>
  <div
    class="appointment"
    v-bind:class="{ noborders: hideBorders }"
  >
    <MainUserInfo
      class="list__info__el"
      :data="viewerType === 'patient' ? data.author : data.patient"
      :type="viewerType === 'patient' ? 'doctor' : 'patient'"
      :isBig="true"
      :isBigPhone="true"
    />
    <div class="appointment__content">
      <MainPlaceInfo
        class="content__el"
        :data="data.place"
      />
      <div class="content__few">
        <div class="content__el">
          <span
            aria-hidden="true"
            class="fas fa-calendar-day"
          />
          {{ date }}
        </div>
        <div class="content__el">
          <span
            aria-hidden="true"
            class="far fa-clock"
          />
          {{ time }}
        </div>
      </div>
      <div class="content__el">
        <span
          aria-hidden="true"
          class="far fa-comment-alt"
        />
        {{ data.note }}
      </div>
    </div>
    <div
      class="appointment__actions"
      v-if="viewerType === 'patient'"
    >
      <MainBtn
        class="appointment__btn appointment__btn--confirmed"
        v-if="data.confirmed"
        :loading="isConfirmationLoading"
        :disabled="isConfirmationLoading"
        color="#fafafa"
        v-on:click.native="updateConfirmation(false)"
      ><span
          aria-hidden="true"
          class="fas fa-check-circle"
        ></span>Potwierdzono</MainBtn>
      <MainBtn
        class="appointment__btn appointment__btn--not-confirmed"
        v-if="!data.confirmed"
        :loading="isConfirmationLoading"
        :disabled="isConfirmationLoading"
        color="#67676e"
        v-on:click.native="updateConfirmation(true)"
      ><span
          aria-hidden="true"
          class="far fa-check-circle"
        ></span>Potwierdź</MainBtn>
    </div>
    <div
      class="appointment__actions"
      v-if="viewerType === 'author'"
    >
      <div
        class="appointment__btn appointment__btn--confirmed"
        v-if="data.confirmed"
      ><span
          aria-hidden="true"
          class="fas fa-check-circle"
        ></span>Potwierdzona</div>
      <div
        class="appointment__btn appointment__btn--not-confirmed"
        v-if="!data.confirmed"
      ><span
          aria-hidden="true"
          class="far fa-times-circle"
        ></span>Niepotwierdzona</div>
    </div>
  </div>
</template>

<script>
import MainBtn from "../basic/MainBtn";
import MainUserInfo from "../basic/MainUserInfo";
import MainPlaceInfo from "../basic/MainPlaceInfo";

import { mapActions, mapGetters } from "vuex";

export default {
  name: "AppointmentBig",
  data: function() {
    return {
      isConfirmationLoading: false
    };
  },
  props: {
    data: {
      type: Object
    },
    hideBorders: {
      type: Boolean,
      default: false
    },
    canChangeAcceptation: {
      type: Boolean,
      default: false
    }
  },
  components: {
    MainPlaceInfo,
    MainUserInfo,
    MainBtn
  },
  methods: {
    ...mapActions({
      updateUserAppointmentConfirmation: "userAppointments/updateConfirmation"
    }),
    updateConfirmation: async function(val) {
      this.isConfirmationLoading = true;
      const payload = {
        id: this.data.id,
        confirmed: val
      };

      await this.updateUserAppointmentConfirmation(payload).catch(error => {
        this.$toasted.error("Wystąpił błąd");
        console.error(error);
      });

      this.isConfirmationLoading = false;
    }
  },
  computed: {
    ...mapGetters({
      viewer: "userInfo/full"
    }),
    date: function() {
      const dateSlice = this.data.date.slice(0, 10);
      return new Date(dateSlice).toLocaleDateString();
    },
    time: function() {
      return this.data.date.slice(11, 16);
    },
    viewerType: function() {
      return this.data.author && this.viewer.id === this.data.author.id ? "author" : "patient"
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../main";

.appointment {
  padding: 1rem;
  border-radius: 0.5em;
  box-shadow: 0 0 20px 0px rgba(213, 213, 213, 0.3);
  background: #fff;
  width: calc(100% - 2rem);
  &.noborders {
    padding: 0;
    border-radius: 0;
    box-shadow: none;
    background: transparent;
    width: 100%;
  }
}

.appointment__content {
  margin-top: 2em;
  margin-bottom: 1em;
  text-align: center;
}

.content__el {
  @extend %text--center;
  text-align: left;
  justify-content: left;
  padding: 1em;
  background: #fafafc;
  display: inline-flex;
  width: auto;
  font-weight: 600;
  color: #3e3e45;
  border-radius: 1rem;
  width: calc(100% - 2em);
  span {
    color: $darkviolet;
    margin-right: 10px;
  }
  &:not(:last-child) {
    margin-bottom: 1rem;
  }
}

.content__few {
  width: 100%;
  display: flex;
  div {
    justify-content: center;
  }
  div:first-child {
    margin-right: 1em;
  }
  div:last-child {
    margin-bottom: 1rem;
  }
}

.appointment__actions {
  width: 100%;
  display: flex;
  overflow: hidden;
  border-radius: 0.5em;
}

.appointment__btn {
  @extend %text--center;
  padding: 0.75em;
  display: flex;
  font-weight: 700;
  background: #eeeef3;
  color: #67676e;
  border-radius: 0;
  filter: none;
  width: 100%;
  & > span {
    @extend %text--center;
    font-size: 1.5em;
    margin-right: 0.7rem;
    span {
      margin-right: 1rem;
    }
  }
  &--confirmed {
    background: $darkviolet;
    color: #fafafa;
  }
  &--not-confirmed {
    background: #eeeef3;
    color: #67676e;
  }
}

@media only screen and (max-width: 800px) {
  .appointment {
    width: calc(100% - 2em);
    max-width: 100%;
  }
}
</style>