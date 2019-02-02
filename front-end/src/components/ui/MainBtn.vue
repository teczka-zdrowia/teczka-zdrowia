<template>
  <button class="button">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "MainBtn"
};
</script>

<style lang="scss" scoped>
$lightgrey: rgba(213, 213, 213, 0.3);
$lightviolet: #9394eb;
$darkviolet: #6a6ee1;
$primrary-light: #fafafa;

%text--center {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: center;
  justify-content: center;
  -ms-flex-align: center;
  align-items: center;
}

.button {
  @extend %text--center;
  cursor: pointer;
  border-radius: 0.25em;
  padding: 0.5em 1.5em;
  font-weight: 600;
  color: $primrary-light;
  background: $darkviolet;
  background: linear-gradient(to right, $lightviolet, $darkviolet);
  filter: drop-shadow(0 0 10px $lightgrey);
  height: 100%;
  width: auto;
  background-size: 200% auto;
  transition: 0.2s ease-in-out;
  &:hover {
    background-position: right center;
  }
}
</style>
