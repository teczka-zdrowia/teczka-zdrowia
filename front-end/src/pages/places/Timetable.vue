<template>
  <div>
    <div class="appointments__actions">
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
    <Appointment
      class="appointment"
      :key="index"
      v-for="(item, index) in this.$store.getters.userAppointments"
      :data="item"
      :showAddedBy="true"
    />
  </div>
</template>

<script>
import MainBtn from "../../components/ui/basic/MainBtn";
import MainSearch from "../../components/ui/basic/MainSearch";
import AppointmentMobile from "../../components/ui/appointments/AppointmentMobile";

export default {
  name: "AppointmentsMobile",
  data: function() {
    return {
      showUpcoming: true
    };
  },
  components: {
    Appointment: AppointmentMobile,
    MainSearch,
    MainBtn
  },
  computed: {
    isMobile: function() {
      return this.$store.getters.window.width < 960;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../main";

.appointments__actions {
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-between;
  padding: 1rem;
  width: calc(100% - 2rem);
  margin-bottom: 1rem;
  background: #fdfdfd;
  box-shadow: 0 0 20px 0px rgba(213, 213, 213, 0.3);
  border-radius: 0.5rem;
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

@media only screen and (min-width: 1150px) {
  .appointments__actions {
    flex-direction: row;
  }
  .appointments__types {
    padding-bottom: 0;
  }
}
</style>