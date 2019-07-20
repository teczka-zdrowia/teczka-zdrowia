<template>
  <div class="places">
    <div
      class="places__nav--mobile"
      v-if="isMobile"
    >
      <div
        class="nav__el"
        v-on:click="placesShowed = !placesShowed; cardsShowed = false"
      >
        <div
          class="nav__title"
          v-if="!selectedPlace"
        >Gabinet</div>
        <div
          class="nav__title"
          v-else
        >{{ selectedPlace.name }}</div>
        <span
          aria-hidden="true"
          class="fas"
          v-bind:class="[ placesShowed ? 'fa-angle-up' : 'fa-angle-down' ]"
        />
        <div
          class="nav__list nav__list--left"
          v-bind:class="{ showed : placesShowed }"
        >
          <div class="places">
            <div
              class="place"
              :key="index"
              v-for="(place, index) in userPlaces"
              v-bind:class="{ 'disabled' : !place.isActive }"
              v-on:click="selectPlace(place.id)"
            >
              <div class="place__content">
                <div class="place__title">{{ place.name }}</div>
                <div class="place__info">{{ place.address }}, {{ place.city }}</div>
              </div>
              <span
                aria-hidden="true"
                class="fas fa-angle-right place__select place__select--white"
                title="Wybierz gabinet"
                v-if="place.isActive"
              />
              <span
                aria-hidden="true"
                class="fas fa-unlock place__select place__select--white"
                title="Odblokuj"
                v-if="!place.isActive && place.isAdmin"
              />
            </div>
            <MainBtn
              class="places__btn"
              v-on:click.native="createPlace"
            >
              <span
                aria-hidden="true"
                class="fas fa-plus"
              />Nowy gabinet
            </MainBtn>
          </div>
        </div>
      </div>
      <div
        class="nav__el"
        v-if="selectedPlace"
        v-on:click="cardsShowed = !cardsShowed; placesShowed = false"
      >
        <div
          class="nav__title"
          v-if="selectedPlace"
        >{{ cards[selectedCard] }}</div>
        <span
          aria-hidden="true"
          class="fas"
          v-if="selectedCard"
          v-bind:class="[ cardsShowed ? 'fa-angle-up' : 'fa-angle-down' ]"
        />
        <div
          class="nav__list nav__list--right"
          v-bind:class="{ showed : cardsShowed }"
        >
          <div class="cards">
            <div
              class="card"
              v-on:click="selectedCard = 1"
              v-bind:class="{'selected': selectedCard == 1}"
            >Terminarz</div>
            <div
              class="card"
              v-on:click="selectedCard = 2"
              v-bind:class="{'selected': selectedCard == 2}"
            >Pacjenci</div>
            <div
              class="card"
              v-on:click="selectedCard = 3"
              v-bind:class="{'selected': selectedCard == 3}"
              v-if="selectedPlace && selectedPlace.isAdmin"
            >Administracja</div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="row"
      v-bind:class="{ 'block--blur' : placesShowed || cardsShowed }"
    >
      <div
        class="places__list"
        v-if="!isMobile"
      >
        <div>
          <div class="places__title">Moje gabinety</div>
          <div class="places">
            <div
              class="place"
              :key="index"
              v-for="(place, index) in userPlaces"
              v-bind:class="{ 'disabled' : !place.isActive, 'selected' : place == selectedPlace }"
            >
              <span
                aria-hidden="true"
                class="fas fa-briefcase place__icon"
              />
              <div class="place__content">
                <div class="place__title">{{ place.name }}</div>
                <div class="place__info">{{ place.address }}, {{ place.city }}</div>
              </div>
              <span
                aria-hidden="true"
                class="fas fa-angle-right place__select place__select--white"
                title="Wybierz gabinet"
                v-if="place.isActive"
                v-on:click="selectPlace(place.id)"
              />
              <span
                aria-hidden="true"
                class="fas fa-unlock place__select place__select--white"
                title="Aktywuj"
                v-on:click="activatePlace(place.id, place.name)"
                v-if="!place.isActive && place.isAdmin"
              />
            </div>
          </div>
          <MainBtn
            class="places__btn"
            v-on:click.native="createPlace"
          >
            <span
              aria-hidden="true"
              class="fas fa-plus"
            />Nowy gabinet
          </MainBtn>
        </div>
      </div>
      <div class="places__actions">
        <GreyBlock
          v-if="!selectedCard"
          class="places__info"
        >Wybierz gabinet</GreyBlock>
        <div
          v-if="selectedCard"
          class="actions__content"
        >
          <div
            class="actions__top"
            v-if="!isMobile"
          >
            <div
              class="actions__top__el"
              v-on:click="selectedCard = 1"
              v-bind:class="{'selected': selectedCard == 1}"
            >Terminarz</div>
            <div
              class="actions__top__el"
              v-on:click="selectedCard = 2"
              v-bind:class="{'selected': selectedCard == 2}"
            >Pacjenci</div>
            <div
              class="actions__top__el"
              v-on:click="selectedCard = 3"
              v-bind:class="{'selected': selectedCard == 3}"
              v-if="selectedPlace.isAdmin"
            >Administracja</div>
          </div>
          <Timetable v-if="selectedCard == 1" />
          <Patients v-if="selectedCard == 2" />
          <Management v-if="selectedCard == 3" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WhiteFunctionalBlock from "../../components/ui/blocks/WhiteFunctionalBlock";
