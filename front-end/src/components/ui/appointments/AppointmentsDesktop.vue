<template>
  <div>
    <AppointmentDesktop
      :key="index"
      :data="item"
      v-for="(item, index) in userAppointments"
    />
    <router-link
      to="/Appointments"
      class="appointments__more"
      v-if="showMore"
    >
      <MainBtn>
        Pokaż więcej
        <i class="fas fa-long-arrow-alt-right"></i>
      </MainBtn>
    </router-link>
  </div>
</template>

<script>
import MainBtn from "../basic/MainBtn";
import AppointmentDesktop from "./AppointmentDesktop";

export default {
  name: "AppointmentsDesktop",
  props: {
    maxAppointments: {
      type: Number,
      default: 0
    },
    showMore: {
      type: Boolean,
      default: true
    }
  },
  components: {
    MainBtn,
    AppointmentDesktop
  },
  methods: {
    updateAcceptation: function(val) {
      //TO DO
    }
  },
  computed: {
    userAppointments: function() {
      return this.$store.getters["userAppointments/all"];
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../main";

.appointments__more {
  width: 100%;
  button {
    width: 100%;
    padding: 1em;
    border-radius: 0.5em;
    box-shadow: 0 0 20px 0px rgba(213, 213, 213, 0.3);
    background: #eeeef3 !important;
    color: #6a6ee1 !important;
  }
  i {
    margin-left: 0.75rem;
  }
}
</style>