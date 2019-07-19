<template>
  <div class="info--base">
    <div
      class="base__top"
      v-bind:class="{ 'base__top--no-specialization': !userData.is_payment_valid }"
    >
      <div class="user__img">
        <img :src="userData.avatar">
        <label
          class="img__edit"
          v-bind:style="[
          newAvatarBase64 ?
          { 'background-image' : `url(${newAvatarBase64})`, 'background-size' : 'cover' } :
          null
          ]"
          v-if="isEdit"
        >
          <input
            id="avatarInput"
            type="file"
            accept="image/*"
            :disabled="isLoading"
            v-on:change="processFile($event)"
          />
          <span
            aria-hidden="true"
            class="fas fa-camera"
          />
        </label>
      </div>
      <div
        class="user__name"
        v-if="!isEdit"
      >{{userData.name}}</div>
      <div
        class="user__name"
        v-if="isEdit"
      >
        <input
          type="text"
          name="name"
          v-model="newUserData.name"
          placeholder="Jan Kowalski"
          :disabled="isLoading"
          required
        >
      </div>
      <div
        class="user__specialization"
        v-if="!isEdit && userData.is_payment_valid"
      >{{ userData.specialization }}</div>
      <input
        v-if="isEdit && userData.is_payment_valid"
        class="user__specialization"
        type="text"
        minlength="1"
        name="specialization"
        v-model="newUserData.specialization"
        :disabled="isLoading"
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
          :disabled="isLoading"
          v-if="isEdit"
        >
          <span
            aria-hidden="true"
            class="fas fa-times"
          />
        </MainBtn>
        <MainBtn
          class="more__action more__action--save"
          v-on:click.native="updateData"
          :disabled="isLoading"
          v-if="isEdit"
        >
          <span
            v-if="!isLoading"
            aria-hidden="true"
            class="fas fa-check"
          />
          <MainLoading v-if="isLoading" />
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
        >{{ userData.email }}</div>
        <input
          v-if="isEdit"
          class="more__content"
          type="email"
          name="email"
          v-model="newUserData.email"
          placeholder="jan@kowalski.com"
          :disabled="isLoading"
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
          v-model="newUserData.phone"
          placeholder="123654789"
          minlength="9"
          maxlength="15"
          :disabled="isLoading"
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
          v-if="PESEL"
        >{{ userData.pesel }}</div>
        <div
          class="more__content more__pesel"
          v-if="!PESEL"
          v-on:click="getPESEL"
        >Odkryj</div>
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
          :disabled="isLoading"
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
          v-on:click.native="updateData"
          :disabled="isLoading"
          v-if="isEdit"
        >
          <div v-if="!isLoading">
            <span
              aria-hidden="true"
              class="fas fa-check"
            />
            Zapisz
          </div>
          <div v-if="isLoading">
            <MainLoading />
            Ładowanie
          </div>
        </MainBtn>
      </div>
    </div>
  </div>
</template>

<script>
import MainBtn from "../../components/ui/basic/MainBtn";
import MainLoading from "../../components/ui/basic/MainLoading";

import { mapGetters, mapActions } from "vuex";

const moment = require("moment");
moment.locale("pl");

export default {
  name: "BaseInfo",
  components: {
    MainBtn,
    MainLoading
  },
  data: function() {
    return {
      isEdit: false,
      isLoading: false,
      newAvatarBase64: null,
      newUserData: {}
    };
  },
  watch: {
    isEdit: function(val) {
      if (val == true) {
        this.newUserData = Object.assign({}, this.userData);
        this.newUserData.birthdate = moment(
          this.newUserData.birthdate,
          "YYYY-MM-DD HH:MI:SS"
        ).format("YYYY-MM-DD");
      }
    }
  },
  methods: {
    ...mapActions({
      hidePESEL: "userInfo/hidePESEL",
      showModal: "modal/show",
      updateUserData: "userInfo/updateData",
      getUserData: "userInfo/updateData"
    }),
    getPESEL: function() {
      this.showModal({
        componentName: "ConfirmGetPESEL"
      });
    },
    updateData: function() {
      const userData = this.userData;
      const newUserData = this.newUserData;

      this.isLoading = true;

      let dataThatChanged = {};
      for (let property in newUserData) {
        const newDataAppearsInProperty =
          newUserData[property] !== userData[property];
        if (newDataAppearsInProperty) {
          dataThatChanged[property] = newUserData[property];
        }
      }

      const dataThatChangedHasUpload =
        typeof dataThatChanged.avatar !== undefined;

      this.updateUserData(dataThatChanged)
        .then(() => (this.isEdit = false))
        .catch(error => {
          this.$toasted.error("Wystąpił błąd");
          console.error(error);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    processFile(event) {
      this.newUserData.avatar = event.target.files[0];
      this.getBase64OfImage(event.target.files[0])
        .then(data => {
          this.newAvatarBase64 = data;
        })
        .catch(error => {
          this.$toasted.error("Wystąpił błąd przy ładowaniu pliku");
          console.error(error);
        });
    },
    getBase64OfImage: function(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
    }
  },
  computed: {
    ...mapGetters({
      isMobile: "window/isMobile",
      PESEL: "userInfo/pesel",
      userData: "userInfo/full"
    }),
    userPhone: function() {
      if (this.userData.phone)
        return this.userData.phone.replace(
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
      return moment(this.userData.birthdate, "YYYY-MM-DD HH:MI:SS").format(
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
  &--no-specialization {
    grid-template-areas:
      "img name"
      "img name";
    .user__name {
      input {
        border-bottom-left-radius: 0.5rem;
        border-bottom-right-radius: 0.5rem;
      }
    }
  }
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
    height: 4rem;
    width: 4rem;
    object-fit: cover;
    position: absolute;
  }
  input {
    display: none;
  }
}

.img__edit {
  position: absolute;
  height: 4rem;
  width: 4rem;
  object-fit: cover;
  background-size: cover;
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
    width: 100%;
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
  svg {
    height: 1.5rem;
    width: 1.5rem;
    display: flex;
    margin: auto;
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
    &--no-specialization {
      grid-template-areas:
        "img name actions"
        "img name actions";
    }
  }
}
</style>