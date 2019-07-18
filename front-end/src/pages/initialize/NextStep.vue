<template>
  <button
    class="btn--nextstep"
    v-if="isCompleted"
    v-on:click="onClick"
  >
    Następny krok
  </button>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "NextStep",
  methods: {
    ...mapActions({
      nextStep: "initializeSteps/next"
    }),
    onClick: function() {
      if (this.isLastStep) {
        this.$router.push("/Dashboard");
      } else {
        this.nextStep();
      }
    }
  },
  computed: {
    ...mapGetters({
      isCompleted: "initializeSteps/isSelectedCompleted",
      isLastStep: "initializeSteps/isLastStep"
    })
  }
};
</script>

<style lang="scss" scoped>
.btn--nextstep {
  padding: 1rem;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  &:hover {
    filter: brightness(95%);
  }
}
</style>
