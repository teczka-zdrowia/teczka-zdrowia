<template>
  <form
    class="modal--cpass"
    @submit.prevent="changePassword"
  >
    <h1 class="modal__title">
      Zmiana hasła
    </h1>

    <div class="modal__info">
      <div class="modal__form">
        <MainInput class="many novalid">
          Obecne hasło
          <input
            type="password"
            name="password"
            minlength="8"
            v-model="data.password"
            placeholder="••••••••••••••••"
            required
          >
        </MainInput>
        <MainInput class="many">
          Nowe hasło
          <input
            type="password"
            name="new_password"
            minlength="8"
            v-model="data.new_password"
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
            name="new_password_confirmation"
            minlength="8"
            v-model="data.new_password_confirmation"
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
      >Anuluj
      </button>
      <MainBtn
        class="modal__btn modal__btn--violet"
        :loading="isLoading"
        :disabled="isLoading"
        color="#fafafa"
        @click="changePassword"
      >Zmień hasło
      </MainBtn>
    </div>
  </form>
</template>

<script>
import { mapActions } from 'vuex'
import MainInput from '../../ui/basic/MainInput'
import MainBtn from '../../ui/basic/MainBtn'
import '../modal.scss'
import handleErrors from '../../../utils/handleErrors'

export default {
  name: 'ChangePassword',
  data: function () {
    return {
      isLoading: false,
      data: {
        password: '',
        new_password: '',
        new_password_confirmation: ''
      }
    }
  },
  components: {
    MainInput,
    MainBtn
  },
  methods: {
    ...mapActions({
      hideModal: 'modal/hide',
      updateUserPassword: 'userInfo/updatePassword'
    }),
    changePassword () {
      this.isLoading = true
      this.updateUserPassword(this.data)
        .then(() => this.hideModal())
        .catch(errors => handleErrors(errors))
        .finally(() => {
          this.isLoading = false
        })
    }
  },
  computed: {
    isPasswordsSame: function () {
      return this.data.new_password === this.data.new_password_confirmation
    }
  }
}
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
