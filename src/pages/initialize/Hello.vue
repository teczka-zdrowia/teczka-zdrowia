<template>
  <div class="hello">
    <h1 class="hello__title">Dzień dobry!</h1>
    <p class="hello__desc">Witaj w <span>Teczce Zdrowia</span>! Znajdujesz się w panelu inicjalizacji. Możesz wykonać
      jedną z poniższych akcji lub/i przejść dalej w celu utworzenia pierwszego gabinetu. </p>
    <div class="hello__actions">
      <button
        class="hello__action hello__action--violet"
        v-on:click="addToHomeScreen"
      >
        <span
          aria-hidden="true"
          class="fas fa-home"
        />
        Dodaj do ekranu głównego
      </button>
      <NextStep/>
    </div>
  </div>
</template>

<script>
import NextStep from './NextStep'
import { mapActions } from 'vuex'

export default {
  name: 'Hello',
  components: {NextStep},
  methods: {
    ...mapActions({
      nextStep: 'initializeSteps/next'
    }),
    addToHomeScreen: function (e) {
      // TODO
    }
  }
}
</script>

<style lang="scss" scoped>
  .hello {
    &__title {
      color: #3e3e45;
      margin-top: 0;
    }

    &__desc {
      margin: 2rem 0;
      color: #67676e;
      font-weight: 600;
      font-size: 1.25rem;

      span {
        color: #6a6ee1;
      }
    }

    &__actions {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      grid-gap: 1rem;
    }

    &__action {
      padding: 1rem;
      border-radius: 0.5rem;
      font-weight: 600;
      cursor: pointer;
      transition: 0.2s ease-in-out;

      span {
        margin-right: 0.5rem;
      }

      &:hover {
        filter: brightness(95%);
      }

      &--violet {
        background: #6a6ee1;
        color: #fafafc;
      }
    }
  }
</style>
