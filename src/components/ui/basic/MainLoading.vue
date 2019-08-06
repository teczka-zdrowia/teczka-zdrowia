<template>
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
      :stroke="color"
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
</template>

<script>
export default {
  name: "MainLoading",
  props: {
    color: {
      type: String,
      default: "#6a6ee1"
    }
  }
};
</script>
