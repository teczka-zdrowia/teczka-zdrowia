<template>
  <div class="modal--cp">
    <h1 class="modal__title">
      Zakończ zalecenie
    </h1>

    <div class="modal__info">
      Czy na pewno chcesz zakończyć zalecenie "<b>{{ data.prescriptionName }}</b>"?
    </div>

    <div class="modal__actions">
      <button
        class="modal__btn modal__btn--grey"
        @click="hideModal"
      >Anuluj</button>
      <button
        class="modal__btn modal__btn--violet"
        @click="cancelP"
      >Zakończ zalecenie</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import "../modal.scss";

export default {
  name: "CancelPrescription",
  computed: {
    ...mapGetters({
      data: "modal/data"
    })
  },
  methods: {
    ...mapActions({
      hideModal: "modal/hide"
    }),
    cancelP() {
      //TODO

      this.hideModal();
    }
  }
};
</script>