import MainBtn from "../../components/ui/basic/MainBtn";
import GreyBlock from "../../components/ui/blocks/GreyBlock";
import MainSelect from "../../components/ui/basic/MainSelect";
import Patients from "./Patients";
import Timetable from "./Timetable";
import Management from "./Management";

import { mapActions, mapGetters } from "vuex";

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
    GreyBlock,
    MainBtn,
    Patients,
    Timetable,
    Management
  },
  methods: {
    ...mapActions({
      setSelectedPlace: "userPlaces/setSelected",
      showModal: "modal/show"
    }),
    selectPlace: function(id) {
      this.setSelectedPlace(id);
      this.selectedCard = 1;
    },
    activatePlace: function(id, name) {
      this.showModal({
        componentName: "ActivatePlace",
        data: {
          place: {
            id: id,
            name: name
          }
        }
      });
    },
    createPlace: function() {
      this.showModal({
        componentName: "CreatePlace"
      });
    }
  },
  computed: {
    ...mapGetters({
      userPlaces: "userPlaces/list",
      selectedPlace: "userPlaces/selected",
      isMobile: "window/isMobile"
    })
  }
};
</script>

<style lang="scss" scoped>
@import "../../main";

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

.places__title {
  padding: 1em;
  display: flex;
  font-weight: 700;
  text-align: center;
  border-radius: 0.5rem;
  font-size: 1.25rem;
  box-shadow: 0 0 20px 0px rgba(213, 213, 213, 0.3);
  background: #fdfdfd;
  color: #3e3e45;
  margin-bottom: 1rem;
}

.places__btn {
  width: 100% !important;
  padding: 1rem 0 !important;
  vertical-align: middle;
  margin-top: 1.5rem;
  span {
    vertical-align: middle;
    margin-right: 0.75em;
  }
}

.place {
  font-weight: 600;
  display: flex;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 20px 0px rgba(213, 213, 213, 0.3);
  background: #eeeef3;
  transition: 0.2s ease-in-out;
  &:not(:last-child) {
    margin-bottom: 1rem;
  }
  &.selected {
    background: #fafafc;
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
  margin: auto;
  &--white {
    color: #6a6ee1;
    &:hover {
      background: #eeeef3;
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
  background: #fdfdfd !important;
  height: 100%;
  padding: 4em 0;
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
    span {
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
      padding: 1.5em 0;
      width: 100%;
      cursor: pointer;
      &:not(:last-child) {
        border-bottom: 1px solid rgba(213, 213, 213, 0.6);
      }
    }
  }
  .place {
    box-shadow: none;
    justify-content: space-between;
    position: relative;
    .place__select {
      padding: 0.5em 0;
      margin-left: auto;
      margin-right: 0;
    }
    &:not(:hover) {
      background: transparent;
    }
    &:not(:last-of-type) {
      &::after {
        content: "";
        position: absolute;
        top: calc(100% + 0.5rem);
        width: calc(100% - 2rem);
        height: 1px;
        background: rgba(213, 213, 213, 0.6);
      }
    }
  }
}

@media only screen and (min-width: 960px) {
  .row {
    display: flex;
  }
  .places__list {
    width: 33%;
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