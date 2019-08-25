<template>
  <form
    class="modal--cp"
    @submit.prevent="createPatient"
  >
    <AddPatientComponent />
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
        v-if="processCompleted"
        v-on:click.native="createPatient"
      >Dodaj pacjenta</MainBtn>
    </div>
  </form>
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
      processCompleted: "addPatient/isCompleted",
      patient: "addPatient/patient",
      place: "addPatient/place"
    })
  },
  methods: {
    ...mapActions({
      modalVisible: "modal/visible",
      hideModal: "modal/hide",
      createPlacePatientRole: "placePatients/createRole",
      clearData: "addPatient/clear"
    }),
    createPatient: async function() {
      this.isLoading = true;
      const payload = {
        userId: this.patient.id,
        placeId: this.place.id
      };

      this.createPlacePatientRole(payload)
        .then(() => {
          this.$toasted.success("Poprawnie dodano pacjenta");
          this.hideModal();
        })
        .catch(error => {
          console.error(error);
          const graphQLErrors = error.graphQLErrors;
          const validation = graphQLErrors
            ? graphQLErrors[0].extensions.validation
            : null;
          const errorMessage = validation
            ? validation[Object.keys(validation)[0]][0]
            : "Wystąpił nieznany błąd";
          this.$toasted.error(errorMessage);
        })
        .finally(() => {
          this.isLoading = false;
        });
    }
  },
  mounted() {
    this.clearData();
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
