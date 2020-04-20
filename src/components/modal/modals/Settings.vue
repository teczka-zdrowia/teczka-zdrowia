<template>
  <div class="modal--s">
    <div class="modal--s__content">
      <MainViewSwitch class="modal--s__el"/>
      <button
        class="modal__btn fullwidth rounded modal__btn--grey"
        type="button"
        @click="hideModal"
      >Zamknij
      </button>
    </div>
  </div>
</template>

<script>
import MainViewSwitch from '../../ui/basic/MainViewSwitch'
import '../modal.scss'

import { mapActions } from 'vuex'

export default {
  name: 'Settings',
  components: {
    MainViewSwitch
  },
  methods: {
    ...mapActions({
      hideModal: 'modal/hide'
    })
  }
}
</script>

<style lang="scss" scoped>
  @import "../../../main";

  .modal--s {
    &__el {
      margin-bottom: 1rem;
    }
  }
</style>
