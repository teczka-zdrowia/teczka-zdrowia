<template>
  <div class="modal--di">
    <img
      class="modal--di__img"
      :src="data.img"
    >

    <div class="modal--di__content">
      <div class="modal--di__title">
        {{ data.name }}
      </div>
      <div class="modal--di__spec">
        {{ data.spec }}
      </div>
      <div class="modal--di__info">
        <div class="modal--di__info__el">
          <i class="fas fa-phone" />
          <a :href="`tel:${ data.phone }`">
            {{ data.phone }}</a>
        </div>
        <div class="modal--di__info__el">
          <i class="far fa-envelope" />
          <a :href="`mailto:${ data.email }`">
            {{ data.email }}</a>
        </div>
      </div>
      <button
        class="modal__btn fullwidth modal__btn--grey"
        @click="hideModal"
      >Zamknij</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import "../modal.scss";

export default {
  name: "DoctorInfo",
  computed: {
    ...mapGetters({
      data: "modal/data"
    })
  },
  methods: {
    ...mapActions({
      hideModal: "modal/hide"
    })
  }
};
</script>

<style lang="scss" scoped>
@import "../../../main";

.modal--di {
  &__img {
    display: block;
    width: 33%;
    margin: auto;
    margin-bottom: -1.5rem;
    border-radius: 2rem;
    border: 5px solid #fafafa;
  }
  &__content {
    border-radius: 0.5em;
    box-shadow: 0 0 20px 0px rgba(213, 213, 213, 0.3);
    background: #fafafc;
    overflow: hidden;
  }
  &__title {
    padding: 1rem;
    padding-top: 2rem;
    width: calc(100% - 2rem);
    color: #3e3e45;
    font-weight: 700;
    text-align: center;
    background: #ececec;
    font-size: 1.5rem;
  }
  &__spec {
    padding: 1rem;
    width: calc(100% - 2rem);
    color: #67676e;
    font-weight: 600;
    background: #f5f5f5;
    text-align: center;
  }
  &__info {
    padding: 1.5rem;
    &__title {
      font-size: 1.25rem;
      font-weight: 600;
      padding-bottom: 0.5rem;
    }
    &__el {
      padding: 0.5rem 0;
      display: flex;
      i {
        padding: 1rem;
        border-radius: 0.5rem;
        background: #ececec;
      }
      a {
        margin-left: 1rem;
        font-weight: 600;
        padding: 1rem;
        border-radius: 0.5rem;
        background: #f5f5f5;
        width: 100%;
      }
    }
  }
}
</style>
