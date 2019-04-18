<template>
  <div class="modal--da">
    <h1 class="modal__title">
      Aktywacja gabinetu
    </h1>

    <div class="modal__info">
      Czy na pewno chcesz aktywować gabinet <b>{{ data.place.name }}</b>?
    </div>

    <div class="modal__actions">
      <button
        class="modal__btn modal__btn--grey"
        @click="hideModal"
      >Anuluj</button>
      <button
        class="modal__btn modal__btn--violet"
        @click="deactPlace"
      >Aktywuj</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import "../modal.scss";

export default {
  name: "ActivatePlace",
  computed: {
    ...mapGetters({
      data: "modal/data"
    })
  },
  methods: {
    ...mapActions({
      hideModal: "modal/hide"
    }),
    deactPlace() {
      //TODO

      this.hideModal();
    }
  }
};
</script>