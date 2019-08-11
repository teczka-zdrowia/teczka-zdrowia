<template>
  <form
    class="modal--ufp"
    @submit.prevent="updateForgottenPassword"
  >
    <h1 class="modal__title">
      Zmiana hasła
    </h1>

    <div class="modal__info">
      <div class="modal__form">
        <MainInput class="many">
          Nowe hasło
          <input
            type="password"
            name="password"
            minlength="8"
            v-model="data.password"
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
            name="password_confirmation"
            minlength="8"
            v-model="data.password_confirmation"
            placeholder="••••••••••••••••"
            required
          >
        </MainInput>
      </div>
    </div>

    <div class="modal__actions">
      <button
        class="modal__btn modal__btn--grey"
        @click="hideModal"
        type="button"
      >Anuluj</button>
      <MainBtn
        class="modal__btn modal__btn--violet"
        :loading="isLoading"
        :disabled="isLoading"
        color="#fafafa"
        @click="changePassword"
      >Zmień hasło</MainBtn>
    </div>
  </form>
</template>

<script>
import { mapActions } from "vuex";
import MainInput from "../../ui/basic/MainInput";
import MainBtn from "../../ui/basic/MainBtn";
import "../modal.scss";

export default {
  name: "ChangePassword",
  data: function() {
    return {
      isLoading: false,
      data: {
        password: "",
        password_confirmation: ""
      }
    };
  },
  components: {
    MainInput,
    MainBtn
  },
  methods: {
    ...mapActions({
      hideModal: "modal/hide",
      modalData: "modal/data",
      updateForgottenPassword: "userInfo/updateForgottenPassword"
    }),
    changePassword: function() {
      this.isLoading = true;
      const payload = {
        ...data,
        ...modalData
      };

      this.updateUserPassword(payload)
        .then(() => {
          this.$toasted.succcess("Pomyślnie zaktualizowano hasło");
          this.hideModal();
        })
        .catch(error => {
          this.$toasted.error("Niepoprawne dane");
          console.error(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    }
  },
  computed: {
    isPasswordsSame: function() {
      return this.data.password === this.data.password_confirmation;
    }
  }
};
</script>

<style lang="scss" scoped>
.modal__form {
  border: 1px solid rgba(145, 145, 156, 0.3);
  border-radius: 0.5rem;
  label {
    background: #f5f5f5 !important;
    padding: 1.5rem !important;
    width: calc(100% - 3rem) !important;
    border: 0 !important;
    border-bottom: 1px solid rgba(145, 145, 156, 0.3) !important;
  }
}
</style>
