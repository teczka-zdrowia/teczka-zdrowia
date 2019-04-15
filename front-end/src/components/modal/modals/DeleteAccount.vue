<template>
  <div class="modal--da">
    <h1 class="modal__title">
      Usuwanie konta
    </h1>

    <div class="modal__info">
      Czy na pewno chcesz usunąć swoje konto w Teczce Zdrowia? <b>Jest to czynność nieodwracalna.</b>
    </div>

    <div class="modal__actions">
      <button
        class="modal__btn modal__btn--grey"
        @click="hideModal"
      >Anuluj</button>
      <button
        class="modal__btn modal__btn--red"
        @click="deleteAcc"
      >Usuń konto</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

import "../modal.scss";

export default {
  name: "DeleteAccount",
  methods: {
    ...mapActions({
      hideModal: "modal/hide"
    }),
    deleteAcc() {
      //TODO

      this.hideModal();
    }
  }
};
</script>