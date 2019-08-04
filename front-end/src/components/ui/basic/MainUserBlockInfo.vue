<template>
  <div class="user">
    <div class="user__img">
      <img
        :src="user.avatar ? `${apiUrl}/storage/avatars/${user.avatar}` : '/static/img/icons/avatar.png'"
        :alt="user.name"
      >
    </div>
    <div class="user__info">
      <div class="user__info__name">
        {{ user.name }} ({{ userAge }} lat)
      </div>
      <a
        class="user__info__phone"
        :href="`tel:${user.phone}`"
      >
        <span
          aria-hidden="true"
          class="fas fa-phone"
        />
        {{ user.phone}}
      </a>
      <a
        class="user__info__email"
        :href="`mailto:${user.email}`"
      >
        <span
          aria-hidden="true"
          class="fas fa-envelope"
        />
        {{ user.email}}
      </a>
    </div>
  </div>
</template>

<script>
import { API_URL } from "@/apollo/constants";
const moment = require("moment");
moment.locale("pl");

export default {
  name: "MainUserBlockInfo",
  props: {
    user: {
      type: Object,
      default: function() {
        return {
          avatar: "avatar.png",
          name: "Brak danych",
          email: "Brak danych",
          phone: "Brak danych",
          birthdate: null
        };
      }
    }
  },
  data: function() {
    return {
      apiUrl: API_URL
    };
  },
  computed: {
    userAge: function() {
      return this.userBirthdate
        ? Math.abs(
            moment(this.userBirthdate, "DD.MM.YYYY").diff(moment(), "years")
          )
        : "brak";
    },
    userBirthdate: function() {
      return this.user.birthdate
        ? moment(this.user.birthdate, "YYYY-MM-DD HH:MI:SS").format(
            "DD.MM.YYYY"
          )
        : null;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../main";

.user {
  width: 100%;
  display: flex;
  background: #f5f5f5;
  border-radius: 0.5rem;
  overflow: hidden;
  &__img {
    padding: 1rem;
    img {
      @extend %text--center;
      height: 5rem;
      border-radius: 1rem;
    }
  }
  &__info {
    background: #ececec;
    padding: 1rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    span {
      padding-right: 1rem;
    }
    &__name {
      font-weight: 700;
    }
    &__phone,
    &__email {
      font-weight: 600;
    }
  }
}
</style>
