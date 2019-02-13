<template>
  <div class="offices">
    <div class="row">
      <Block class="offices__list" title="Twoje gabinety">
        <div class="office">
          <i class="fas fa-briefcase office__icon"></i>
          <div class="office__content">
            <div class="office__title">MedMax</div>
            <div class="office__info">Kwiatowa 45, Warszawa</div>
          </div>
          <i
            class="fas fa-angle-right office__select office__select--white"
            title="Wybierz gabinet"
            v-on:click="officeSelected = !officeSelected"
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
            v-on:click="officeSelected = !officeSelected"
          ></i>
        </div>
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WhiteFunctionalBlock from "../../components/ui/WhiteFunctionalBlock";

export default {
  name: "Offices",
  data: function() {
    return {
      officeSelected: false,
      cardSelected: 0
    };
  },
  components: {
    Block: WhiteFunctionalBlock
  }
};
</script>

<style lang="scss">
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

@media only screen and (max-width: 960px) {
  .row {
    display: block;
  }
  .offices__list {
    width: calc(100% - 4em);
    margin-bottom: 1em;
  }
  .offices__info {
    padding: 4em 0;
  }
  .offices__actions {
    width: 100%;
  }
}
</style>