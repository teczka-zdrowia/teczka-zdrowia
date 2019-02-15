<template>
  <div class="offices">
    <div class="row">
      <Block class="offices__list" title="Twoje gabinety">
        <div class="offices">
          <div class="office">
            <i class="fas fa-briefcase office__icon"></i>
            <div class="office__content">
              <div class="office__title">MedMax</div>
              <div class="office__info">Kwiatowa 45, Warszawa</div>
            </div>
            <i
              class="fas fa-angle-right office__select office__select--white"
              title="Wybierz gabinet"
              v-on:click="officeSelected = true"
            ></i>
          </div>
          <div class="office">
            <i class="fas fa-briefcase office__icon"></i>
            <div class="office__content">
              <div class="office__title">MedMax</div>
              <div class="office__info">Kwiatowa 45, Warszawa</div>
            </div>
            <i
              class="fas fa-angle-right office__select office__select--white"
              title="Wybierz gabinet"
              v-on:click="officeSelected = true"
            ></i>
          </div>
        </div>
        <MainBtn class="offices__btn">
          <i class="fas fa-plus"></i>Utwórz gabinet
        </MainBtn>
      </Block>
      <div class="offices__actions">
        <div v-if="!officeSelected" class="offices__info">Wybierz gabinet</div>
        <div v-if="officeSelected" class="actions__content">
          <div class="actions__top">
            <div
              class="actions__top__el"
              v-on:click="cardSelected = 1"
              v-bind:class="[cardSelected == 1 ? 'selected': '']"
            >Terminarz</div>
            <div
              class="actions__top__el"
              v-on:click="cardSelected = 2"
              v-bind:class="[cardSelected == 2 ? 'selected': '']"
            >Pacjenci</div>
            <div
              class="actions__top__el"
              v-on:click="cardSelected = 3"
              v-bind:class="[cardSelected == 3 ? 'selected': '']"
            >Administracja</div>
          </div>
          <div class="actions__patients" v-if="cardSelected == 2">
            <div class="actions__patient">
              <img
                src="https://www.mendeley.com/careers/getasset/c475b7c0-d36c-4c73-be33-a34030b6ca82/"
              >
              <div class="patient__name">Jan Iksiński</div>
            </div>
            <div class="actions__patient">
              <img
                src="https://www.mendeley.com/careers/getasset/c475b7c0-d36c-4c73-be33-a34030b6ca82/"
              >
              <div class="patient__name">Jan Iksiński</div>
            </div>
            <div class="actions__patient">
              <img
                src="https://www.mendeley.com/careers/getasset/c475b7c0-d36c-4c73-be33-a34030b6ca82/"
              >
              <div class="patient__name">Jan Iksiński</div>
            </div>
            <div class="actions__patient">
              <img
                src="https://www.mendeley.com/careers/getasset/c475b7c0-d36c-4c73-be33-a34030b6ca82/"
              >
              <div class="patient__name">Jan Iksiński</div>
            </div>
            <div class="actions__patient">
              <img
                src="https://www.mendeley.com/careers/getasset/c475b7c0-d36c-4c73-be33-a34030b6ca82/"
              >
              <div class="patient__name">Jan Iksiński</div>
            </div>
            <div class="actions__patient disabled">
              <img
                src="https://www.mendeley.com/careers/getasset/c475b7c0-d36c-4c73-be33-a34030b6ca82/"
              >
              <div class="patient__name">Jan Iksiński</div>
              <i class="fas fa-lock"></i>
            </div>
            <div class="actions__patient disabled">
              <img
                src="https://www.mendeley.com/careers/getasset/c475b7c0-d36c-4c73-be33-a34030b6ca82/"
              >
              <div class="patient__name">Jan Iksiński</div>
              <i class="fas fa-lock"></i>
            </div>
            <div class="actions__patient disabled">
              <img
                src="https://www.mendeley.com/careers/getasset/c475b7c0-d36c-4c73-be33-a34030b6ca82/"
              >
              <div class="patient__name">Jan Iksiński</div>
              <i class="fas fa-lock"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WhiteFunctionalBlock from "../../components/ui/WhiteFunctionalBlock";
