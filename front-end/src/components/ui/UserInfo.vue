<template>
  <div>
    <div class="info" v-on:click="isShowed = !isShowed">
      <img :src="this.$store.getters.userInfo.img">
      <div class="info__content">
        <div class="info__name">
          <p>
            {{ this.$store.getters.userInfo.name }}
            {{ this.$store.getters.userInfo.surname }}
          </p>
          <button class="info__btn">
            <i class="fas" v-bind:class="[isShowed ? 'fa-angle-up' : 'fa-angle-down']"></i>
          </button>
        </div>
        <div class="info__specialization">{{ this.$store.getters.userInfo.spec }}</div>
      </div>
    </div>
    <div class="wrapper">
      <div
        class="info__menu"
        v-bind:style="[isShowed ? {'visibility': 'visible', 'opacity': 1, 'z-index': 99999999} : {'visibility': 'hidden', 'opacity': 0, 'z-index': 0}]"
      >
        <router-link to="/About" class="menu__el" v-on:click.native="isShowed = !isShowed">
          <i class="fas fa-user"></i>
          <div class="menu__title">Profil</div>
        </router-link>
        <div class="menu__el" v-on:click.native="isShowed = !isShowed">
          <i class="fas fa-cog"></i>
          <div class="menu__title">Ustawienia</div>
        </div>
        <div class="menu__el" v-on:click.native="logout; isShowed = !isShowed">
          <i class="fas fa-sign-out-alt"></i>
          <div class="menu__title">Wyloguj</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserInfo",
  data: function() {
    return {
      isShowed: false
    };
  },
  methods: {
    logout: function() {
      const status = this.$store.dispatch("logout");
      if (status) {
        this.$toasted.success("Pomyślnie wylogowano", {
          icon: "check",
          onComplete: () => {
            this.$router.push("/");
          }
        });
      } else {
        this.$toasted.success("Wystąpił błąd", {
          icon: "check",
          onComplete: () => {
            this.$router.push("/");
          }
        });
      }
    }
  }
};
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
  height: auto;
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
    width: auto;
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
  height: auto;
  @media only screen and (max-width: 960px) {
    width: auto;
    left: 0;
    height: 0;
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
  z-index: 100;
  border-radius: 0.5em;
  font-weight: 600;
  overflow: hidden;
  opacity: 0;
  visibility: hidden;
  transition: visibility 0s, opacity 0.2s ease-in-out;
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
    i {
      transition: 0.2s ease-in-out;
      color: #3e3e45;
      font-size: 1.2em;
      margin-right: 1em;
    }
    &:hover {
      background: #f5f5f5;
      color: #5356ae;
      i {
        color: #5356ae;
      }
    }
  }
}
</style>