<template>
  <div>
    <div
      class="appointments__actions"
      v-if="showActions && !loading.init"
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
              <option>Specjalista</option>
              <option>Gabinet</option>
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
    <AppointmentsDesktop
      class="appointments__content"
      :showAppointmentsLink="showAppointmentsLink"
      :showMoreBtn="pageInfo.hasNextPage && !showAppointmentsLink"
      :loading="loading.next"
      v-on:loadNext="getNextAppointments"
      v-if="!isMobile && canShowAppointments"
    />
    <AppointmentsMobile
      :showAppointmentsLink="showAppointmentsLink"
      :showMoreBtn="pageInfo.hasNextPage && !showAppointmentsLink"
      :loading="loading.next"
      v-on:loadNext="getNextAppointments"
      v-if="isMobile && canShowAppointments"
    />
    <GreyBlock
      class="appointments__info"
      v-if="!loading.init && appointments.length === 0"
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
import MainBtn from "../basic/MainBtn";
import MainSearch from "../basic/MainSearch";
import MainLoading from "../basic/MainLoading";
import GreyBlock from "../blocks/GreyBlock";
import AppointmentsDesktop from "./AppointmentsDesktop";
import AppointmentsMobile from "./AppointmentsMobile";

import { mapGetters, mapActions } from "vuex";

export default {
  name: "AppointmentsBox",
  props: {
    showActions: {
      type: Boolean,
      default: true
    },
    showAppointmentsLink: {
      type: Boolean,
      default: false
    }
  },
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
      appointments: "userAppointments/list",
      pageInfo: "userAppointments/pageInfo"
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
    }
  },
  methods: {
    ...mapActions({
      getUserAppointments: "userAppointments/get"
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
    }
  },
  components: {
    MainBtn,
    MainSearch,
    AppointmentsDesktop,
    AppointmentsMobile,
    GreyBlock,
    MainLoading
  },
  mounted() {
    this.$nextTick(() => {
      if (!this.$store.getters["window/isMobile"]) {
        this.maxAppointments = Math.floor(this.$el.offsetWidth / 320);
        if (this.showAppointmentsLink) {
          this.maxAppointments--;
        }
        this.query.first = this.maxAppointments;
      }
      this.getFirstAppointments();
    });
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
  margin-top: 2em;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 1rem;
}

.appointments__info {
  height: unset;
  padding: 1rem;
  margin-top: 2em;
  &--loading {
    svg {
      height: 2rem;
      width: 2rem;
      margin-left: 1rem;
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
  .appointments__info {
    height: 24rem;
    padding: 0 1rem;
  }
}
</style>