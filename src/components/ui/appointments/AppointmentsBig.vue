<template>
  <div>
    <AppointmentBig
      :key="appointment.node.id"
      :showUserAs="showUserAs"
      :data="appointment.node"
      v-for="appointment in appointments"
    />
    <router-link
      to="/Appointments"
      class="appointments__more"
      v-if="showAppointmentsLink"
    >
      <MainBtn>
        Pokaż więcej
        <span
          aria-hidden="true"
          class="fas fa-long-arrow-alt-right"
        />
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
import MainBtn from '../basic/MainBtn'
import AppointmentBig from './AppointmentBig'

export default {
  name: 'AppointmentsBig',
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
    showUserAs: {
      type: String,
      default: 'patient'
    }
  },
  components: {
    MainBtn,
    AppointmentBig
  }
}
</script>

<style lang="scss" scoped>
  @import "../../../main";

  .appointments__more {
    width: 100%;

    & > button,
    &.button {
      width: 100%;
      padding: 1em;
      border-radius: 0.5em;
      box-shadow: 0 0 20px 0px rgba(213, 213, 213, 0.3);
      background: #eeeef3 !important;
      color: #6a6ee1 !important;
    }

    span {
      margin-left: 0.75rem;
    }
  }
</style>
