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
$lightgrey: rgba(213, 213, 213, 0.3);
$lightred: #f8c5c2;
$darkred: #fea2a3;
$primrary-light: #fafafa;
$font-awesome: "Font Awesome 5 Free";

.block--red {
    color: $primrary-light;
    border-radius: .5em;
    padding: 2em;
    width: calc(100% - 4em);
    height: calc(100% - 4em);
    background: $darkred;
    background: linear-gradient(to right,$lightred, $darkred);
    filter: drop-shadow(0 0 10px $lightred);
}

</style>