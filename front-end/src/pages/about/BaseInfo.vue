<template>
  <div class="info--base">
    <div class="base__top">
      <div class="user__img">
        <img :src="data.img">
        <div
          class="img__edit"
          v-if="isEdit"
        >
          <span
            aria-hidden="true"
            class="fas fa-camera"
          />
        </div>
      </div>
      <div
        class="user__name"
        v-if="!isEdit"
      >{{data.name}} {{data.surname}}</div>
      <div
        class="user__name"
        v-if="isEdit"
      >
        <input
          type="text"
          name="name"
          v-model="newData.name"
          placeholder="Jan"
          required
        >
        <input
          type="text"
          name="surname"
          v-model="newData.surname"
          placeholder="Kowalski"
          required
        >
      </div>
      <div
        class="user__specialization"
        v-if="!isEdit"
      >{{ data.spec }}</div>
      <input
        v-if="isEdit"
        class="user__specialization"
        type="text"
        minlength="1"
        name="spec"
        v-model="newData.spec"
        placeholder="Fizjoterapeuta"
      >
      <div
        class="more__actions"
        v-if="!isMobile"
      >
        <MainBtn
          class="more__action more__action--edit"
          v-on:click.native="isEdit = true"
          v-if="!isEdit"
        >
          <span
            aria-hidden="true"
            class="fas fa-pen"
          />
        </MainBtn>
        <MainBtn
          class="more__action more__action--cancel"
          v-on:click.native="isEdit = false"
          v-if="isEdit"
        >
          <span
            aria-hidden="true"
            class="fas fa-times"
          />
        </MainBtn>
        <MainBtn
          class="more__action more__action--save"
          v-on:click.native="isEdit = false"
          v-if="isEdit"
        >
          <span
            aria-hidden="true"
            class="fas fa-check"
          />
        </MainBtn>
      </div>
    </div>
    <div class="base__more">
      <div class="more__el">
        <div class="more__title">
          <span
            aria-hidden="true"
            class="fas fa-birthday-cake"
          />
          <span>Urodziny</span>
        </div>
        <div
          class="more__content"
          v-if="!isEdit"
        >{{ userBirthdate }} ({{ userAge }} lat)</div>
        <div
          class="more__content more__content--fullcolor"
          v-if="isEdit"
        >Na podstawie PESEL</div>
      </div>
      <div class="more__el">
        <div class="more__title">
          <span
            aria-hidden="true"
            class="fas fa-at"
          />
          <span>Email</span>
        </div>
        <div
          class="more__content"
          v-if="!isEdit"
        >{{ data.email }}</div>
        <input
          v-if="isEdit"
          class="more__content"
          type="email"
          name="email"
          v-model="newData.email"
          placeholder="jan@kowalski.com"
          required
        >
      </div>
      <div class="more__el">
        <div class="more__title">
          <span
            aria-hidden="true"
            class="fas fa-phone"
          />
          <span>Telefon</span>
        </div>
        <div
          class="more__content"
          v-if="!isEdit"
        >{{ userPhone }}</div>
        <input
          v-if="isEdit"
          class="more__content"
          type="tel"
          name="phone"
          v-model="newData.phone"
          placeholder="123654789"
          minlength="9"
          maxlength="15"
          required
        >
      </div>
      <div class="more__el">
        <div class="more__title">
          <span
            aria-hidden="true"
            class="fas fa-id-card-alt"
          />
          <span>PESEL</span>
        </div>
        <div
          class="more__content"
          v-if="PESEL && !isEdit"
        >{{ data.pesel }}</div>
        <div
          class="more__content more__pesel"
          v-if="!PESEL"
          v-on:click="getPESEL"
        >Odkryj</div>
        <input
          v-if="PESEL && isEdit"
          class="more__content"
          type="text"
          name="pesel"
          v-model="newData.pesel"
          placeholder="12345678912"
          required
        >
        <div
          v-if="PESEL"
          v-on:click="hidePESEL"
          class="more__content more__content__btn more__content--fullcolor"
        >
          <span
            aria-hidden="true"
            class="fas fa-eye-slash"
          />
        </div>
      </div>
      <div
        class="more__actions"
        v-if="isMobile"
      >
        <MainBtn
          class="more__action more__action--edit"
          v-on:click.native="isEdit = true"
          v-if="!isEdit"
        >
          <span
            aria-hidden="true"
            class="fas fa-pen"
          />
          Edytuj
        </MainBtn>
        <MainBtn
          class="more__action more__action--cancel"
          v-on:click.native="isEdit = false"
          v-if="isEdit"
        >
          <span
            aria-hidden="true"
            class="fas fa-times"
          />
          Anuluj
        </MainBtn>
        <MainBtn
          class="more__action more__action--save"
          v-on:click.native="isEdit = false"
          v-if="isEdit"
        >
          <span
            aria-hidden="true"
            class="fas fa-check"
          />
          Zapisz
        </MainBtn>
      </div>
    </div>
  </div>
