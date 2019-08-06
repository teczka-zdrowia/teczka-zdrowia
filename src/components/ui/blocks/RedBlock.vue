<template>
  <div class="block--red">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "RedBlock"
};
</script>

<style lang="scss" scoped>
@import "../../../main.scss";

.block--red {
  color: $primrary-light;
  border-radius: 0.5em;
  padding: 2em;
  width: calc(100% - 4em);
  height: calc(100% - 4em);
  background: $darkred;
  background: linear-gradient(to right, $lightred, $darkred);
  filter: drop-shadow(0 0 10px $lightred);
}
</style>