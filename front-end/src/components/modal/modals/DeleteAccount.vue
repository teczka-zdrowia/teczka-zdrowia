<template>
  <form
    class="modal--da"
    @submit.prevent="deleteAccount"
  >
    <h1 class="modal__title">
      Usuwanie konta
    </h1>

    <div class="modal__info">
      <div class="modal--da__top">
        Czy na pewno chcesz usunąć swoje konto w Teczce Zdrowia?<br>
        <b>Jest to czynność nieodwracalna.</b>
      </div>

      <MainInput class="many novalid">
        Hasło
        <input
          type="password"
          name="password"
          minlength="8"
          v-model="data.password"
          placeholder="••••••••••••••••"
          required
        >
      </MainInput>

      <div class="modal--da__checkbox">
        <input
          v-model="data.delete_all_files"
          type="checkbox"
          id="deleteAllFiles"
        >
        <label
          for="deleteAllFiles"
          class="checkbox--modal--da"
        />
        <p>Usuń wszystkie moje pliki</p>
      </div>
    </div>

    <div class="modal__actions">
      <button
        class="modal__btn modal__btn--grey"
        @click="hideModal"
        type="button"
      >Anuluj</button>
      <MainBtn
        class="modal__btn modal__btn--red"
        :loading="isLoading"
        :disabled="isLoading"
        @click="deleteAccount"
      >Usuń konto</MainBtn>
    </div>
  </form>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import MainBtn from "../../ui/basic/MainBtn";
import MainInput from "../../ui/basic/MainInput";
import "../modal.scss";

export default {
  name: "DeleteAccount",
  data: function() {
    return {
      isLoading: false,
      data: {
        password: "",
        delete_all_files: false
      }
    };
  },
  components: {
    MainBtn,
    MainInput
  },
  methods: {
    ...mapActions({
      hideModal: "modal/hide",
      deleteUser: "userInfo/delete"
    }),
    deleteAccount() {
      this.isLoading = true;
      this.deleteUser(this.data)
        .then(() => {
          this.$router.push({ name: "Auth" });
          this.$toasted.success("Pomyślnie usunięto konto");
          this.hideModal();
        })
        .catch(error => {
          this.$toasted.error("Niepoprawne hasło");
          console.error(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../main";

.modal--da__top {
  margin-bottom: 1rem;
}

.modal--da__checkbox {
  display: flex;
  margin-top: 1rem;
  & > input {
    display: none !important;
  }
  .checkbox--modal--da {
    height: 1em;
    width: 1em;
    border-radius: 0.2em;
    border: 2px solid #1a1b37;
    margin-right: 0.5em;
    cursor: pointer;
    transition: 0.2s ease-in-out;
  }
  input:checked + label {
    background: $darkviolet;
    border: 2px solid $darkviolet;
    &:after {
      content: "";
      font-family: $font-awesome;
      font-weight: 600;
      font-size: 0.7em;
      color: #fafafa;
      height: 100%;
      @extend %text--center;
    }
  }
  p {
    margin: 0;
    margin-top: 1px;
    font-weight: 550;
    color: #1a1b37;
  }
}
</style>
