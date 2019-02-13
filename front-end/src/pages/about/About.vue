<template>
  <div class="about">
    <div class="about__top">
      <BaseInfo class="about__base"/>
      <Block class="about__actions">
        <i class="fas fa-cog actions__settings"></i>
        <div class="actions__buttons">
          <div class="action">
            <i class="fas fa-unlock"></i>
            <div class="action__title">Zmień hasło</div>
          </div>
          <div class="action action--red">USUŃ KONTO</div>
        </div>
      </Block>
    </div>
    <History/>
  </div>
</template>
 
<script>
import WhiteFunctionalBlock from "../../components/ui/WhiteFunctionalBlock";
import BaseInfo from "./BaseInfo";
import History from "./History";
import VioletBlock from "../../components/ui/VioletBlock";
import RedBlock from "../../components/ui/RedBlock";

export default {
  name: "About",
  components: {
    BaseInfo: BaseInfo,
    History: History,
    VioletBlock: VioletBlock,
    RedBlock: RedBlock,
    Block: WhiteFunctionalBlock
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
  .actions__settings {
    @extend %text--center;
    background: #ececff;
    height: 100%;
    width: 33%;
    font-size: 1.5em;
    color: #3e3e45;
    cursor: pointer;
    border-radius: 0.5rem;
    margin-right: 1rem;
  }
  .block__content {
    display: flex;
    height: 100%;
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
    background: #ececff;
    display: flex;
    font-weight: 600;
    overflow: hidden;
    cursor: pointer;
    transition: 0.2s ease-in-out;
    i {
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
}

@media only screen and (max-width: 959px) {
  .about__top {
    display: block;
  }
  .about__actions {
    margin-left: 0;
    width: calc(100% - 3em);
    .block__content {
      height: 6em;
    }
  }
}
</style>
