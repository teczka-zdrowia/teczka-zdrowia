<template>
  <div v-if="selectedRole">
    <div class="patients__actions">
      <div class="patients__title">
        Pacjenci
      </div>
      <MainSearch class="patients__search">
        <input
          class="input"
          v-model="search"
          slot="input"
          type="text"
          placeholder="  Szukaj"
        >
        <div
          class="select"
          slot="select"
        >
          <label>
            Sortuj:
            <select v-model="sortBy">
              <option
                value="ASC"
                selected
              >A - Z</option>
              <option value="DESC">Z - A</option>
            </select>
          </label>
        </div>
      </MainSearch>
    </div>
    <div v-if="!loading">
      <transition-group
        class="actions__patients"
        name="fade"
        tag="div"
      >
        <MainUser
          v-for="patient in sortedSearchResults"
          :key="patient.id"
          :data="patient"
          :isClickable="false"
          :editAffiliation="true"
        />
      </transition-group>
    </div>
    <GreyBlock
      class="patients__info"
      v-if="!loading && patients.length === 0"
    >Brak pacjentów</GreyBlock>
    <GreyBlock
      class="patients__info patients__info--loading"
      v-if="loading"
    >Ładowanie
      <MainLoading color="#67676e" />
    </GreyBlock>
  </div>
</template>

<script>
import MainSearch from "../../components/ui/basic/MainSearch";
import MainUser from "../../components/ui/basic/MainUser";
import MainBtn from "../../components/ui/basic/MainBtn";
import MainLoading from "../../components/ui/basic/MainLoading";
import GreyBlock from "../../components/ui/blocks/GreyBlock";

import { mapActions, mapGetters } from "vuex";

export default {
  name: "Patients",
  data: function() {
    return {
      firstTime: true,
      search: "",
      sortBy: "ASC",
      loading: false
    };
  },
  computed: {
    ...mapGetters({
      roles: "userRoles/list",
      selectedRole: "userRoles/selected",
      placePatients: "placePatients/list",
      myPatients: "myPatients/list"
    }),
    type: function() {
      return this.selectedRole ? "PLACE" : "ALL";
    },
    patients: function() {
      return this.type === "ALL" ? this.myPatients : this.placePatients;
    },
    placeId: function() {
      return this.selectedRole ? this.selectedRole.place.id : null;
    },
    searchResults: function() {
      return this.patients.filter(role => {
        const userName = role.user.name.toLowerCase();
        const search = this.search.toLowerCase();
        return ~userName.search(search);
      });
    },
    sortedSearchResults: function() {
      return this.sortBy === "ASC"
        ? this.searchResults.sort(
            (a, b) => (a.user.name > b.user.name) - (a.user.name < b.user.name)
          )
        : this.searchResults.sort(
            (a, b) => (a.user.name < b.user.name) - (a.user.name > b.user.name)
          );
    },
    title: function() {
      return this.type === "ALL"
        ? "Wszyscy pacjenci"
        : `Pacjenci w ${this.selectedRole.place.name}`;
    }
  },
  methods: {
    ...mapActions({
      showModal: "modal/show",
      getPlacePatients: "placePatients/get",
      getAllPatients: "myPatients/get"
    }),
    getPatients: async function() {
      this.loading = true;

      if (this.type === "ALL") {
        await this.getAllPatients().catch(error => {
          this.$toasted.error("Wystąpił błąd podczas ładowania pacjentów");
          console.error(error);
        });
      } else {
        await this.getPlacePatients(this.placeId).catch(error => {
          this.$toasted.error("Wystąpił błąd podczas ładowania pacjentów");
          console.error(error);
        });
      }

      this.loading = false;
    }
  },
  components: {
    MainUser,
    MainSearch,
    MainLoading,
    GreyBlock,
    MainBtn
  },
  watch: {
    placeId: function(val) {
      if (val !== undefined) {
        this.getPatients();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../main";

.patients__info {
  padding: 1rem;
  margin-bottom: 1rem;
  &--loading {
    svg {
      height: 2rem;
      width: 2rem;
      margin-left: 1rem;
    }
  }
}

.patients__actions {
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  width: calc(100% - 3rem);
  margin-bottom: 1rem;
  background: #fdfdfd;
  box-shadow: 0 0 20px 0px rgba(213, 213, 213, 0.3);
  border-radius: 0.5rem;
  & > button {
    height: 3rem !important;
  }
}

.patients__title {
  color: #3e3e45;
  font-weight: 700;
  font-size: 1.5em;
  padding-bottom: 1rem;
}

.patients__search {
  width: 100%;
}

.actions__btn {
  height: 100%;
  padding: 0.75rem;
  margin-right: 1rem;
  i {
    margin-right: 0.75rem;
  }
}

.actions__patients {
  display: grid;
  grid-template-columns: 100%;
  grid-column-gap: 1em;
  row-gap: 1em;
}

.actions__patient {
  @extend %text--center;
  position: relative;
  font-weight: 700;
  color: #3e3e45;
  width: auto;
  overflow: unset;
  text-overflow: unset;
  transition: all 0.2s ease-in-out;
  justify-content: left;
  white-space: nowrap;
  color: #67676e;
  cursor: pointer;
  height: 3.5rem;
  width: calc(100% - 2em);
  padding: 1em;
  border-radius: 0.5em;
  box-shadow: 0 0 20px 0px rgba(213, 213, 213, 0.3);
  background: #fafafc;
  i {
    margin-left: auto;
    padding: 0.5em;
    font-size: 1.5em;
    width: 1em;
    height: 1em;
    text-align: center;
    color: #6a6ee1;
    background: #e6e6e8;
    border-radius: 0.5em;
  }
  &:hover {
    transform: scale(1.025);
    box-shadow: 0 0 60px 0 rgba(145, 145, 156, 0.3);
  }
  &:active {
    transform: scale(1.0125);
  }
  &.disabled {
    background: #eeeef3;
    filter: grayscale(100%);
    i:hover {
      &::before {
        content: "";
      }
    }
  }
}

.options__select {
  display: flex;
  border-radius: 0.5em;
  overflow: hidden;
  width: 50%;
  &:not(:last-child) {
    margin-right: 2em;
  }
}

.select__title,
.select__content {
  width: 50%;
}

.select__title {
  @extend %text--center;
  padding: 0.75rem 1.5rem;
  background: #fafafc;
  color: #6a6ee1;
  font-weight: 600;
}
.select__content {
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  color: #fafafc;
  background: #6a6ee1;
  background: -webkit-gradient(
    linear,
    left top,
    right top,
    from(#9394eb),
    to(#6a6ee1)
  );
  background: linear-gradient(to right, #9394eb, #6a6ee1);
  -webkit-filter: drop-shadow(0 0 10px rgba(213, 213, 213, 0.3));
  filter: drop-shadow(0 0 10px rgba(213, 213, 213, 0.3));
  border: 0;
  option {
    font-weight: 600;
    background: #6a6ee1;
  }
}
</style>
