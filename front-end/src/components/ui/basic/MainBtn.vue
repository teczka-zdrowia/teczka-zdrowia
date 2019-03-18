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
@import "../../../main.scss";

.button {
  @extend %text--center;
  cursor: pointer;
  border-radius: 0.5rem;
  padding: 0.5rem 1.5rem;
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
  &:disabled {
    background: #afb0c7;
    transition: 0.2s ease-in-out;
  }
}
</style>
