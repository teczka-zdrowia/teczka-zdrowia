<template>
  <div
    class="modal--ai"
    v-show="!isLoading"
  >
    <Appointment
      :data="data.appointment"
      :viewerType="data.viewerType"
    />
    <div
      class="modal__actions fullwidth modal--ai__action"
      v-if="data.viewerType === 'author'"
    >
      <button
        class="modal__btn fullwidth modal__btn--violet"
        v-on:click="edit"
      >
        <span
          aria-hidden="true"
          class="fas fa-pen"
        />
        Edytuj
      </button>
      <button
        class="modal__btn fullwidth modal__btn--red"
        v-on:click="deleteAppointment"
      >
        <span
          aria-hidden="true"
          class="fas fa-times"
        />
        Usuń
      </button>
    </div>

    <button
      class="modal__btn fullwidth rounded modal__btn--grey modal--ai__action"
      type="button"
      @click="hideModal"
    >Zamknij</button>
  </div>
</template>

<script>
import AppointmentBig from "../../ui/appointments/AppointmentBig";
import { mapActions, mapGetters } from "vuex";
import "../modal.scss";

export default {
  name: "AppointmentInfo",
  data: function() {
    return {
      isLoading: false
    };
  },
  components: {
    Appointment: AppointmentBig
  },
  computed: {
    ...mapGetters({
      data: "modal/data",
      isMobile: "window/isMobile"
    })
  },
  methods: {
    ...mapActions({
      hideModal: "modal/hide",
      showModal: "modal/show",
      setUpdateAppointmentOldData: "updateAppointment/setOldData",
      setUpdateAppointmentData: "updateAppointment/setData",
      deleteUserAppointment: "updateAppointment/delete"
    }),
    edit: function() {
      const appointmentData = this.data.appointment;

      this.setUpdateAppointmentOldData({
        id: appointmentData.id,
        place: appointmentData.place,
        patient: appointmentData.patient
      });

      this.setUpdateAppointmentData({
        note: appointmentData.note,
        date: appointmentData.date
      });

      if (this.isMobile) {
        this.hideModal();
        this.$router.push({ name: "UpdateAppointment" });
      } else {
        this.showModal({
          componentName: "UpdateAppointment",
          data: {
            hideBorders: true
          }
        });
      }
    },
    deleteAppointment: async function() {
      const appointmentData = this.data.appointment;

      this.isLoading = true;

      await this.deleteUserAppointment(appointmentData.id)
        .then(() => {
          this.$toasted.success("Pomyślnie usunięto wizytę");
          this.hideModal();
        })
        .catch(error => {
          this.$toasted.error("Wystąpił błąd");
          console.error(error);
        });

      this.isLoading = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.modal--ai {
  &__action {
    margin-top: 1rem;
    border-radius: 0.5rem;
    overflow: hidden;
    span {
      margin-right: 0.5rem;
    }
  }
}
</style>

