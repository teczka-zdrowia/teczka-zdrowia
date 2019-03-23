<template>
  <div class="places">
    <div class="places__nav--mobile" v-if="isMobile">
      <div class="nav__el" v-on:click="placesShowed = !placesShowed">
        <div class="nav__title" v-if="!selectedPlace">Gabinet</div>
        <div class="nav__title" v-else>{{ selectedPlace.name }}</div>
        <i class="fas" v-bind:class="[ placesShowed ? 'fa-angle-up' : 'fa-angle-down' ]"></i>
        <div class="nav__list nav__list--left" v-bind:class="{ showed : placesShowed }">
          <div class="places">
            <div
              class="place"
              :key="index"
              v-for="(place, index) in this.$store.getters.userPlaces"
              v-bind:class="{ 'disabled' : !place.isActive }"
            >
              <i class="fas fa-briefcase place__icon"></i>
              <div class="place__content">
                <div class="place__title">{{ place.name }}</div>
                <div class="place__info">{{ place.address }}, {{ place.city }}</div>
              </div>
              <i
                class="fas fa-angle-right place__select place__select--white"
                title="Wybierz gabinet"
                v-if="place.isActive"
                v-on:click="selectPlace(place.id)"
              ></i>
              <i
                class="fas fa-unlock place__select place__select--white"
                title="Odblokuj"
                v-if="!place.isActive && place.isAdmin"
              ></i>
            </div>
            <MainBtn class="places__btn">
              <i class="fas fa-plus"></i>Nowy gabinet
            </MainBtn>
          </div>
        </div>
      </div>
      <div class="nav__el" v-if="selectedPlace" v-on:click="cardsShowed = !cardsShowed">
        <div class="nav__title" v-if="selectedPlace">{{ cards[selectedCard] }}</div>
        <i
          class="fas"
          v-if="selectedCard"
          v-bind:class="[ cardsShowed ? 'fa-angle-up' : 'fa-angle-down' ]"
        ></i>
        <div class="nav__list nav__list--right" v-bind:class="{ showed : cardsShowed }">
          <div class="cards">
            <div
              class="card"
              v-on:click="selectedCard = 1"
              v-bind:class="[selectedCard == 1 ? 'selected': '']"
            >Terminarz</div>
            <div
              class="card"
              v-on:click="selectedCard = 2"
              v-bind:class="[selectedCard == 2 ? 'selected': '']"
            >Pacjenci</div>
            <div
              class="card"
              v-on:click="selectedCard = 3"
              v-bind:class="[selectedCard == 3 ? 'selected': '']"
              v-if="selectedPlace && selectedPlace.isAdmin"
            >Administracja</div>
          </div>
        </div>
      </div>
    </div>
    <div class="row" v-bind:class="{ 'block--blur' : placesShowed || cardsShowed }">
      <Block class="places__list" title="Twoje gabinety" v-if="!isMobile">
        <div>
          <div class="places">
            <div
              class="place"
              :key="index"
              v-for="(place, index) in this.$store.getters.userPlaces"
              v-bind:class="{ 'disabled' : !place.isActive }"
            >
              <i class="fas fa-briefcase place__icon"></i>
              <div class="place__content">
                <div class="place__title">{{ place.name }}</div>
                <div class="place__info">{{ place.address }}, {{ place.city }}</div>
              </div>
              <i
                class="fas fa-angle-right place__select place__select--white"
                title="Wybierz gabinet"
                v-if="place.isActive"
                v-on:click="selectPlace(place.id)"
              ></i>
              <i
                class="fas fa-unlock place__select place__select--white"
                title="Odblokuj"
                v-if="!place.isActive && place.isAdmin"
              ></i>
            </div>
          </div>
          <MainBtn class="places__btn">
            <i class="fas fa-plus"></i>Nowy gabinet
          </MainBtn>
        </div>
      </Block>
      <div class="places__actions">
        <div v-if="!selectedCard" class="places__info">Wybierz gabinet</div>
        <div v-if="selectedCard" class="actions__content">
          <div class="actions__top" v-if="!isMobile">
            <div
              class="actions__top__el"
              v-on:click="selectedCard = 1"
              v-bind:class="[selectedCard == 1 ? 'selected': '']"
            >Terminarz</div>
            <div
              class="actions__top__el"
              v-on:click="selectedCard = 2"
              v-bind:class="[selectedCard == 2 ? 'selected': '']"
            >Pacjenci</div>
            <div
              class="actions__top__el"
              v-on:click="selectedCard = 3"
              v-bind:class="[selectedCard == 3 ? 'selected': '']"
              v-if="selectedPlace.isAdmin"
            >Administracja</div>
          </div>
          <Timetable v-if="selectedCard == 1"/>
          <Patients v-if="selectedCard == 2"/>
          <Management v-if="selectedCard == 3"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WhiteFunctionalBlock from "../../components/ui/blocks/WhiteFunctionalBlock";
import MainBtn from "../../components/ui/basic/MainBtn";
import MainSelect from "../../components/ui/basic/MainSelect";
import Patients from "./Patients";
import Timetable from "./Timetable";
import Management from "./Management";

