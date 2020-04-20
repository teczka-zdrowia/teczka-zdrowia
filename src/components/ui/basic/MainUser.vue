<template>
  <div
    class="actions__patient"
    v-bind:class="{ inactive: !data.is_active }"
    v-on:click="moreInfo"
  >
    <MainUserInfo
      :data="data.user"
      :isClickable="false"
    />
    <i
      v-if="!data.is_active"
      class="fas fa-lock"
    />
    <i
      v-if="data.permission_type === 'ADMIN'"
      class="fas fa-crown"
    />
    <i
      v-if="data.permission_type === 'EMPLOYEE'"
      class="fas fa-user"
    />
  </div>
</template>

<script>
import MainUserInfo from './MainUserInfo'
import { mapActions } from 'vuex'

export default {
  name: 'MainUser',
  props: {
    data: {
      type: Object,
      default: function () {
        return {
          permission_type: '',
          is_active: false,
          user: {
            id: {
              type: Number
            },
            name: {
              type: String
            },
            img: {
              type: String
            },
            phone: {
              type: String
            }
          }
        }
      }
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
      showModal: 'modal/show'
    }),
    moreInfo: function () {
      this.showModal({
        componentName: 'UserInfo',
        data: {
          hideBorders: true,
          editAffiliation: this.editAffiliation,
          role: this.data
        }
      })
    }
  }
}
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

    &.inactive {
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
