<template>
  <div class="sidebar">
    <span
      v-on:click="isShowed = !isShowed"
      class="sidebar__btn fas"
      v-bind:class="[isShowed ? 'fa-angle-left' : 'fa-angle-right']"
    />
    <div
      class="nav"
      v-bind:class="[isShowed ? 'showed' : '']"
      v-on:click="isShowed = !isShowed"
    >
      <router-link
        to="/Dashboard"
        class="nav__el"
      >
        <span
          aria-hidden="true"
          class="fas fa-home"
        >
          <div class="nav__tooltip">Strona domowa</div>
        </span>
      </router-link>
      <router-link
        to="/Map"
        class="nav__el"
      >
        <span
          aria-hidden="true"
          class="fas fa-map-marked"
        >
          <div class="nav__tooltip">Mapa gabinetów</div>
        </span>
      </router-link>
      <router-link
        to="/Places"
        class="nav__el"
        v-if="isPaymentValid"
      >
        <span
          aria-hidden="true"
          class="fas fa-hospital"
        >
          <div class="nav__tooltip">Moje gabinety</div>
        </span>
      </router-link>
      <router-link
        to="/Panel"
        class="nav__el"
        v-if="isPaymentValid"
      >
        <span
          aria-hidden="true"
          class="fas fa-user-md"
        >
          <div class="nav__tooltip">Panel specjalisty</div>
        </span>
      </router-link>
      <router-link
        to="/Appointments"
        class="nav__el"
      >
        <span
          aria-hidden="true"
          class="fas fa-calendar-check"
        >
          <div class="nav__tooltip">Wizyty</div>
        </span>
      </router-link>
      <router-link
        to="/Payment"
        class="nav__el"
      >
        <span
          aria-hidden="true"
          class="fas fa-money-check-alt"
        >
          <div class="nav__tooltip">Płatności</div>
        </span>
      </router-link>
      <router-link
        to="/AddAppointment"
        v-if="isPaymentValid"
      >
        <MainBtn class="nav__el nav__el--btn">
          <span
            aria-hidden="true"
            class="fas fa-plus"
          />
        </MainBtn>
      </router-link>

      <!--<router-link to="/Messages" class="nav__el">
        <span aria-hidden="true" class="fas fa-envelope">
          <div class="nav__tooltip">Wiadomości</div>
        </span>
      </router-link>-->
    </div>
  </div>
</template>

<script>
import MainBtn from '../ui/basic/MainBtn'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'AppSidebar',
  data: function () {
    return {
      isShowed: false
    }
  },
  computed: {
    ...mapGetters({
      isPaymentValid: 'userInfo/isPaymentValid'
    })
  },
  methods: {
    ...mapActions({
      showModal: 'modal/show'
    }),
    addAppointment: function () {
      this.showModal({
        componentName: 'AddAppointment',
        data: {
          hideBorders: true
        }
      })
    }
  },
  components: {
    MainBtn
  }
}
</script>

<style lang="scss" scoped>
$lightgrey: rgba(213, 213, 213, 0.3);
$grey: rgba(213, 213, 213, 0.5);
$lightviolet: #9394eb;
$darkviolet: #6a6ee1;

%gradient--violet {
  background: $darkviolet;
  background: linear-gradient(to right, $lightviolet, $darkviolet);
}

%drop--lightgrey {
  filter: drop-shadow(0 0 10px $lightgrey);
}

%shadow--lightgrey {
  box-shadow: 0 0 20px 0px $lightgrey;
}

%shadow--grey {
  box-shadow: 0 0 20px 0px $grey;
}

%text--center {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: center;
  justify-content: center;
  -ms-flex-align: center;
  align-items: center;
}

.sidebar__btn {
  position: fixed;
  top: 1rem;
  left: 1.5rem;
  font-size: 3rem;
  color: #91919c;
  cursor: pointer;
  z-index: 1000;
}

.sidebar {
  @extend %shadow--lightgrey;
  left: 0;
  width: 5em;
  height: auto;
  .nav {
    width: 5em;
    height: 100%;
    padding: 6rem 0;
    background: #fcfcfc;
    margin-left: -5em;
    position: fixed;
    transition: all 0.2s ease-in-out;
    z-index: 999;
    .nav__el {
      margin-bottom: 1.5em;
      @media only screen and (max-height: 767px) {
        margin-bottom: 25%;
      }
      @extend %text--center;
      font-size: 1.5em;
      span {
        @extend %text--center;
        padding: 0.5em;
        transition: 0.2s ease-in-out;
        border-radius: 0.25em;
        color: #bbbaca;
        width: 1.3em;
        height: 1.3em;
        text-align: center;
        &:hover {
          @extend %shadow--grey;
          color: $lightviolet;
          background: #f5f5f5;
          /*.nav__tooltip {
            box-shadow: 0 0 20px 0px $grey;
            visibility: visible;
            opacity: 1;
            transition: visibility 0.2s ease-in-out, opacity 0.2s ease-in-out;
          }*/
        }
        .nav__tooltip {
          position: absolute;
          left: 110%;
          text-align: center;
          padding: 0.5em;
          font-size: 0.75em;
          font-weight: 600;
          font-family: Montserrat;
          background: #f5f5f5;
          color: #67676e;
          border-radius: 0.5em;
          white-space: nowrap;
          visibility: hidden;
          opacity: 0;
          transition: visibility 0s, opacity 0.2s ease-in-out;
        }
      }
      &.router-link-exact-active {
        span {
          @extend %shadow--grey;
          color: $darkviolet;
          background: #fafafa;
        }
      }
      &--btn {
        padding: 0 !important;
        height: auto !important;
        margin: auto !important;
        span {
          padding: 0.5rem;
          color: #fafafa;
        }
      }
    }
    &.showed {
      margin-left: 0;
      transition: all 0.2s ease-in-out;
    }
  }
}

@media only screen and (max-width: 425px) {
  .header {
    padding: 1rem 2rem;
  }
  .sidebar__btn {
    top: 1rem;
  }
}
</style>
