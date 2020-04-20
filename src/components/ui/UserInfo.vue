<template>
  <div>
    <div
      class="info"
      v-on:click="isShowed = !isShowed"
    >
      <img
        :src="userData.avatar ? `${apiUrl}/storage/avatars/${userData.avatar}` : '/static/img/icons/avatar.png'"
        :alt="userData.name"
      >
      <div class="info__content">
        <div class="info__name">
          <p>
            {{ userData.name }}
          </p>
          <button class="info__btn">
            <i
              class="fas"
              v-bind:class="[isShowed ? 'fa-angle-up' : 'fa-angle-down']"
            />
          </button>
        </div>
        <div class="info__specialization">{{ userData.specialization }}</div>
      </div>
    </div>
    <div class="wrapper">
      <div
        class="info__menu"
        v-bind:class="{visible: isShowed}"
      >
        <router-link
          to="/About"
          class="menu__el"
          v-on:click.native="isShowed = !isShowed"
        >
          <span
            aria-hidden="true"
            class="fas fa-user"
          />
          <div class="menu__title">Profil</div>
        </router-link>
        <div
          class="menu__el"
          v-on:click="showSettings"
        >
          <span
            aria-hidden="true"
            class="fas fa-cog"
          />
          <div class="menu__title">Ustawienia</div>
        </div>
        <div
          class="menu__el"
          v-on:click="logout"
        >
          <span
            aria-hidden="true"
            class="fas fa-sign-out-alt"
          />
          <div class="menu__title">Wyloguj</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { API_URL } from '@/apollo/constants'

export default {
  name: 'UserInfo',
  data: function () {
    return {
      apiUrl: API_URL,
      isLoading: false,
      isShowed: false
    }
  },
  methods: {
    ...mapActions({
      userLogout: 'userInfo/logout',
      getAutheticatedUserData: 'userInfo/getData',
      showModal: 'modal/show'
    }),
    logout: function () {
      if (!this.isLoading) {
        this.isLoading = true
        this.$toasted.show('Wylogowywanie...')
        this.userLogout()
          .then(() => {
            const logoutRoute = this.$router.resolve({name: 'Auth'})
            this.$toasted.success('Poprawnie wylogowano')
            window.location.href = logoutRoute.href
          })
          .catch(error => {
            this.$toasted.error('Wystąpił błąd')
            console.error(error)
          })
          .finally(() => (this.isLoading = false))
      }
    },
    showSettings: function () {
      this.isShowed = false

      this.showModal({
        componentName: 'Settings'
      })
    }
  },
  computed: {
    ...mapGetters({
      userData: 'userInfo/full'
    })
  }
}
</script>

<style lang="scss" scoped>
  @import "../../main";

  .info {
    position: relative;
    cursor: pointer;
    width: auto;
    border: 10px solid transparent;
    border-radius: 0.5em;
    margin: -10px;
    transition: 0.2s ease-in-out;
    height: 100%;
    margin-bottom: -30%;
    @media only screen and (max-width: 960px) {
      height: 3em;
      width: 4em;
      margin-left: auto;
      margin-right: 0;
    }

    * {
      pointer-events: none;
    }

    &:hover {
      background: #fff;
      box-shadow: 0 0 20px 0px rgba(213, 213, 213, 0.5);
      border: 10px solid #fff;
    }

    img {
      height: 3em;
      width: 3rem;
      object-fit: cover;
      border-radius: 1em;
      margin-right: 1em;
      float: left;
      filter: drop-shadow(0 0 10px $lightgrey);
      @media only screen and (max-width: 960px) {
        margin-right: 0;
      }
    }

    .info__content {
      height: 90%;
      margin: 1.25% 0;
      display: grid;
      flex-direction: column;

      .info__name {
        @extend %text--center;
        font-weight: 700;
        color: #3e3e45;
        justify-content: left;

        p {
          margin: 0;
          @media only screen and (max-width: 960px) {
            display: none;
          }
        }

        .info__btn {
          cursor: pointer;
          color: #91919c;
          background: none;
          margin-left: 0.25em;
        }
      }

      .info__specialization {
        @extend %text--center;
        font-weight: 600;
        color: #67676e;
        justify-content: left;
        @media only screen and (max-width: 960px) {
          display: none;
        }
      }
    }
  }

  .wrapper {
    position: relative;
    top: 0em;
    left: -10px;
    width: calc(100% + 20px);
    height: 0;
    top: 1rem;
    @media only screen and (max-width: 960px) {
      width: auto;
      left: -100%;
    }
  }

  .info__menu {
    position: relative;
    margin-top: 5em;
    width: 100%;
    height: auto;
    background: #fff;
    box-shadow: 0 0 20px 0px $grey;
    background: #fff;
    z-index: 0;
    border-radius: 0.5em;
    font-weight: 600;
    overflow: hidden;
    opacity: 0;
    visibility: hidden;
    transition: visibility 0s, opacity 0.2s ease-in-out;
    @media only screen and (max-width: 960px) {
      margin-top: 1.5rem;
      width: 12rem;
    }

    &.visible {
      z-index: 9999999;
      opacity: 1;
      visibility: visible;
      transition: visibility 0s, opacity 0.2s ease-in-out;
    }

    .menu__el {
      transition: 0.2s ease-in-out;
      color: #67676e;
      @extend %text--center;
      justify-content: left;
      width: auto;
      height: auto;
      padding: 1.5em 2em;
      font-size: 1em;
      cursor: pointer;

      * {
        pointer-events: none;
      }

      span {
        transition: 0.2s ease-in-out;
        color: #3e3e45;
        font-size: 1.2em;
        margin-right: 1em;
      }

      &:hover {
        background: #f5f5f5;
        color: #5356ae;

        span {
          color: #5356ae;
        }
      }
    }
  }
</style>
