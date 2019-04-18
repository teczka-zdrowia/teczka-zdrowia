<template>
  <div class="appointments">
    <div class="appointments__top">
      <div class="appointments__title">Nadchodzące wizyty</div>
      <MainSearch class="appointments__right">
        <input
          class="input"
          slot="input"
          type="text"
          placeholder="  Szukaj"
        >
        <div
          class="select"
          slot="select"
        >
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
      class="appointment--panel"
      :key="index"
      v-for="(item, index) in userAppointments"
      :data="item"
      :showPlace="true"
      :canEdit="true"
    />
    <MainShowMore :isLoading="isLoading" />
  </div>
</template>

<script>
import MainSearch from "../../components/ui/basic/MainSearch";
import MainShowMore from "../../components/ui/basic/MainShowMore";
import AppointmentMobile from "../../components/ui/appointments/AppointmentMobile";

export default {
  name: "Appointments",
  components: {
    MainSearch,
    MainShowMore,
    Appointment: AppointmentMobile
  },
  data: function() {
    return {
      date: "",
      isLoading: false
    };
  },
  computed: {
    userAppointments: function() {
      return this.$store.getters["userAppointments/all"];
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../main";

.appointments {
  width: 100%;
}

.appointments__top {
  @extend %text--center;
  font-weight: 700;
  justify-content: space-between;
  font-weight: 600;
  margin-bottom: 1rem;
  width: calc(100% - 2rem);
  padding: 1rem;
  border-radius: 0.5rem;
  -webkit-box-shadow: 0 0 20px 0px rgba(213, 213, 213, 0.3);
  box-shadow: 0 0 20px 0px rgba(213, 213, 213, 0.3);
  background: #fafafc;
}
.appointments__title {
  color: #3e3e45;
  font-size: 1.5em;
  margin-right: 1.5em;
  font-weight: 700;
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

@media only screen and (max-width: 1200px) {
  .appointment--panel {
    display: block !important;
    height: auto !important;
  }
  .appointments__top {
    flex-direction: column;
    align-items: normal;
    width: calc(100% - 2.5rem);
    padding: 1.25rem;
  }
  .appointments__title {
    padding-bottom: 1rem;
  }
}
</style>