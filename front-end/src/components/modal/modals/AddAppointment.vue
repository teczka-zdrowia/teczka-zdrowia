<template>
  <div class="modal--aa">
    <AddAppointmentComponent />
    <div class="modal__actions">
      <button
        class="modal__btn modal__btn--grey"
        v-on:click="hideModal"
      >Anuluj</button>
      <button
        class="modal__btn modal__btn--violet"
        v-on:click="addAppointment"
      >Dodaj wizytę</button>
    </div>
  </div>
</template>

<script>
import AddAppointmentComponent from "../../ui/AddAppointmentComponent";

import { mapActions, mapGetters } from "vuex";

import "../modal.scss";

export default {
  name: "AddPatient",
  components: { AddAppointmentComponent },
  computed: {
    ...mapGetters({
      data: "modal/data"
    })
  },
  methods: {
    ...mapActions({
      hideModal: "modal/hide"
    }),
    addAppointment: function() {
      // do nothing
    }
  }
};
</script>

<style lang="scss" scoped>
.modal--aa {
  display: flex;
  flex-direction: column;
  background: #f5f5f5;
  border-radius: 0.5rem;
  .modal__actions {
    padding: 1rem;
  }
}

@media only screen and (max-width: 720px) {
  .modal--aa {
    width: 100vw;
    border-radius: 0;
    height: calc(100vh - 56px);
  }
}
</style>
