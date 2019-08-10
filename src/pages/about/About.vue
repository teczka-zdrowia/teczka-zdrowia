<template>
  <div class="about">
    <div class="about__top">
      <MainBaseInfo
        class="about__base"
        :canEdit="true"
      />
      <Block class="about__actions">
        <span
          aria-hidden="true"
          class="fas fa-cog actions__settings"
        />
        <div class="actions__buttons">
          <div
            class="action"
            v-on:click="changePassword"
          >
            <span
              aria-hidden="true"
              class="fas fa-unlock"
            />
            <div class="action__title">Zmień hasło</div>
          </div>
          <div
            class="action action--red"
            v-on:click="deleteAccount"
          >USUŃ KONTO</div>
        </div>
      </Block>
    </div>
  </div>
</template>

<script>
import WhiteFunctionalBlock from "../../components/ui/blocks/WhiteFunctionalBlock";
import MainBaseInfo from "../../components/ui/basic/MainBaseInfo";
import VioletBlock from "../../components/ui/blocks/VioletBlock";
import RedBlock from "../../components/ui/blocks/RedBlock";

import { mapActions } from "vuex";

export default {
  name: "About",
  components: {
    Block: WhiteFunctionalBlock,
    MainBaseInfo,
    VioletBlock,
    RedBlock
  },
  methods: {
    ...mapActions({
      showModal: "modal/show"
    }),
    deleteAccount: function() {
      this.showModal({
        componentName: "DeleteAccount"
      });
    },
    changePassword: function() {
      this.showModal({
        componentName: "ChangePassword"
      });
    }
  }
};
</script>

<style lang="scss">
@import "../../main";

.about__top {
  display: flex;
  width: 100%;
}

.about__actions {
  margin-left: 2em;
  width: calc(37% - 2em);
  height: auto;
  .block__content {
    height: 100%;
    display: flex;
    flex-direction: column;
    & > span {
      height: calc(33% + 1rem);
      margin-bottom: 1rem;
      width: 100%;
      &::after {
        content: "Ustawienia";
        margin-left: 0.75em;
        font-family: Montserrat;
        font-weight: 600;
        font-size: 0.75em;
      }
    }
  }
}

.actions__settings {
  @extend %text--center;
  background: #eeeef3;
  height: 100%;
  width: 33%;
  font-size: 1.5em;
  color: #3e3e45;
  cursor: pointer;
  border-radius: 0.5rem;
  margin-right: 1rem;
  &::before {
    transition: transform 0.2s ease-in-out;
  }
  &:hover {
    &::before {
      transform: rotate(90deg);
    }
  }
}

.actions__buttons {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}
.action {
  width: 100%;
  height: 100%;
  border-radius: 0.5rem;
  background: #eeeef3;
  display: flex;
  font-weight: 600;
  overflow: hidden;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  span {
    @extend %text--center;
    background: #9394eb;
    color: #fafafc;
    padding: 0 1rem;
  }
  .action__title {
    @extend %text--center;
    color: #6a6ee1;
    margin: auto;
  }
  &:not(:last-child) {
    margin-bottom: 1rem;
  }
  &.action--red {
    @extend %text--center;
    background: transparent;
    color: #d91e18;
    font-weight: 700;
    border: 3px solid #d91e18;
    width: calc(100% - 6px);
    height: calc(100% - 6px);
    transition: 0.2s ease-in-out;
    &:hover {
      background: #d91e18;
      color: #fafafc;
    }
  }
  &:hover {
    background: #9394eb;
    i:before {
      content: "\f023";
    }
    .action__title {
      color: #fafafc;
    }
  }
}

@media only screen and (max-width: 959px) {
  .about__top {
    display: block;
  }
  .about__actions {
    margin-left: 0;
    width: calc(100% - 4rem);
    .block__content {
      height: 12em;
    }
  }
}
</style>
