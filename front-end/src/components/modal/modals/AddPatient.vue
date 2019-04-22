<template>
  <div class="modal--cp">
    <AddPatientComponent />
    <div class="modal__actions">
      <button
        class="modal__btn modal__btn--grey"
        v-on:click="hideModal(); clearData()"
      >Anuluj</button>
      <button
        class="modal__btn modal__btn--violet"
        v-if="processCompleted"
        v-on:click="addPatient"
      >Dodaj pacjenta</button>
    </div>
  </div>
</template>

<script>
import AddPatientComponent from "../../ui/AddPatientComponent";

import { mapActions, mapGetters } from "vuex";

import "../modal.scss";

export default {
  name: "AddPatient",
  components: {
    AddPatientComponent
  },
  computed: {
    ...mapGetters({
      data: "modal/data",
      processCompleted: "addPatient/isCompleted"
    })
  },
  methods: {
    ...mapActions({
      hideModal: "modal/hide",
      clearData: "addPatient/clear",
      addPatient: "addPatient/add"
    }),
    aPatient: function() {
      // TODO
      this.addPatient();
      this.hideModal();
    }
  }
};
</script>

<style lang="scss" scoped>
.modal--cp {
  .modal__actions {
    margin-top: 1rem;
  }
}
</style>
