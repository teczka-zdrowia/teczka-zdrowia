<template>
  <div class="modal--cpass">
    <h1 class="modal__title">
      Zmiana hasła
    </h1>

    <div class="modal__info">
      <form class="modal__form">
        <MainInput class="many novalid">
          Obecne hasło
          <input
            type="password"
            name="current-password"
            minlength="6"
            v-model="currentPass"
            placeholder="••••••••••••••••"
            required
          >
        </MainInput>
        <MainInput class="many">
          Nowe hasło
          <input
            type="password"
            name="new-password"
            minlength="6"
            v-model="newPass"
            placeholder="••••••••••••••••"
            required
          >
        </MainInput>
        <MainInput
          class="many"
          v-bind:class="{ novalid: !isPasswordsSame }"
        >
          Powtórz nowe hasło
          <input
            type="password"
            name="repeat-password"
            minlength="6"
            v-model="repeatPass"
            placeholder="••••••••••••••••"
            required
          >
        </MainInput>
      </form>
    </div>

    <div class="modal__actions">
      <button
        class="modal__btn modal__btn--grey"
        @click="hideModal"
      >Anuluj</button>
      <button
        class="modal__btn modal__btn--violet"
        @click="changePass"
      >Zmień hasło</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import MainInput from "../../ui/basic/MainInput";
import "../modal.scss";

export default {
  name: "ChangePassword",
  data: function() {
    return {
      currentPass: "",
      newPass: "",
      repeatPass: ""
    };
  },
  components: {
    MainInput
  },
  methods: {
    ...mapActions({
      hideModal: "modal/hide"
    }),
    changePass() {
      //TODO

      this.hideModal();
    }
  },
  computed: {
    isPasswordsSame: function() {
      return this.newPass === this.repeatPass;
    }
  }
};
</script>

<style lang="scss" scoped>
.modal__form label {
  background: #f5f5f5 !important;
  padding: 1.5rem !important;
  width: calc(100% - 3rem) !important;
}
</style>
