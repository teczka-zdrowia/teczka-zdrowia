<template>
  <div class="modal--pi">

    <div class="modal--pi__content">
      <div class="modal--pi__top">
        <img
          class="modal--pi__img"
          :src="data.img"
        >
        <div class="modal--pi__name">
          <span>{{ data.name }}</span>
          <span>{{ data.surname }}</span>
        </div>
      </div>
      <div class="modal--pi__info">
        <div class="modal--pi__info__el">
          <i class="fas fa-phone" />
          <a :href="`tel:${ data.phone }`">
            {{ data.phone }}</a>
        </div>
        <div class="modal--pi__info__el">
          <i class="far fa-envelope" />
          <a :href="`mailto:${ data.email }`">
            {{ data.email }}</a>
        </div>

        <div class="modal--pi__info__el">
          <a href="#">
            <i class="fas fa-file-medical" />
            Kartkoteka</a>
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
  name: "PatientInfo",
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

.modal--pi {
  &__top {
    padding: 1rem;
    width: calc(100% - 2rem);
    color: #3e3e45;
    font-weight: 700;
    text-align: center;
    background: #ececec;
    font-size: 1.5rem;
    display: flex;
    height: 7rem;
  }
  &__img {
    display: block;
    width: 4rem;
    margin: auto 0;
    border-radius: 1rem;
    border: 5px solid #fafafa;
    margin-right: 1rem;
  }
  &__name {
    @extend %text--center;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
  }
  &__content {
    border-radius: 0.5em;
    box-shadow: 0 0 20px 0px rgba(213, 213, 213, 0.3);
    background: #fafafc;
    overflow: hidden;
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
      & > i {
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
        transition: 0.2s ease-in-out;
        &:only-child {
          margin-left: 0;
          background: #ececec;
          text-align: center;
          i {
            margin-right: 1rem;
          }
        }
        &:hover {
          filter: brightness(95%);
        }
      }
    }
  }
}
</style>
