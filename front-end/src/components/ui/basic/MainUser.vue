<template>
  <div
    class="actions__patient"
    v-bind:class="{ disabled: isDisabled }"
    v-on:click="moreInfo"
  >
    <MainUserInfo
      :name="name"
      :img="img"
      :phone="phone"
      :isClickable="false"
      :userId="1"
    />
    <i
      v-if="isDisabled"
      class="fas fa-lock"
    />
    <i
      v-if="userType == 1"
      class="fas fa-crown"
    />
    <i
      v-if="userType == 2"
      class="fas fa-user"
    />
  </div>
</template>

<script>
import MainUserInfo from "./MainUserInfo";
import { mapActions } from "vuex";

export default {
  name: "MainUser",
  props: {
    name: {
      type: String
    },
    img: {
      type: String
    },
    phone: {
      type: String
    },
    userId: {
      type: Number
    },
    isDisabled: {
      type: Boolean,
      default: false
    },
    userType: {
      type: Number,
      default: 0
    },
    editAffiliation: {
      type: Boolean,
      default: false
    }
  },
  components: {
    MainUserInfo
  },
  methods: {
    ...mapActions({
      showModal: "modal/show"
    }),
    moreInfo: function() {
      /* Backend communication TODO */
      this.showModal({
        componentName: "PatientInfo",
        data: {
          hideBorders: true,
          editAffiliation: this.editAffiliation,
          isDisabled: this.isDisabled,
          userType: this.userType,
          id: 1,
          img:
            "https://www.mendeley.com/careers/getasset/c475b7c0-d36c-4c73-be33-a34030b6ca82/",
          name: "Konto",
          surname: "Testowe",
          email: "adrian@orlow.me",
          phone: "111 222 333",
          birthdate: "2002-12-23 00:11:32.000000"
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../main.scss";

.actions__patient {
  @extend %text--center;
  position: relative;
  font-weight: 700;
  color: #3e3e45;
  width: auto;
  overflow: unset;
  text-overflow: unset;
  transition: all 0.2s ease-in-out;
  justify-content: left;
  white-space: nowrap;
  color: #67676e;
  cursor: pointer;
  height: 3.5rem;
  width: calc(100% - 2em);
  padding: 1em;
  border-radius: 0.5em;
  box-shadow: 0 0 20px 0px rgba(213, 213, 213, 0.3);
  background: #fafafc;
  i {
    @extend %text--center;
    font-size: 1.5em;
    height: 3.5rem;
    width: 3.5rem;
    text-align: center;
    color: #6a6ee1;
    border-radius: 0.5em;
    &:nth-child(2) {
      margin-left: auto;
    }
    &:nth-child(3) {
      margin-left: 1rem;
    }
    &.fa-crown {
      background: transparent;
      color: #f1c40f;
    }
    &.fa-lock {
      background: #e6e6e8;
    }
  }
  &:hover {
    transform: scale(1.025);
    box-shadow: 0 0 60px 0 rgba(145, 145, 156, 0.3);
  }
  &:active {
    transform: scale(1.0125);
  }
  &.disabled {
    background: #eeeef3;
    filter: grayscale(100%);
    i.fa-lock:hover {
      &::before {
        content: "";
      }
    }
  }
}
</style>