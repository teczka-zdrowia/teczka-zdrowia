<template>
  <button class="button">
    <span
      class="button__loading"
      v-if="loading"
    >
      Ładowanie
      <MainLoading :color="color" />
    </span>
    <span v-if="!loading">
      <slot></slot>
    </span>
  </button>
</template>

<script>
import MainLoading from "./MainLoading";

export default {
  name: "MainBtn",
  components: {
    MainLoading
  },
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      defualt: "#fafafa"
    }
  }
};
</script>

<style lang="scss">
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
  &__loading {
    @extend %text--center;
    svg {
      margin-left: 0.75em;
      height: 1.25rem;
      width: 1.25rem;
    }
  }
}
</style>
