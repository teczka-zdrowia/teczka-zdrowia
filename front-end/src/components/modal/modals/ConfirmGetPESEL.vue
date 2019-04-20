<template>
  <div class="modal--cp">
    <h1 class="modal__title">
      Potwierdź czynność hasłem
    </h1>

    <form class="modal__info">
      <MainInput class="many novalid">
        Hasło
        <input
          type="password"
          name="password"
          minlength="6"
          v-model="password"
          placeholder="••••••••••••••••"
          required
        >
      </MainInput>
    </form>

    <div class="modal__actions">
      <button
        class="modal__btn modal__btn--grey"
        @click="hideModal"
      >Anuluj</button>
      <button
        class="modal__btn modal__btn--violet"
        @click="getPESEL"
      >Pokaż PESEL</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import MainInput from "../../ui/basic/MainInput";
import "../modal.scss";

export default {
  name: "ConfirmGetPESEL",
  data: function() {
    return {
      password: ""
    };
  },
  components: {
    MainInput
  },
  computed: {
    ...mapGetters({
      data: "modal/data"
    })
  },
  methods: {
    ...mapActions({
      hideModal: "modal/hide",
      updatePESEL: "userInfo/updatePESEL"
    }),
    getPESEL() {
      //TODO
      this.updatePESEL(1111);
      this.hideModal();
    }
  }
};
</script>