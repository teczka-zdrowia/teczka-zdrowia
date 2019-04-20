<template>
  <div class="more">
    <div
      class="more__content"
      v-if="!isLoading"
    >
      Pokaż więcej
      <span
        aria-hidden="true"
        class="fas fa-arrow-down"
      />
    </div>
    <div
      class="more__content"
      v-if="isLoading"
    >
      Ładowanie
      <MainLoading />
    </div>
  </div>
</template>

<script>
import MainLoading from "./MainLoading";

export default {
  name: "MainShowMore",
  components: {
    MainLoading
  },
  props: {
    isLoading: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../main.scss";

.more {
  margin-top: 0.5em;
  height: 3em;
  display: flex;
  justify-content: center;
}

.more__content {
  @extend %text--center;
  border: 0;
  transition: 0.2s ease-in-out;
  border-radius: 0.5em;
  border-radius: 0.25em;
  padding: 0.5em 1.5em;
  background: none;
  color: #1a1b37;
  font-weight: 600;
  background: #fafafc;
  cursor: pointer;
  &:hover {
    background: #ffffff;
  }
  svg {
    margin-left: 0.75em;
    height: 1.25rem;
    width: 1.25rem;
  }
  span {
    margin-left: 0.75em;
  }
}
</style>