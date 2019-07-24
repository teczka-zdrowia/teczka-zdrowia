<template>
  <div class="modal--cp">
    <AddEmployeeComponent />
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
        v-on:click.native="createEmployee"
      >Dodaj pracownika</MainBtn>
    </div>
  </div>
</template>

<script>
import AddEmployeeComponent from "../../ui/AddEmployeeComponent";
import MainBtn from "../../ui/basic/MainBtn";
import { mapActions, mapGetters } from "vuex";

import "../modal.scss";

export default {
  name: "AddEmployee",
  components: {
    AddEmployeeComponent,
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
      processCompleted: "addEmployee/isCompleted",
      employee: "addEmployee/employee",
      place: "addEmployee/place"
    })
  },
  methods: {
    ...mapActions({
      modalVisible: "modal/visible",
      hideModal: "modal/hide",
      createPlaceEmployeeRole: "placeEmployees/createRole",
      clearData: "addEmployee/clear"
    }),
    createEmployee: async function() {
      this.isLoading = true;
      const payload = {
        userId: this.employee.id,
        placeId: this.place.id,
        permissionType: "EMPLOYEE"
      };

      this.createPlaceEmployeeRole(payload)
        .then(() => {
          this.$toasted.success("Poprawnie dodano pracownika");
          this.hideModal();
        })
        .catch(error => {
          console.error(error);
          this.$toasted.error("Wystąpił błąd");
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
