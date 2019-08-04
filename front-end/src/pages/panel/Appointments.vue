<template>
  <div class="appointments">
    <div class="appointments__top">
      <div class="appointments__title">{{ title }}</div>
      <MainSearch class="appointments__right">
        <input
          class="input"
          slot="input"
          type="text"
          v-model.lazy="query.search"
          placeholder="  Szukaj"
        >
        <div
          class="select"
          slot="select"
        >
          <label>
            Sortuj przez:
            <select v-on:change="query.sortData.field">
              <option
                value="date"
                selected
              >Data</option>
              <!--<option>Specjalista</option>
              <option>Gabinet</option>-->
              <option value="note">Opis</option>
            </select>
          </label>
          <label>
            Porządkuj:
            <select v-model="query.sortData.order">
              <option
                value="DESC"
                selected
              >Malejąco</option>
              <option value="ASC">Rosnąco</option>
            </select>
          </label>
          <label>
            Ładuj po:
            <select v-model="query.first">
              <option
                value="5"
                selected
              >5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </select>
          </label>
        </div>
      </MainSearch>
    </div>
    <AppointmentsSmall
      :showAppointmentsLink="false"
      :showPlace="true"
      :canEdit="true"
      :viewerType="'author'"
      :showMoreBtn="pageInfo.hasNextPage"
      :loading="loading.next"
      :appointments="appointments"
      v-on:loadNext="getNextAppointments"
      v-if="canShowAppointments"
    />
    <GreyBlock
      class="appointments__info"
      v-if="!loading.init && !loading.newQuery && appointments.length === 0"
    >Brak wizyt</GreyBlock>
    <GreyBlock
      class="appointments__info appointments__info--loading"
      v-if="loading.init || loading.newQuery"
    >Ładowanie
      <MainLoading color="#67676e" />
    </GreyBlock>
  </div>
</template>

<script>
import MainBtn from "../../components/ui/basic/MainBtn";
import MainSearch from "../../components/ui/basic/MainSearch";
import MainLoading from "../../components/ui/basic/MainLoading";
import GreyBlock from "../../components/ui/blocks/GreyBlock";
import AppointmentsSmall from "../../components/ui/appointments/AppointmentsSmall";

import { mapGetters, mapActions } from "vuex";

export default {
  name: "Appointments",
  data: function() {
    return {
      loading: {
        init: true,
        newQuery: false,
        next: false
      },
      query: {
        search: "",
        first: 5,
        sortData: {
          order: "ASC",
          field: "date"
        }
      }
    };
  },
  computed: {
    ...mapGetters({
      isMobile: "window/isMobile",
      selectedRole: "userRoles/selected",
      appointmentsByMe: "appointmentsByMe/list",
      placeAppointments: "placeAppointments/list",
      appointmentsByMePageInfo: "appointmentsByMe/pageInfo",
      placeAppointmentsPageInfo: "placeAppointments/pageInfo",
      selectedDate: "appointmentsByMe/date"
    }),
    type: function() {
      return this.selectedRole ? "PLACE" : "ALL";
    },
    appointments: function() {
      return this.type === "ALL"
        ? this.appointmentsByMe
        : this.placeAppointments;
    },
    pageInfo: function() {
      return this.type === "ALL"
        ? this.appointmentsByMePageInfo
        : this.placeAppointmentsPageInfo;
    },
    canShowAppointments: function() {
      return (
        !this.loading.init &&
        !this.loading.newQuery &&
        this.appointments.length > 0
      );
    },
    orderBy: function() {
      return [
        {
          field: this.query.sortData.field,
          order: this.query.sortData.order
        }
      ];
    },
    date: function() {
      const today = new Date().toISOString().slice(0, 10);
      const futureSafeDate = "2100-01-01";

      if (this.selectedDate) {
        const selected = new Date(this.selectedDate);
        const nextAfterSelected = new Date(
          selected.setDate(selected.getDate() + 1)
        )
          .toISOString()
          .slice(0, 10);

        return {
          from: this.selectedDate,
          to: nextAfterSelected
        };
      }

      return {
        from: today,
        to: futureSafeDate
      };
    },
    title: function() {
      const enter = this.type === "ALL" ? "Wszystkie wizyty" : "Wizyty";
      const when = this.selectedDate
        ? ` ${new Date(this.selectedDate).toLocaleDateString()}`
        : "";
      const where =
        this.type === "PLACE" ? ` w ${this.selectedRole.place.name}` : "";
      return `${enter}${when}${where}`;
    }
  },
  methods: {
    ...mapActions({
      getAppointmentsByMe: "appointmentsByMe/get",
      getPlaceAppointments: "placeAppointments/get"
    }),
    getAppointments: async function(payload, type) {
      this.loading[type] = true;

      if (this.type === "ALL") {
        await this.getAppointmentsByMe(payload).catch(error => {
          this.$toasted.error("Wystąpił błąd");
          console.error(error);
        });
      } else {
        payload = Object.assign(payload, {
          id: this.selectedRole.place.id
        });

        await this.getPlaceAppointments(payload).catch(error => {
          this.$toasted.error("Wystąpił błąd");
          console.error(error);
        });
      }

      this.loading[type] = false;
    },
    getFirstAppointments: function() {
      const payload = {
        first: this.query.first,
        after: "",
        note: "",
        date: this.date,
        orderBy: this.orderBy,
        type: "SET"
      };

      this.getAppointments(payload, "init");
    },
    getNextAppointments: function() {
      const payload = {
        first: this.query.first,
        after: this.pageInfo.endCursor,
        note: `%${this.query.search}%`,
        date: this.date,
        orderBy: this.orderBy,
        type: "ADD"
      };

      this.getAppointments(payload, "next");
    }
  },
  watch: {
    query: {
      handler() {
        const payload = {
          first: this.query.first,
          after: "",
          note: `%${this.query.search}%`,
          date: this.date,
          orderBy: this.orderBy,
          type: "SET"
        };

        this.getAppointments(payload, "newQuery");
      },
      deep: true
    },
    selectedDate: function(val) {
      this.getFirstAppointments();
    },
    selectedRole: function(val) {
      this.getFirstAppointments();
    }
  },
  components: {
    MainBtn,
    MainSearch,
    AppointmentsSmall,
    GreyBlock,
    MainLoading
  },
  mounted() {
    this.getFirstAppointments();
  }
};
</script>

<style lang="scss" scoped>
@import "../../main";

.appointments {
  width: 100%;
}

.appointments__info {
  height: unset;
  padding: 1rem;
  margin-top: 1rem;
  &--loading {
    svg {
      height: 2rem;
      width: 2rem;
      margin-left: 1rem;
    }
  }
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

@media only screen and (min-width: 1150px) {
  .appointments__info {
    height: 24rem;
    padding: 0 1rem;
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