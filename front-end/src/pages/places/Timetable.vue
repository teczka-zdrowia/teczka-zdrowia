<template>
  <div>
    <div
      class="appointments__actions"
      v-if="!loading.init"
    >
      <div class="appointments__types">
        <MainBtn
          v-on:click.native="toggleShowUpcoming"
          v-bind:class="{active : showUpcoming}"
        >Nadchodzące</MainBtn>
        <MainBtn
          v-on:click.native="toggleShowUpcoming"
          v-bind:class="{active : !showUpcoming}"
        >Minione</MainBtn>
      </div>
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
      :showAddedBy="true"
      :canEdit="true"
      :showMoreBtn="pageInfo.hasNextPage"
      :loading="loading.next"
      :appointments="appointments"
      :viewerType="'author'"
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
  name: "Timetable",
  data: function() {
    return {
      maxAppointments: 0,
      showUpcoming: true,
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
      appointments: "placeAppointments/list",
      pageInfo: "placeAppointments/pageInfo"
    }),
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
      const oldSafeDate = "2000-01-01";

      return this.showUpcoming
        ? {
            from: today,
            to: futureSafeDate
          }
        : {
            from: oldSafeDate,
            to: today
          };
    },
    placeId: function() {
      return this.selectedRole.place.id;
    }
  },
  methods: {
    ...mapActions({
      getUserAppointments: "placeAppointments/get"
    }),
    toggleShowUpcoming: function() {
      this.showUpcoming = !this.showUpcoming;

      const sortData = this.query.sortData;
      if (sortData.field === "date") {
        sortData.order = this.showUpcoming ? "ASC" : "DESC";
      }
    },
    getAppointments: async function(payload, type) {
      this.loading[type] = true;

      await this.getUserAppointments(payload).catch(error => {
        this.$toasted.error("Wystąpił błąd");
        console.error(error);
      });

      this.loading[type] = false;
    },
    getFirstAppointments: function() {
      const payload = {
        id: this.placeId,
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
        id: this.placeId,
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
          id: this.placeId,
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
    placeId: function() {
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

.appointments__info {
  height: unset;
  padding: 1rem;
  margin-top: 1em;
  &--loading {
    svg {
      height: 2rem;
      width: 2rem;
      margin-left: 1rem;
    }
  }
}

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
    min-width: 10rem;
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

.appointments__bottom {
  margin-top: 0.5em;
  height: 3em;
  display: flex;
  justify-content: center;
}

.appointments__more {
  @extend %text--center;
  border: 0;
  transition: 0.2s ease-in-out;
  border-radius: 0.5em;
  border-radius: 0.25em;
  padding: 0.5em 1.5em;
  background: none;
  color: #1a1b37;
  font-weight: 600;
  background: #fafafc;
  cursor: pointer;
  &:hover {
    background: #ffffff;
  }
  i {
    margin-left: 0.75em;
  }
}

@media only screen and (min-width: 1150px) {
  .appointments__actions {
    flex-direction: row;
  }
  .appointments__types {
    padding-bottom: 0;
  }
  .appointments__info {
    height: 24rem;
    padding: 0 1rem;
  }
}
</style>