import MainBtn from "../../components/ui/MainBtn";

export default {
  name: "Offices",
  data: function() {
    return {
      officeSelected: false,
      cardSelected: 0
    };
  },
  components: {
    Block: WhiteFunctionalBlock,
    MainBtn
  }
};
</script>

<style lang="scss" scoped>
@import "../../main";

.row {
  margin-bottom: 1em;
  display: flex;
  width: 100%;
  justify-content: space-between;
  &:last-child {
    margin-bottom: 3em;
  }
}

.offices__list {
  width: calc(33% - 4em);
  display: block;
  position: relative;
  height: 100%;
}

.offices__btn {
  width: 100% !important;
  padding: 1rem 0 !important;
  vertical-align: middle;
  margin-top: 1rem;
  i {
    vertical-align: middle;
    margin-right: 0.75em;
  }
}

.office {
  font-weight: 600;
  display: flex;
  &:not(:first-child) {
    padding-top: 1em;
  }
  &:not(:last-child) {
    padding-bottom: 1em;
    border-bottom: 1px solid rgba(213, 213, 213, 0.6);
  }
}

.office__icon {
  margin-right: 1rem;
  padding: 0.5em;
  font-size: 1.5em;
  width: 1em;
  height: 1em;
  text-align: center;
  color: #6a6ee1;
  background: #f0f0ff;
  border-radius: 0.5em;
}

.office__content {
  height: 100%;
  margin: auto 0;
  margin-right: 1em;
  white-space: normal;
  width: calc(100% - 8em);
}

.office__title {
  font-weight: 700;
  color: #3e3e45;
  margin-bottom: 0.25em;
}

.office__info {
  color: #67676e;
}

.office__select {
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
    background: #f0f0ff;
    color: #6a6ee1;
    &:hover {
      background: #ececff;
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

.offices__actions {
  width: calc(67% - 1em);
}

.offices__info {
  @extend %text--center;
  font-weight: 700;
  font-size: 1.5em;
  color: #67676e;
  height: 100%;
  border-radius: 0.5em;
  box-shadow: 0 0 20px 0px rgba(213, 213, 213, 0.3);
  background: #f0f0ff;
}

.actions__content {
  height: 100%;
  display: block;
}

.actions__top {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  &__el {
    @extend %text--center;
    font-weight: 700;
    font-size: 1.25em;
    color: #67676e;
    padding: 1em 0.5em;
    width: 100%;
    border-radius: 0.5em;
    box-shadow: 0 0 20px 0px rgba(213, 213, 213, 0.3);
    background: #f0f0ff;
    transition: 0.2s ease-in-out;
    cursor: pointer;
    &:not(:last-child) {
      margin-right: 1em;
    }
    &.selected {
      background: #fafafa;
      color: #3e3e45;
    }
  }
}

.actions__patients {
  display: grid;
  grid-template-columns: 50% 50%;
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
  height: 3em;
  width: calc(100% - 2em);
  padding: 1em;
  border-radius: 0.5em;
  box-shadow: 0 0 20px 0px rgba(213, 213, 213, 0.3);
  background: #fafafc;
  .patient__name {
    font-weight: 700;
    color: #3e3e45;
  }
  img {
    height: 100%;
    width: auto;
    border-radius: 1em;
    display: block;
    margin-right: 1em;
  }
  i {
    margin-left: auto;
    padding: 0.5em;
    font-size: 1.5em;
    width: 1em;
    height: 1em;
    text-align: center;
    color: #6a6ee1;
    background: #dfdfea;
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
    background: #e4e4e6;
    filter: grayscale(100%);
    i:hover {
      &::before {
        content: "";
      }
    }
  }
}

@media only screen and (max-width: 960px) {
  .row {
    display: block;
  }
  .offices__list {
    width: calc(100% - 3rem);
    margin-bottom: 1rem;
  }
  .offices__info {
    padding: 4em 0;
  }
  .offices__actions {
    width: 100%;
  }
  .actions__patients {
    grid-template-columns: 100%;
  }
}
</style>