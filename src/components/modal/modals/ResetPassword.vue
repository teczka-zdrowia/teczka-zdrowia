<template>
  <form
    class="modal--rp"
    @submit.prevent="sendPasswordReset"
  >
    <h1 class="modal__title">
      Przypomnij hasło
    </h1>

    <div class="modal__info">
      <MainInput v-if="!sent">
        Email
        <input
          type="email"
          name="email"
          minlength="4"
          v-model="email"
          placeholder="jan@kowalski.com"
          required
        >
      </MainInput>
      <GreyBlock v-if="sent">
        E-mail wysłany
      </GreyBlock>
    </div>

    <div class="modal__actions">
      <button
        class="modal__btn modal__btn--grey"
        @click="hideModal"
        type="button"
      >Zamknij
      </button>
      <MainBtn
        class="modal__btn modal__btn--violet"
        v-if="!sent"
        :loading="isLoading"
        :disabled="isLoading"
        color="#fafafa"
        @click="sendPasswordReset"
      >Wyślij email
      </MainBtn>
    </div>
  </form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import MainInput from '../../ui/basic/MainInput'
import MainBtn from '../../ui/basic/MainBtn'
import '../modal.scss'
import handleErrors from '../../../utils/handleErrors'

export default {
  name: 'ConfirmGetPESEL',
  data: function () {
    return {
      email: '',
      sent: false,
      isLoading: false
    }
  },
  components: {
    MainInput,
    MainBtn
  },
  computed: {
    ...mapGetters({
      data: 'modal/data'
    })
  },
  methods: {
    ...mapActions({
      hideModal: 'modal/hide',
      forgotPassword: 'userInfo/forgotPassword'
    }),
    sendPasswordReset: async function () {
      this.isLoading = true

      const payload = {
        email: this.email
      }

      await this.forgotPassword(payload)
        .then(() => {
          this.$toasted.success(
            'Wysłano e-mail z linkiem do zresetowania hasła'
          )
          this.sent = true
        })
        .catch(errors => handleErrors(errors))

      this.isLoading = false
    }
  }
}
</script>
