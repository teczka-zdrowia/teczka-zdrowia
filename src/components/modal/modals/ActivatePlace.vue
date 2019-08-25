<template>
  <div class="modal--da">
    <h1 class="modal__title">
      Aktywacja gabinetu
    </h1>

    <div class="modal__info">
      Czy na pewno chcesz aktywować gabinet <b>{{ place.name }}</b>?
    </div>

    <div class="modal__actions">
      <button
        class="modal__btn modal__btn--grey"
        type="button"
        @click="hideModal"
      >Anuluj</button>
      <MainBtn
        class="modal__btn modal__btn--violet"
        :loading="isLoading"
        :disabled="isLoading"
        color="#fafafa"
        @click.native="activatePlace"
      >Aktywuj</MainBtn>
    </div>
  </div>
</template>

<script>
import MainBtn from "../../ui/basic/MainBtn";

import { mapActions, mapGetters } from "vuex";

import "../modal.scss";

export default {
  name: "ActivatePlace",
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
    activatePlace: function() {
      this.isLoading = true;

      const payload = {
        id: this.place.id,
        data: {
          is_active: true
        }
      };

      this.updatePlace(payload)
        .then(() => this.hideModal())
        .catch(error => {
          const graphQLErrors = error.graphQLErrors;
          const validation = graphQLErrors
            ? graphQLErrors[0].extensions.validation
            : null;
          const errorMessage = validation
            ? validation[Object.keys(validation)[0]][0]
            : "Wystąpił nieznany błąd";
          this.$toasted.error(errorMessage);
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
