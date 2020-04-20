<template>
  <form
    class="modal--cp"
    @submit.prevent="createPlace"
  >
    <CreatePlaceComponent
      v-on:loading="isLoading = $event"
      v-on:finished="hideModal"
      ref="createPlaceComponent"
    />
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
        @click="createPlace"
      >Utwórz gabinet
      </MainBtn>
    </div>
  </form>
</template>

<script>
import CreatePlaceComponent from '../../ui/CreatePlaceComponent'
import MainBtn from '../../ui/basic/MainBtn'

import { mapActions, mapGetters } from 'vuex'

import '../modal.scss'

export default {
  name: 'CreatePlace',
  data: function () {
    return {
      isLoading: false
    }
  },
  components: {
    CreatePlaceComponent,
    MainBtn
  },
  computed: {
    ...mapGetters({
      data: 'modal/data'
    })
  },
  methods: {
    ...mapActions({
      hideModal: 'modal/hide'
    }),
    createPlace: function () {
      this.$refs.createPlaceComponent.createPlace()
    }
  }
}
</script>

<style lang="scss" scoped>
  .modal--cp {
    .modal__actions {
      margin-top: 1rem;
    }
  }
</style>
