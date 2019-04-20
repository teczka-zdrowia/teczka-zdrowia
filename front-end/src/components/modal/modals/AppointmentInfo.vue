<template>
  <div class="modal--ai">
    <Appointment :data="data.appointment" />
    <div
      class="modal__actions fullwidth modal--ai__action"
      v-if="data.canEdit"
    >
      <button class="modal__btn fullwidth modal__btn--violet">
        <span
          aria-hidden="true"
          class="fas fa-pen"
        />
        Edytuj
      </button>
      <button class="modal__btn fullwidth modal__btn--grey">
        <span
          aria-hidden="true"
          class="fas fa-lock"
        />
        Dezaktywuj
      </button>
    </div>

    <button
      class="modal__btn fullwidth modal__btn--grey modal--ai__action"
      @click="hideModal"
    >Zamknij</button>
  </div>
</template>

<script>
import AppointmentDesktop from "../../ui/appointments/AppointmentDesktop";
import { mapActions, mapGetters } from "vuex";
import "../modal.scss";

export default {
  name: "AppointmentInfo",
  components: {
    Appointment: AppointmentDesktop
  },
  computed: {
    ...mapGetters({
      data: "modal/data"
    })
  },
  methods: {
    ...mapActions({
      hideModal: "modal/hide"
    })
  }
};
</script>

<style lang="scss" scoped>
.modal--ai {
  &__action {
    margin-top: 1rem;
    border-radius: 0.5rem;
    overflow: hidden;
  }
}
</style>

