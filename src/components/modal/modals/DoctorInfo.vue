<template>
  <div class="modal--di">
    <img
      class="modal--di__img"
      :alt="user.name"
      :src="user.avatar ? `${apiUrl}/storage/avatars/${user.avatar}` : '/static/img/icons/avatar.png'"
    >

    <div class="modal--di__content">
      <div class="modal--di__title">
        {{ user.name }}
      </div>
      <div class="modal--di__spec">
        {{ user.specialization || 'Ładowanie...' }}
      </div>
      <div class="modal--di__info">
        <div class="modal--di__info__el">
          <span
            aria-hidden="true"
            class="fas fa-phone"
          />
          <a :href="`tel:${ user.phone }`">
            {{ user.phone }}</a>
        </div>
        <div class="modal--di__info__el">
          <span
            aria-hidden="true"
            class="far fa-envelope"
          />
          <a :href="`mailto:${ user.email }`">
            {{ user.email || 'Ładowanie...' }}</a>
        </div>
      </div>
      <button
        class="modal__btn fullwidth modal__btn--grey"
        type="button"
        @click="hideModal"
      >Zamknij</button>
    </div>
  </div>
</template>

<script>
import { API_URL } from "@/apollo/constants";
import { mapActions, mapGetters } from "vuex";
import "../modal.scss";

export default {
  name: "DoctorInfo",
  data: function() {
    return {
      apiUrl: API_URL
    };
  },
  computed: {
    ...mapGetters({
      data: "modal/data"
    }),
    user: function() {
      return this.data.role.user;
    }
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
  max-width: 90vw;
  &__img {
    display: block;
    width: 8rem;
    height: 8rem;
    object-fit: cover;
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
      span {
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
        max-width: 15rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>
