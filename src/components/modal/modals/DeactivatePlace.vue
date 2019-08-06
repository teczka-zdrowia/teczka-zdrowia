<template>
  <div
    class="modal--da"
    @sumbit.prevent="deactivatePlace"
  >
    <h1 class="modal__title">
      Dezaktywacja gabinetu
    </h1>

    <div class="modal__info">
      Czy na pewno chcesz dezaktywować gabinet <b>{{ place.name }}</b>?
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
        color="#fafafa"
        @click.native="deactivatePlace"
      >Dezaktywuj</MainBtn>
    </div>
  </div>
</template>

<script>
import MainBtn from "../../ui/basic/MainBtn";

import { mapActions, mapGetters } from "vuex";

import "../modal.scss";

export default {
  name: "DeactivatePlace",
  data: function() {
    return {
      isLoading: false
    };
  },
  computed: {
    ...mapGetters({
      place: "modal/data"
    })
  },
  methods: {
    ...mapActions({
      hideModal: "modal/hide",
      updatePlace: "userRoles/updatePlace"
    }),
    deactivatePlace: function() {
      this.isLoading = true;

      const payload = {
        id: this.place.id,
        data: {
          is_active: false
        }
      };

      this.updatePlace(payload)
        .then(() => this.hideModal())
        .catch(error => {
          this.$toasted.error("Wystąpił błąd");
          console.error(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    }
  },
  components: {
    MainBtn
  }
};
</script>