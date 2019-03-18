<template>
  <div>
    <div class="appointments__actions" v-if="showActions">
      <div class="appointments__types">
        <MainBtn
          v-on:click.native="showUpcoming = true"
          v-bind:class="[showUpcoming == true ? 'active' : '']"
        >Nadchodzące</MainBtn>
        <MainBtn
          v-on:click.native="showUpcoming = false"
          v-bind:class="[showUpcoming == false ? 'active' : '']"
        >Minione</MainBtn>
      </div>
      <div class="appointments__right">
        <input class="appointments__search" type="text" placeholder="  Szukaj">
        <div class="appointments__sort">
          <i class="fas fa-filter"></i>
        </div>
        <div class="appointments__sort__content">
          <label>
            Sortuj przez:
            <select>
              <option selected>Data</option>
              <option>Specjalista</option>
              <option>Gabinet</option>
              <option>Opis</option>
            </select>
          </label>
          <label>
            Porządkuj:
            <select>
              <option selected>Rosnąco</option>
              <option>Malejąco</option>
            </select>
          </label>
          <label>
            Ładuj po:
            <select>
              <option selected>5</option>
              <option>10</option>
              <option>20</option>
            </select>
          </label>
        </div>
      </div>
    </div>
    <AppointmentsDesktop
      ref="appointmentsContent"
      class="appointments__content"
      :maxAppointments="maxAppointments"
      :showMore="showMore"
      v-if="!isMobile"
    />
    <AppointmentsMobile :showMore="showMore" v-if="isMobile"/>
  </div>
</template>

<script>
import MainBtn from "../basic/MainBtn";
import AppointmentsDesktop from "./AppointmentsDesktop";
import AppointmentsMobile from "./AppointmentsMobile";

export default {
  name: "AppointmentsBox",
  props: {
    showActions: {
      type: Boolean,
      default: true
    },
    showMore: {
      type: Boolean,
      default: false
    }
  },
  data: function() {
    return {
      maxAppointments: 0,
      showUpcoming: true
    };
  },
  components: {
    MainBtn,
    AppointmentsDesktop,
    AppointmentsMobile
  },
  mounted() {
    this.$nextTick(() => {
      if (this.$store.getters.window.width > 960) {
        this.maxAppointments = Math.floor(
          this.$refs.appointmentsContent.$el.offsetWidth / 300
        );
      }
    });
  },
  computed: {
    isMobile: function() {
      return this.$store.getters.window.width < 960;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../main";

.appointments__actions {
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-between;
  margin-top: -1rem;
  padding-bottom: 1rem;
}

.appointments__types {
  display: flex;
  padding-bottom: 1rem;
  button {
    width: 50%;
    background: #eeeef3;
    color: #6a6ee1;
    border-radius: 0.5em;
    &.active {
      color: $primrary-light;
      background: $darkviolet;
      background: linear-gradient(to right, $lightviolet, $darkviolet);
      filter: drop-shadow(0 0 10px $lightgrey);
      transition: 0.2s ease-in-out;
      background-position: right center;
    }
    &:hover {
      color: $primrary-light;
      background: $darkviolet;
      background: linear-gradient(to right, $lightviolet, $darkviolet);
      filter: drop-shadow(0 0 10px $lightgrey);
    }
    &:first-child {
      margin-right: 1em;
    }
  }
}
.appointments__content {
  width: 100%;
  display: flex;
  margin-top: 2em;
  overflow: auto;
}

.appointment {
  padding: 1em;
  border-radius: 0.5em;
  box-shadow: 0 0 20px 0px rgba(213, 213, 213, 0.3);
  background: #fff;
  width: 100%;
  margin-right: 1em;
}

.appointments__right {
  display: flex;
  position: relative;
}

.appointments__search {
  border-top-left-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
  background: #eeeef3;
  padding: 0.75rem;
  font-weight: 600;
  width: calc(100% - 3rem);
  transition: 0.2s ease-in-out;
  &:focus {
    @include placeholder {
      opacity: 0;
    }
  }
  @include placeholder {
    transition: 0.2s ease-in-out;
    color: #6a6ee1;
    font-family: Montserrat, "Font Awesome 5 Free";
  }
}

.appointments__sort {
  @extend %text--center;
  border-top-right-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  transition: 0.2s ease-in-out;
  color: #3e3e45;
  background: #e4e4ec;
  padding: 0 1rem;
  cursor: pointer;
  &:hover {
    & ~ .appointments__sort__content {
      visibility: visible;
      opacity: 1;
    }
  }
}

.appointments__sort__content {
  z-index: 100;
  visibility: hidden;
  opacity: 0;
  position: absolute;
  top: calc(100% + 0.5rem);
  padding: 1rem 0.75rem;
  width: calc(100% - 1.5rem);
  background: #e4e4ec;
  border-radius: 0.5rem;
  transition: all 0.2s ease-in-out;
  label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 600;
    &:not(:last-child) {
      margin-bottom: 1rem;
    }
    select {
      cursor: pointer;
      padding: 0.25rem;
      border-radius: 0.5rem;
      width: 50%;
      background: #fafafc;
      border: 0;
    }
  }
  &:hover {
    visibility: visible;
    opacity: 1;
    & ~ .appointments__sort {
      border-radius: 0;
    }
  }
}

@media only screen and (min-width: 960px) {
  .appointments__actions {
    margin-top: 0;
    padding-bottom: 0;
    flex-direction: row;
  }
  .appointments__types {
    padding-bottom: 0;
    button {
      width: unset;
    }
  }
}
</style>