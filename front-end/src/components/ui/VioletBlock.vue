<template>
  <div class="block--violet">
      <slot></slot>
  </div>
</template>

<script>
export default {
  name: "VioletBlock"
};
</script>

<style lang="scss" scoped>
$lightgrey: rgba(213, 213, 213, 0.3);
$lightviolet: #9394eb;
$darkviolet: #6a6ee1;
$primrary-light: #fafafa;
$font-awesome: "Font Awesome 5 Free";

.block--violet {
    color: $primrary-light;
    border-radius: .5em;
    padding: 2em;
    width: calc(100% - 4em);
    height: calc(100% - 4em);
    background: $darkviolet;
    background: linear-gradient(to right, $lightviolet, $darkviolet);
    filter: drop-shadow(0 0 10px $lightgrey);
}

</style>