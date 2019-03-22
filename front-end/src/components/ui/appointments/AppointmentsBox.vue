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
      <MainSearch class="appointments__right">
        <input class="input" slot="input" type="text" placeholder="  Szukaj">
        <div class="select" slot="select">
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
      </MainSearch>
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
import MainSearch from "../basic/MainSearch";
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
    MainSearch,
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