<template>
  <div class="modal--da">
    <h1 class="modal__title">
      Dezaktywacja gabinetu
    </h1>

    <div class="modal__info">
      Czy na pewno chcesz dezaktywować gabinet "<b>{{ data.place.name }}</b>"?
    </div>

    <div class="modal__actions">
      <button
        class="modal__btn modal__btn--grey"
        @click="hideModal"
      >Anuluj</button>
      <button
        class="modal__btn modal__btn--red"
        @click="deactPlace"
      >Dezaktywuj</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import "../modal.scss";

export default {
  name: "DeleteAccount",
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