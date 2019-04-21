<template>
  <div class="patient">
    <div class="patient__img">
      <img
        :src="patient.img"
        :alt="patient.name"
      >
    </div>
    <div class="patient__info">
      <div class="patient__info__name">
        {{ patient.name }} ({{ patientAge }} lat)
      </div>
      <a
        class="patient__info__phone"
        :href="`tel:${patient.phone}`"
      >
        <span
          aria-hidden="true"
          class="fas fa-phone"
        />
        {{ patient.phone}}
      </a>
      <a
        class="patient__info__email"
        :href="`mailto:${patient.email}`"
      >
        <span
          aria-hidden="true"
          class="fas fa-envelope"
        />
        {{ patient.email}}
      </a>
    </div>
  </div>
</template>

<script>
const moment = require("moment");
moment.locale("pl");

export default {
  name: "MainPatientBlockInfo",
  props: {
    patient: {
      type: Object,
      default: function() {
        return {
          img: "/static/img/icons/profile-icon-720x720.png",
          name: "Brak danych",
          email: "Brak danych",
          phone: "Brak danych",
          birthdate: null
        };
      }
    }
  },
  computed: {
    patientAge: function() {
      return this.patientBirthdate
        ? Math.abs(
            moment(this.patientBirthdate, "DD.MM.YYYY").diff(moment(), "years")
          )
        : "brak";
    },
    patientBirthdate: function() {
      return this.patient.birthdate
        ? moment(this.patient.birthdate, "YYYY-MM-DD HH:MI:SS").format(
            "DD.MM.YYYY"
          )
        : null;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../main";

.patient {
  width: 100%;
  display: flex;
  background: #f5f5f5;
  border-radius: 0.5rem;
  overflow: hidden;
  &__img {
    padding: 1rem;
    img {
      @extend %text--center;
      height: 5rem;
      border-radius: 1rem;
    }
  }
  &__info {
    background: #ececec;
    padding: 1rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    span {
      padding-right: 1rem;
    }
    &__name {
      font-weight: 700;
    }
    &__phone,
    &__email {
      font-weight: 600;
    }
  }
}
</style>
