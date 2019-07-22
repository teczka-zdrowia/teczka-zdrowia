<template>
  <div class="modal--cp">
    <AddPatientComponent />
    <div class="modal__actions">
      <button
        class="modal__btn modal__btn--grey"
        v-on:click="hideModal"
      >Anuluj</button>
      <MainBtn
        class="modal__btn modal__btn--violet"
        :loading="isLoading"
        :disabled="isLoading"
        v-if="processCompleted"
        v-on:click="addPatient"
      >Dodaj pacjenta</MainBtn>
    </div>
  </div>
</template>

<script>
import AddPatientComponent from "../../ui/AddPatientComponent";
import MainBtn from "../../ui/basic/MainBtn";
import { mapActions, mapGetters } from "vuex";

import "../modal.scss";

export default {
  name: "AddPatient",
  components: {
    AddPatientComponent,
    MainBtn
  },
  data: function() {
    return {
      isLoading: false
    };
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
      addPlacePatient: "addPatient/add"
    }),
    addPatient: function() {
      this.addPlacePatient();
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
