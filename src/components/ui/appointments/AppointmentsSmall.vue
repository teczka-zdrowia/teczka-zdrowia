<template>
  <div>
    <transition-group name="fade">
      <AppointmentSmall
        v-for="appointment in appointments"
        :key="appointment.node.id"
        :data="appointment.node"
        :showAddedBy="showAddedBy"
        :showPlace="showPlace"
        :canEdit="canEdit"
        :showUserAs="showUserAs"
      />
    </transition-group>
    <router-link
      to="/Appointments"
      v-if="showAppointmentsLink"
    >
      <MainBtn class="appointments__more">
        <span v-if="!isLoading">
          Pokaż więcej
          <span
            aria-hidden="true"
            class="fas fa-long-arrow-alt-right"
          />
        </span>
      </MainBtn>
    </router-link>
    <MainBtn
      class="appointments__more"
      v-if="showMoreBtn"
      :disabled="loading"
      :loading="loading"
      v-on:click.native="$emit('loadNext')"
    >
      Załaduj następne
      <span
        aria-hidden="true"
        class="fas fa-long-arrow-alt-right"
      />
    </MainBtn>
  </div>
</template>

<script>
import AppointmentSmall from './AppointmentSmall'
import MainBtn from '../basic/MainBtn'

export default {
  name: 'AppointmentsSmall',
  data: function () {
    return {
      isLoading: false
    }
  },
  props: {
    showAppointmentsLink: {
      type: Boolean,
      default: false
    },
    showMoreBtn: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    appointments: {
      type: Array
    },
    showAddedBy: {
      type: Boolean,
      default: false
    },
    showPlace: {
      type: Boolean,
      default: false
    },
    canEdit: {
      type: Boolean,
      default: false
    },
    showUserAs: {
      type: String,
      default: 'patient'
    }
  },
  components: {
    MainBtn,
    AppointmentSmall
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

  .appointment__user {
    display: grid;
    grid-template-columns: 5rem auto;
    grid-template-areas: "img name" "img spec";
    grid-column-gap: 1em;
    height: 5rem;
    cursor: pointer;
    transition: 0.2s ease-in-out;
    width: 100%;
  }

  .user__img {
    grid-area: img;
    height: 4rem;
    margin: auto;
    transition: 0.2s ease-in-out;
    border-radius: 1rem;
    -webkit-filter: drop-shadow(0 0 10px rgba(213, 213, 213, 0.3));
    filter: drop-shadow(0 0 10px rgba(213, 213, 213, 0.3));
  }

  .user__name {
    @extend %text--center;
    grid-area: name;
    font-weight: 700;
    color: #3e3e45;
    justify-content: left;
    max-width: 10em;
    margin-top: auto;
    margin-bottom: 0.33em;
  }

  .user__specialization {
    @extend %text--center;
    grid-area: spec;
    font-weight: 600;
    color: #67676e;
    justify-content: left;
    margin-bottom: auto;
    margin-top: 0.33em;
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
    width: 100%;

    & > button,
    &.button {
      width: 100%;
      padding: 1em;
      margin-top: 1rem;
      border-radius: 0.5em;
      box-shadow: 0 0 20px 0px rgba(213, 213, 213, 0.3);
      background: #eeeef3 !important;
      color: #6a6ee1 !important;
    }

    span {
      margin-left: 0.75rem;
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
      height: 3.5em;
    }
  }
</style>
