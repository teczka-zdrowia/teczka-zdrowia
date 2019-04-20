<template>
  <div class="places">
    <div class="place places__title">Gabinet:</div>
    <div
      class="place"
      :key="index"
      v-for="(place, index) in userPlaces"
      v-on:click="selectPlace(place.id)"
      v-bind:class="{ 'inactive' : !place.isActive, 'selected' : place == selectedPlace }"
    >
      {{ place.name }}
      <span
        aria-hidden="true"
        class="fas fa-angle-right place__select"
        title="Wybierz gabinet"
        v-if="place.isActive"
      />
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Places",
  methods: {
    ...mapActions({
      setSelectedPlace: "userPlaces/setSelected"
    }),
    selectPlace: function(ID) {
      const oldID = this.selectedPlace ? this.selectedPlace.id : null;
      if (ID === oldID) {
        this.setSelectedPlace(null);
      } else {
        this.setSelectedPlace(ID);
      }
    }
  },
  computed: {
    ...mapGetters({
      userPlaces: "userPlaces/list",
      selectedPlace: "userPlaces/selected"
    })
  }
};
</script>

<style lang="scss" scoped>
@import "../../main";

.places {
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
</style>