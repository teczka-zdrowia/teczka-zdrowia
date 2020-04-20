<template>
  <div class="block--violet">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'VioletBlock'
}
</script>

<style lang="scss" scoped>
  @import "../../../main.scss";

  .block--violet {
    color: $primrary-light;
    border-radius: 0.5em;
    padding: 2em;
    width: calc(100% - 4em);
    height: calc(100% - 4em);
    background: $darkviolet;
    background: linear-gradient(to right, $lightviolet, $darkviolet);
    filter: drop-shadow(0 0 10px $lightgrey);
  }
</style>
