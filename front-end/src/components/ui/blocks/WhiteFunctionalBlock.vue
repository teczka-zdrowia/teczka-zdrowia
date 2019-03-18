<template>
  <div class="block--functional--white">
    <div class="block__top" v-if="title != undefined">
      <div class="top__title">{{ title }}</div>
      <div class="top__options" v-if="info != undefined">
        <i class="fas fa-ellipsis-h"></i>
      </div>
      <div class="options__content" v-if="info != undefined" v-html="info"></div>
    </div>
    <div class="block__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "WhiteFunctionalBlock",
  props: ["title", "info"]
};
</script>

<style lang="scss" scoped>
@import "../../../main.scss";

.block--functional--white {
  padding: 2rem;
  border-radius: 0.5em;
  box-shadow: 0 0 20px 0px rgba(213, 213, 213, 0.3);
  background: #fafafc;
  .block__top {
    @extend %text--center;
    font-weight: 700;
    color: #3e3e45;
    font-size: 1.5em;
    margin-bottom: calc(2em / 1.5);
    justify-content: space-between;
    position: relative;
    .top__options {
      font-size: 1.5em;
      color: rgba(103, 103, 110, 0.75);
      cursor: pointer;
      transition: 0.2s ease-in-out;
      padding: 0 0.3em;
      margin-right: -0.3em;
      &:hover {
        background: rgb(238, 238, 238);
        border-radius: 0.5em;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
      }
    }
  }
  .options__content {
    visibility: hidden;
    opacity: 0;
    transition: visibility 0s, opacity 0.2s ease-in-out;
    padding: 0.75em;
    position: absolute;
    right: -0.6rem;
    top: 100%;
    box-shadow: 0 0 20px 0px rgba(213, 213, 213, 0.5);
    background: #ffffff;
    z-index: 100;
    border-radius: 0.5em;
    border-top-right-radius: 0;
    font-weight: 600;
    font-size: 0.75em;
    overflow: hidden;
    color: #3e3e45;
    span {
      font-weight: 700 !important;
    }
    &:hover {
      visibility: visible;
      opacity: 1;
      transition: visibility 0s, opacity 0.2s ease-in-out;
    }
  }
  .top__options:hover ~ .options__content {
    visibility: visible;
    opacity: 1;
    transition: visibility 0s, opacity 0.2s ease-in-out;
  }
}

@media only screen and (max-width: 960px) {
  .block--functional--white {
    padding: 1.5rem;
    width: calc(100% - 3rem);
  }
}
</style>