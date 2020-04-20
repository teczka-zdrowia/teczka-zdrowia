<template>
  <div class="block--grey">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
  @import "../../../main.scss";

  .block--grey {
    @extend %text--center;
    font-weight: 700;
    font-size: 1.5em;
    color: #67676e;
    border-radius: 0.5em;
    -webkit-box-shadow: 0 0 20px 0px rgba(213, 213, 213, 0.3);
    box-shadow: 0 0 20px 0px rgba(213, 213, 213, 0.3);
    background: #eeeef3;
  }
</style>
