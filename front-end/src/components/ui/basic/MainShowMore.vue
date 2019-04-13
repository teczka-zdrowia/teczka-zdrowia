<template>
  <div class="more">
    <div
      class="more__content"
      v-if="!isLoading"
    >
      Pokaż więcej
      <i class="fas fa-arrow-down" />
    </div>
    <div
      class="more__content"
      v-if="isLoading"
    >
      Ładowanie
      <svg
        width="200px"
        height="200px"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
        class="lds-rolling"
        style="background: none;"
      >
        <circle
          cx="50"
          cy="50"
          fill="none"
          stroke="#6a6ee1"
          stroke-width="10"
          r="35"
          stroke-dasharray="164.93361431346415 56.97787143782138"
          transform="rotate(89.9388 50 50)"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            calcMode="linear"
            values="0 50 50;360 50 50"
            keyTimes="0;1"
            dur="1s"
            begin="0s"
            repeatCount="indefinite"
          ></animateTransform>
        </circle>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: "MainShowMore",
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
  i {
    margin-left: 0.75em;
  }
}
</style>