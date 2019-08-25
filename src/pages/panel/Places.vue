<template>
  <div class="places">
    <div
      class="places__list"
      v-if="!loading.init && select && roles.length > 0"
    >
      <div class="place places__title">Gabinet</div>
      <div
        class="place"
        v-for="role in roles"
        :key="role.id"
        v-show="role.permission_type !== 'PATIENT' && role.is_active && role.place.is_active"
        v-on:click="selectRole(role.id)"
        v-bind:class="{ 'selected' : role.place === selectedPlace }"
      >
        {{ role.place.name }}
        <span
          aria-hidden="true"
          class="fas fa-angle-right place__select"
          title="Wybierz gabinet"
        />
      </div>
    </div>
    <div
      class="place--selected"
      v-if="!select && selectedPlace"
    >
      <div class="place places__title">Gabinet</div>
      <div class="place selected">
        {{ selectedPlace.name }}
      </div>
      <button
        class="place__back"
        v-on:click="select = true"
      >
        Wróć
      </button>
    </div>
    <GreyBlock
      class="places__info"
      v-if="!loading.init && roles.length === 0"
    >Brak gabinetów</GreyBlock>
    <GreyBlock
      class="places__info places__info--loading"
      v-if="loading.init"
    >Ładowanie
      <MainLoading color="#67676e" />
    </GreyBlock>
  </div>
</template>

<script>
import GreyBlock from "../../components/ui/blocks/GreyBlock";
import MainLoading from "../../components/ui/basic/MainLoading";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Places",
  data: function() {
    return {
      loading: {
        init: false
      },
      select: true
    };
  },
  methods: {
    ...mapActions({
      setSelectedRole: "userRoles/setSelected",
      getUserRoles: "userRoles/get"
    }),
    selectRole: function(Id) {
      if (this.selectedRole && Id === this.selectedRole.id) {
        this.setSelectedRole(null);
      } else {
        this.setSelectedRole(Id);
        this.select = false;
      }
    },
    getRoles: async function() {
      this.loading.init = true;

      await this.getUserRoles().catch(error => {
        this.$toasted.error("Wystąpił błąd");
        console.error(error);
      });

      this.loading.init = false;
    }
  },
  computed: {
    ...mapGetters({
      roles: "userRoles/list",
      selectedRole: "userRoles/selected"
    }),
    selectedPlace: function() {
      return this.selectedRole ? this.selectedRole.place : null;
    }
  },
  components: {
    GreyBlock,
    MainLoading
  },
  mounted() {
    if (this.roles.length === 0) {
      this.getRoles();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../main";

.places__list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 1rem;
  margin-bottom: 1rem;
}

.place {
  @extend %text--center;
  color: #3e3e45;
  font-weight: 600;
  width: calc(100% - 2.5rem);
  padding: 1.25rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 20px 0px rgba(213, 213, 213, 0.3);
  background: #eeeef3;
  transition: 0.2s ease-in-out;
  text-align: center;
  cursor: pointer;
  &.selected,
  &.places__title {
    background: #fafafc;
  }
  &.inactive {
    display: none;
  }
  &--selected {
    display: grid;
    grid-template-columns: 10rem auto 5rem;
    margin-bottom: 1rem;
    & > .places__title {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
    & > .place.selected {
      border-radius: 0;
      background: #efefef;
      cursor: unset;
    }
    & > .place__back {
      padding: 1rem;
      background: #8789e8;
      color: #fafafa;
      border-top-right-radius: 0.5rem;
      border-bottom-right-radius: 0.5rem;
      font-weight: 600;
      cursor: pointer;
    }
  }
}

.places__title {
  font-size: 1.5rem;
  cursor: unset;
  font-weight: 700;
}

.place__select {
  margin-left: auto;
  font-size: 1.5em;
  width: 1em;
  height: 1em;
  text-align: center;
  border-radius: 0.5em;
  transition: 0.2s ease-in-out;
  color: #6a6ee1;
}

.places__info {
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
</style>
