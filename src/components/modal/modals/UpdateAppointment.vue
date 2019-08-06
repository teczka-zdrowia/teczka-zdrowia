<template>
  <form
    class="modal--ua"
    @submit.prevent="updateAppointment"
  >
    <UpdateAppointmentComponent />
    <div class="modal__actions">
      <button
        class="modal__btn modal__btn--grey"
        type="button"
        v-on:click="hideModal"
      >Anuluj</button>
      <MainBtn
        class="modal__btn modal__btn--violet"
        :loading="isLoading"
        :disabled="isLoading"
        color="#fafafa"
        v-on:click="updateAppointment"
      >Zaktualizuj wizytę</MainBtn>
    </div>
  </form>
</template>

<script>
import UpdateAppointmentComponent from "../../ui/UpdateAppointmentComponent";
import MainBtn from "../../ui/basic/MainBtn";
import { mapActions, mapGetters } from "vuex";

import "../modal.scss";

export default {
  name: "UpdateAppointment",
  data: function() {
    return {
      isLoading: false
    };
  },
  computed: {
    ...mapGetters({
      data: "modal/data",
      appointmentData: "updateAppointment/data",
      appointmentOldData: "updateAppointment/oldData"
    })
  },
  methods: {
    ...mapActions({
      hideModal: "modal/hide",
      showModal: "modal/show",
      updateUserAppointment: "updateAppointment/update"
    }),
    updateAppointment: async function() {
      this.isLoading = true;

      const payload = {
        id: this.appointmentOldData.id,
        data: this.appointmentData
      };

      await this.updateUserAppointment(payload)
        .then(appointment => {
          this.$toasted.success("Poprawnie zaktualizowano wizytę");
          this.showModal({
            componentName: "AppointmentInfo",
            data: {
              hideBorders: true,
              viewerType: "author",
              appointment: appointment
            }
          });
        })
        .catch(error => {
          console.error(error);
          this.$toasted.error("Wystąpił błąd");
        });

      this.isLoading = false;
    }
  },
  components: {
    UpdateAppointmentComponent,
    MainBtn
  }
};
</script>

<style lang="scss" scoped>
.modal--ua {
  display: flex;
  flex-direction: column;
  background: #f5f5f5;
  border-radius: 0.5rem;
  .modal__actions {
    padding: 1rem;
  }
}

@media only screen and (max-width: 720px) {
  .modal--ua {
    width: 100vw;
    border-radius: 0;
    height: calc(100vh - 56px);
  }
}
</style>
