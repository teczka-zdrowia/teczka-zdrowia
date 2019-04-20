<template>
  <div class="stepper">
    <div class="stepper__content">
      <div class="stepper__top">
        <div
          class="stepper__top__el"
          v-for="step in steps"
          :key="step.id"
          :class="{ selected: step.id === selectedStep }"
        >
          {{ step.name }}
        </div>
      </div>
      <div class="stepper__innerContent">
        <component :is="selectedStepComponent" />
      </div>
    </div>
  </div>
</template>

<script>
import Hello from "./Hello";

export default {
  name: "Initialize",
  data: function() {
    return {
      selectedStep: 0,
      steps: [
        {
          id: 0,
          name: "Powitanie",
          completed: false,
          component: Hello
        },
        {
          id: 1,
          name: "Utwórz gabinet",
          completed: false,
          component: Hello
        }
      ]
    };
  },
  computed: {
    selectedStepComponent: function() {
      return this.steps[this.selectedStep].component;
    }
  },
  components: {
    Hello
  }
};
</script>

<style lang="scss" scoped>
.stepper {
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  &__content {
    z-index: 10000;
    border-radius: 0.5em;
    box-shadow: 0 0 20px 0px rgba(213, 213, 213, 0.3);
    background: #fafafc;
    min-width: 20rem;
    max-width: 50rem;
    color: #3e3e45;
    overflow: hidden;
    @media only screen and (max-width: 50rem) {
      border-radius: 0;
      height: 100%;
    }
  }

  &__top {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    &__el {
      text-align: center;
      padding: 1.5rem 1rem;
      font-size: 1.25rem;
      font-weight: 600;
      width: 100%;
      transition: 0.2s ease-in-out;
      cursor: pointer;
      &:not(:last-child) {
        border-right: 1px solid rgba(0, 0, 0, 0.1);
      }
      &.selected {
        background: #f5f5f5;
        color: #6a6ee1;
      }
    }
  }

  &__innerContent {
    padding: 1.5rem;
  }
}
</style>