export default {
  name: "Places",
  data: function() {
    return {
      selectedCard: false,
      placesShowed: false,
      cardsShowed: false,
      cards: {
        1: "Terminarz",
        2: "Pacjenci",
        3: "Administracja"
      }
    };
  },
  components: {
    Block: WhiteFunctionalBlock,
    MainBtn,
    Patients,
    Timetable,
    Management
  },
  methods: {
    selectPlace: function(id) {
      this.$store.dispatch("setSelectedPlace", id);

      this.selectedCard = 1;
    }
  },
  computed: {
    selectedPlace: function() {
      return this.$store.getters.selectedPlace;
    },
    isMobile: function() {
      return this.$store.getters.window.width < 960;
    }
  },
  watch: {
    $route(to, from) {
      this.$store.dispatch("setSelectedPlace", false);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../main";

.places__nav--mobile {
  background: #f5f5f5;
  position: fixed;
  z-index: 100;
  top: 5rem;
  left: 0;
  height: 3.5rem;
  width: 100%;
  display: flex;
  .nav__el {
    @extend %text--center;
    cursor: pointer;
    font-weight: 700;
    color: #3e3e45;
    font-size: 1rem;
    width: 100%;
    height: 100%;
    position: relative;
    max-width: 50%;
    i {
      margin-left: 0.75em;
    }
  }
  .nav__title {
    max-width: 85%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .nav__list {
    visibility: hidden;
    opacity: 0;
    z-index: 0;
    background: #f5f5f5;
    position: absolute;
    top: 100%;
    padding: 2rem 0.75rem;
    font-size: 1rem;
    width: calc(100vw - 1.5rem);
    box-shadow: 0 60px 20px 0px rgba(213, 213, 213, 0.3);
    transition: all 0.2s ease-in-out;
    overflow: auto;
    max-height: calc(100vh - 11rem);
    &.showed {
      visibility: visible;
      opacity: 1;
      z-index: 10;
      transition: all 0.2s ease-in-out;
    }
    &--left {
      left: 0;
    }
    &--right {
      left: -100%;
    }
  }
  .cards {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    .card {
      @extend %text--center;
      font-weight: 700;
      font-size: 1.25em;
      color: #67676e;
      padding: 1em 0;
      width: 100%;
      cursor: pointer;
      &:not(:last-child) {
        border-bottom: 1px solid rgba(213, 213, 213, 0.6);
      }
    }
  }
}

.row {
  margin-bottom: 1em;
  display: block;
  width: 100%;
  justify-content: space-between;
  transition: all 0.2s ease-in-out;
  &:last-child {
    margin-bottom: 3em;
  }
}

.places__list {
  width: calc(100% - 3rem);
  margin-bottom: 1rem;
  display: block;
  position: relative;
  height: 100%;
}

.places__btn {
  width: 100% !important;
  padding: 1rem 0 !important;
  vertical-align: middle;
  margin-top: 1.5rem;
  i {
    vertical-align: middle;
    margin-right: 0.75em;
  }
}

.place {
  font-weight: 600;
  display: flex;
  &:not(:first-child) {
    padding-top: 1em;
  }
  &:not(:last-child) {
    padding-bottom: 1em;
    border-bottom: 1px solid rgba(213, 213, 213, 0.6);
  }
  &.disabled {
    filter: grayscale(100%);
  }
}

.place__icon {
  margin-right: 1rem;
  padding: 0.5em;
  font-size: 1.5em;
  width: 1em;
  height: 1em;
  text-align: center;
  color: #6a6ee1;
  background: #eeeef3;
  border-radius: 0.5em;
}

.place__content {
  height: 100%;
  margin: auto 0;
  margin-right: 1em;
  white-space: normal;
  width: calc(100% - 8em);
  word-break: break-word;
}

.place__title {
  font-weight: 700;
  color: #3e3e45;
  margin-bottom: 0.25em;
}

.place__info {
  color: #67676e;
}

.place__select {
  margin-left: auto;
  padding: 0.5em;
  font-size: 1.5em;
  width: 1em;
  height: 1em;
  text-align: center;
  border-radius: 0.5em;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  &--white {
    background: #eeeef3;
    color: #6a6ee1;
    &:hover {
      background: #e6e6e8;
    }
  }
  &--violet {
    background: $darkviolet;
    background: linear-gradient(to right, $lightviolet, $darkviolet);
    filter: drop-shadow(0 0 10px $lightgrey);
    color: #ececff;
    &:hover {
      background-position: right center;
    }
  }
}

.places__actions {
  width: 100%;
  margin-top: 3.5rem;
}

.places__info {
  @extend %text--center;
  font-weight: 700;
  font-size: 1.5em;
  color: #67676e;
  height: 100%;
  padding: 4em 0;
  border-radius: 0.5em;
  box-shadow: 0 0 20px 0px rgba(213, 213, 213, 0.3);
  background: #fdfdfd;
}

.actions__content {
  height: 100%;
  display: block;
}

.actions__top {
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  margin-bottom: 1rem;
  &__el {
    @extend %text--center;
    font-weight: 700;
    font-size: 1.25em;
    color: #67676e;
    padding: 1em 0;
    width: 100%;
    border-radius: 0.5em;
    box-shadow: 0 0 20px 0px rgba(213, 213, 213, 0.3);
    background: #eeeef3;
    transition: 0.2s ease-in-out;
    cursor: pointer;
    &:not(:last-child) {
      margin-right: 1rem;
    }
    &.selected {
      background: #fdfdfd;
      color: #3e3e45;
    }
  }
}

@media only screen and (min-width: 960px) {
  .row {
    display: flex;
  }
  .places__list {
    width: calc(33% - 4em);
    margin-bottom: 0;
    margin-right: 1rem;
  }
  .places__info {
    padding: 0;
  }
  .places__actions {
    width: calc(67% - 1em);
    margin-top: 0;
  }
}
</style>