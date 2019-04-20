<template>
  <div class="modal--cp">
    <CreatePlaceComponent ref="createPlaceComponent" />
    <div class="modal__actions">
      <button
        class="modal__btn modal__btn--grey"
        @click="hideModal"
      >Anuluj</button>
      <button
        class="modal__btn modal__btn--violet"
        @click="cPlace"
      >Utwórz gabinet</button>
    </div>
  </div>
</template>

<script>
import CreatePlaceComponent from "../../ui/CreatePlaceComponent";

import { mapActions, mapGetters } from "vuex";

import "../modal.scss";

export default {
  name: "CreatePlace",
  components: {
    CreatePlaceComponent
  },
  computed: {
    ...mapGetters({
      data: "modal/data"
    })
  },
  methods: {
    ...mapActions({
      hideModal: "modal/hide"
    }),
    cPlace: function() {
      const create = this.$refs.createPlaceComponent.createPlace();
      if (create) {
        // TODO
        this.hideModal();
      }
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
