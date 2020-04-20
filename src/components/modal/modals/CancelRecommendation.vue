<template>
  <form
    class="modal--cp"
    @submit.prevent="cancelRecommendation"
  >
    <h1 class="modal__title">
      Zakończ zalecenie
    </h1>

    <div class="modal__info">
      Czy na pewno chcesz zakończyć zalecenie "<b>{{ recommendation.title }}</b>"?
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
        @click="cancelRecommendation"
      >Zakończ zalecenie
      </MainBtn>
    </div>
  </form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import MainBtn from '../../ui/basic/MainBtn'
import handleErrors from '../../../utils/handleErrors'

import '../modal.scss'

export default {
  name: 'CancelRecommendation',
  data: function () {
    return {
      isLoading: false
    }
  },
  components: {
    MainBtn
  },
  computed: {
    ...mapGetters({
      recommendation: 'modal/data',
      recommendationsListPaginatorInfo: 'userRecommendations/paginatorInfo'
    })
  },
  methods: {
    ...mapActions({
      hideModal: 'modal/hide',
      updateRecommendation: 'userRecommendations/update'
    }),
    cancelRecommendation () {
      this.isLoading = true
      const data = {is_active: false}
      const id = this.recommendation.id
      const payload = {
        id: id,
        data: data
      }

      this.updateRecommendation(payload)
        .then(() => this.hideModal())
        .catch(errors => handleErrors(errors))
        .finally(() => {
          this.isLoading = false
        })
    }
  }
}
</script>
