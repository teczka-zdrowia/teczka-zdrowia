<template>
  <form
    class="modal--cp"
    @submit.prevent="getPesel"
  >
    <h1 class="modal__title">
      Potwierdź czynność hasłem
    </h1>

    <div class="modal__info">
      <MainInput class="many novalid">
        Hasło
        <input
          type="password"
          name="password"
          minlength="8"
          v-model="password"
          placeholder="••••••••••••••••"
          required
        >
      </MainInput>
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
        @click="getPesel"
      >Pokaż PESEL</MainBtn>
    </div>
  </form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import MainInput from '../../ui/basic/MainInput'
import MainBtn from '../../ui/basic/MainBtn'
import '../modal.scss'

export default {
  name: 'ConfirmGetPESEL',
  data: function () {
    return {
      password: '',
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
      getUserPESEL: 'userInfo/getPESEL'
    }),
    getPesel () {
      this.isLoading = true
      this.getUserPESEL(this.password)
        .then(() => this.hideModal())
        .catch(error => {
          this.$toasted.error('Niepoprawne hasło')
          console.error(error)
        })
        .finally(() => {
          this.isLoading = false
        })
    }
  }
}
</script>
