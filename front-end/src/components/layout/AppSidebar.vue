<template>
  <div class="sidebar">
    <div class="logo">
      <i class="fas fa-briefcase-medical"></i>
    </div>
    <div class="nav">
      <router-link to="/Dashboard" class="nav__el">
        <i class="fas fa-home">
          <div class="nav__tooltip">Strona domowa</div>
        </i>
      </router-link>
      <router-link to="/Cabinetes" class="nav__el">
        <i class="fas fa-hospital">
          <div class="nav__tooltip">Moje gabinety</div>
        </i>
      </router-link>
      <router-link to="/Panel" class="nav__el">
        <i class="fas fa-user-md">
          <div class="nav__tooltip">Panel specjalisty</div>
        </i>
      </router-link>
      <router-link to="/About" class="nav__el active">
        <i class="fas fa-file-medical-alt">
          <div class="nav__tooltip">Moja kartoteka</div>
        </i>
      </router-link>
      <router-link to="/Payment" class="nav__el">
        <i class="fas fa-money-check-alt">
          <div class="nav__tooltip">Płatności</div>
        </i>
      </router-link>
      <router-link to="/Messages" class="nav__el">
        <i class="fas fa-envelope">
          <div class="nav__tooltip">Wiadomości</div>
        </i>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppSidebar"
};
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

.sidebar {
  @extend %shadow--lightgrey;
  position: fixed;
  top: 0;
  left: 0;
  width: 5em;
  height: 100%;
  background: #fcfcfc;
  z-index: 100;
  .logo {
    @extend %drop--lightgrey;
    @extend %text--center;
    height: 3em;
    font-size: 2em;
    i {
      color: $darkviolet;
    }
  }
  .nav {
    width: 100%;
    height: auto;
    padding: 4em 0;
    position: relative;
    .nav__el {
      margin-bottom: 1.5em;
      @media only screen and (max-height: 767px) {
        margin-bottom: 25%;
      }
      @extend %text--center;
      font-size: 1.5em;
      i {
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
          .nav__tooltip {
            box-shadow: 0 0 20px 0px $grey;
            visibility: visible;
            opacity: 1;
            transition: visibility 0.2s ease-in-out, opacity 0.2s ease-in-out;
          }
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
        i {
          @extend %shadow--grey;
          color: $darkviolet;
          background: #fafafa;
        }
      }
    }
  }
}
</style>