</template>

<script>
import MainBtn from "../../components/ui/basic/MainBtn";

import { mapGetters, mapActions } from "vuex";

const moment = require("moment");
moment.locale("pl");

export default {
  name: "BaseInfo",
  components: {
    MainBtn
  },
  data: function() {
    return {
      isEdit: false,
      data: {},
      newData: {}
    };
  },
  mounted() {
    this.data = Object.assign({}, this.$store.getters["userInfo/full"]);
  },
  watch: {
    isEdit: function(val) {
      if (val == true) {
        this.newData = Object.assign({}, this.data);
        this.newData.birthdate = moment(
          this.newData.birthdate,
          "YYYY-MM-DD HH:MI:SS"
        ).format("YYYY-MM-DD");
      }
    },
    PESEL: function(val) {
      this.data.pesel = val;
      this.newData.pesel = val;
    }
  },
  methods: {
    ...mapActions({
      hidePESEL: "userInfo/hidePESEL",
      showModal: "modal/show"
    }),
    getPESEL: function() {
      this.showModal({
        componentName: "ConfirmGetPESEL"
      });
    }
  },
  computed: {
    ...mapGetters({
      userFullInfo: "userInfo/full",
      isMobile: "window/isMobile",
      PESEL: "userInfo/pesel"
    }),
    userPhone: function() {
      if (this.data.phone)
        return this.data.phone.replace(
          /(\d{1,3})(\d{1,3})(\d{1,4})/g,
          "$1 $2 $3"
        );
    },
    userAge: function() {
      return Math.abs(
        moment(this.userBirthdate, "DD.MM.YYYY").diff(moment(), "years")
      );
    },
    userBirthdate: function() {
      return moment(this.data.birthdate, "YYYY-MM-DD HH:MI:SS").format(
        "DD.MM.YYYY"
      );
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../main";

input[type="date"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  display: none;
}

::-webkit-clear-button {
  display: none;
  -webkit-appearance: none;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.info--base {
  width: 100%;
  padding: 2rem;
  background: #fafafc;
  border-radius: 0.5rem;
  box-shadow: 0 0 20px 0px $lightgrey;
}

.base__top {
  display: grid;
  grid-template-columns: 4rem auto;
  grid-template-areas:
    "img name"
    "img spec";
  grid-column-gap: 1em;
  height: 4rem;
  transition: 0.2s ease-in-out;
  width: 100%;
  font-size: 1.25em;
  margin-bottom: 1em;
}

.user__img {
  grid-area: img;
  height: 4rem;
  transition: 0.2s ease-in-out;
  border-radius: 1rem;
  overflow: hidden;
  -webkit-filter: drop-shadow(0 0 10px rgba(213, 213, 213, 0.3));
  filter: drop-shadow(0 0 10px rgba(213, 213, 213, 0.3));
  position: relative;
  img {
    height: 100%;
    width: 100%;
    position: absolute;
  }
}

.img__edit {
  position: absolute;
  height: 100%;
  width: 100%;
  background: rgba(238, 238, 243, 0.5);
  transition: 0.2s ease-in-out;
  cursor: pointer;
  &:hover {
    background: rgba(230, 230, 232, 0.7);
  }
  span {
    padding: 0.5em;
    right: 0;
    color: #9394eb;
    border-bottom-left-radius: 0.5em;
    position: absolute;
    background: rgba(230, 230, 232, 0.9);
  }
}

.user__name {
  @extend %text--center;
  grid-area: name;
  font-weight: 700;
  color: #3e3e45;
  justify-content: left;
  input {
    height: 100%;
    width: 50%;
    text-align: center;
    background: #e6e6e8;
    color: #3e3e45;
    font-weight: 700;
    &:first-child {
      border-top-left-radius: 0.5rem;
    }
    &:last-child {
      border-top-right-radius: 0.5rem;
    }
  }
}

.user__specialization {
  @extend %text--center;
  grid-area: spec;
  font-weight: 600;
  color: #67676e;
  justify-content: left;
}

input.user__specialization {
  text-align: center;
  background: #eeeef3;
  border-bottom-right-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
  width: 100%;
}

@media only screen and (max-width: 350px) {
  .user__name {
    display: block;
    width: 100%;
    input {
      width: 100%;
      &:first-child {
        border-top-right-radius: 0.5rem;
      }
      &:last-child {
        border-top-right-radius: 0;
      }
    }
  }
}

@media only screen and (max-width: 959px) {
  .info--base {
    padding: 1.5rem;
    width: calc(100% - 3rem);
    margin-bottom: 1em;
  }
}

/* --- MF --- */

.more__el {
  width: calc(100% - 0.5rem);
  display: flex;
  border-radius: 0.5rem;
  overflow: hidden;
  &:not(:last-child) {
    margin-bottom: 1em;
  }
}

.more__title,
.more__content {
  padding: 1rem;
  font-weight: 600;
}

.more__title {
  @extend %text--center;
  width: 1.5rem;
  background: #9394eb;
  color: #fafafc;
  span {
    display: none;
  }
}

.more__content {
  @extend %text--center;
  width: calc(100% - 3rem);
  background: #eeeef3;
  color: #91919c;
  &.more__pesel {
    @extend %text--center;
    background: #9394eb;
    color: #fafafc;
    cursor: pointer;
  }
  &--fullcolor {
    background: #9394eb;
    color: #fafafc;
  }
  &__btn {
    width: 1rem !important;
    cursor: pointer;
    background: #ececec;
    color: #3e3e45;
    transition: 0.2s ease-in-out;
    &:hover {
      filter: brightness(95%);
    }
  }
  &:not(:last-child) {
    width: calc(100% - 6rem);
  }
}

.more__actions {
  display: flex;
  width: 100%;
  & > *:not(:first-child) {
    margin-left: 1rem;
  }
}

.more__action {
  padding: 1rem !important;
  width: 100% !important;
  background: #eeeef3 !important;
  &--edit {
    color: #6a6ee1 !important;
  }
  &--cancel {
    color: #c0392b !important;
  }
  &--save {
    color: #27ae60 !important;
  }
  span {
    margin-right: 1em;
  }
}

@media only screen and (min-width: 425px) and (max-width: 960px) {
  .more__title {
    width: 7rem;
    justify-content: left;
    span {
      margin-right: 0.75em;
    }
    span {
      display: unset;
    }
  }
  .more__content {
    width: calc(100% - 11rem);
    &:not(:last-child) {
      width: calc(100% - 14rem);
    }
  }
}

@media only screen and (min-width: 1200px) {
  .more__title {
    width: 7rem;
    justify-content: left;
    span {
      margin-right: 0.75em;
    }
    span {
      display: unset;
    }
  }
  .more__content {
    width: calc(100% - 11rem);
    &:not(:last-child) {
      width: calc(100% - 14rem);
    }
  }
}

@media only screen and (min-width: 960px) {
  .base__more {
    display: grid;
    grid-template-columns: 50% 50%;
    column-gap: 1rem;
    row-gap: 1rem;
  }
  .more__title,
  .more__content {
    padding: 0.75rem 1rem;
  }
  .more__el {
    &:not(:last-child) {
      margin-bottom: 0;
    }
  }
  .more__actions {
    width: 100%;
    grid-area: actions;
  }
  .more__action {
    span {
      margin-right: 0;
    }
  }
  .base__top {
    grid-template-columns: 4rem auto 10rem;
    grid-template-areas:
      "img name actions"
      "img spec actions";
  }
}
</style>