<template>
  <div class="management__employees">
    <div class="employees__block">Pracownicy</div>
    <div
      class="employees__actions"
      v-if="!loading.init"
    >
      <MainBtn
        class="actions__btn"
        v-if="isPaymentValid"
        v-on:click.native="addNewEmployee"
      >
        <span
          aria-hidden="true"
          class="fas fa-plus"
        />
        Nowy
      </MainBtn>
      <MainSearch class="employees__search">
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
              >A - Z
              </option>
              <option value="DESC">Z - A</option>
            </select>
          </label>
        </div>
      </MainSearch>
    </div>
    <div v-if="!loading.init">
      <transition-group
        class="employees__list"
        name="fade"
        tag="div"
      >
        <MainUser
          v-for="employee in sortedSearchResults"
          :key="employee.id"
          :data="employee"
          :isClickable="false"
          :editAffiliation="true"
        />
      </transition-group>
    </div>
    <GreyBlock
      class="employees__info"
      v-if="!loading.init && employees.length === 0"
    >Brak pracowników
    </GreyBlock>
    <GreyBlock
      class="employees__info employees__info--loading"
      v-if="loading.init"
    >Ładowanie
      <MainLoading color="#67676e"/>
    </GreyBlock>
  </div>
</template>

<script>
import MainBtn from '../../components/ui/basic/MainBtn'
import MainSearch from '../../components/ui/basic/MainSearch'
import MainUser from '../../components/ui/basic/MainUser'
import MainLoading from '../../components/ui/basic/MainLoading'
import GreyBlock from '../../components/ui/blocks/GreyBlock'

import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Employees',
  components: {
    MainSearch,
    MainBtn
  },
  data: function () {
    return {
      search: '',
      sortBy: 'ASC',
      loading: {
        init: true
      }
    }
  },
  computed: {
    ...mapGetters({
      selectedRole: 'userRoles/selected',
      employees: 'placeEmployees/list',
      isPaymentValid: 'userInfo/isPaymentValid'
    }),
    searchResults: function () {
      return this.employees.filter(role => {
        const userName = role.user.name.toLowerCase()
        const search = this.search.toLowerCase()
        return ~userName.search(search)
      })
    },
    sortedByNameSearchResults: function () {
      return this.sortBy === 'ASC'
        ? this.searchResults.sort(
          (a, b) => (a.user.name > b.user.name) - (a.user.name < b.user.name)
        )
        : this.searchResults.sort(
          (a, b) => (a.user.name < b.user.name) - (a.user.name > b.user.name)
        )
    },
    sortedSearchResults: function () {
      return this.sortedByNameSearchResults.sort(
        (a, b) =>
          (a.permission_type > b.permission_type) -
            (a.permission_type < b.permission_type)
      )
    },
    placeId: function () {
      return this.selectedRole.place.id
    }
  },
  methods: {
    ...mapActions({
      showModal: 'modal/show',
      initAddEmployeePlace: 'addEmployee/initPlace',
      getPlaceEmployees: 'placeEmployees/get'
    }),
    addNewEmployee: function () {
      this.initAddEmployeePlace(this.selectedRole.place)
      this.showModal({
        componentName: 'AddEmployee'
      })
    },
    getEmployees: async function () {
      this.loading.init = true

      await this.getPlaceEmployees(this.placeId).catch(error => {
        this.$toasted.error('Wystąpił błąd podczas ładowania pracowników')
        console.error(error)
      })

      this.loading.init = false
    }
  },
  components: {
    MainUser,
    MainSearch,
    MainBtn,
    MainLoading,
    GreyBlock
  },
  watch: {
    placeId: function () {
      this.getEmployees()
    }
  },
  mounted () {
    this.getEmployees()
  }
}
</script>

<style lang="scss" scoped>
  @import "../../main";

  .management__employees {
    & > div:not(:last-child) {
      margin-bottom: 1rem;
    }
  }

  .employees__info {
    height: unset;
    padding: 1rem;

    &--loading {
      svg {
        height: 2rem;
        width: 2rem;
        margin-left: 1rem;
      }
    }
  }

  .employees__block {
    padding: 1rem;
    width: calc(100% - 2rem);
    margin-bottom: 1rem;
    background: #fdfdfd;
    box-shadow: 0 0 20px 0px rgba(213, 213, 213, 0.3);
    border-radius: 0.5rem;
    color: #3e3e45;
    text-align: center;
    font-weight: 700;
    font-size: 1.5em;
  }

  .employees__actions {
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    width: calc(100% - 2rem);
    margin-bottom: 1rem;
    background: #fdfdfd;
    box-shadow: 0 0 20px 0px rgba(213, 213, 213, 0.3);
    border-radius: 0.5rem;
  }

  .employees__list {
    display: grid;
    grid-template-columns: 100%;
    grid-column-gap: 1em;
    row-gap: 1em;
  }

  .employees__search:only-child {
    width: 100%;
  }

  .actions__btn {
    height: 100%;
    padding: 0.75rem;
    margin-right: 1rem;

    span {
      margin-right: 0.75rem;
    }
  }

  @media only screen and (min-width: 960px) {
    .employees__info {
      height: 24rem;
      padding: 0 1rem;
    }
  }
</style>
