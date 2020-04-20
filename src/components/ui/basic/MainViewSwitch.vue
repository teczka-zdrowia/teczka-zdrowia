<template>
  <label class="switch">
    <input
      type="checkbox"
      class="switch__checkbox"
      :checked="viewAsPatient"
      v-on:input="toggleViewAs"
    >
    <span
      class="fas fa-user switch__icon"
      v-bind:class="[!isMobile ? 'switch__icon--grey' : [isMobile && viewAsPatient ? 'switch__icon--violet' : 'switch__icon--grey']]"
    />
    <div
      class="switch__text"
      v-if="!small"
      v-bind:class="[viewAsPatient ? 'switch__text--grey' : 'switch__text--violet']"
    ></div>
    <span
      class="fas fa-user-md switch__icon"
      v-bind:class="[!isMobile ? 'switch__icon--violet' : [isMobile && viewAsPatient ? 'switch__icon--grey' : 'switch__icon--violet']]"
    />
  </label>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'MainViewSwitch',
  props: {
    small: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    ...mapActions({
      setViewAs: 'settings/setViewAs'
    }),
    toggleViewAs: function () {
      const humanName = this.viewAsPatient ? 'doctor' : 'patient'

      this.setViewAs(humanName)

      if (humanName === 'patient') {
        this.$router.push({name: 'Dashboard'})
      } else {
        this.$router.push({name: 'Panel'})
      }
    }
  },
  computed: {
    ...mapGetters({
      viewAs: 'settings/viewAs',
      isMobile: 'window/isMobile'
    }),
    viewAsPatient: function () {
      return this.viewAs === 'patient'
    }
  }
}
</script>

<style lang="scss" scoped>
  .switch {
    display: flex;
    border-radius: 0.5rem;
    overflow: hidden;
    cursor: pointer;

    &__checkbox {
      position: relative;
      width: 0;
      height: 0;
      padding: 0;
      margin: 0;
      opacity: 0;
      cursor: pointer;
      z-index: 3;
    }

    &__icon {
      padding: 5%;
      font-size: 1.25rem;
      width: 2rem;
    }

    &__text {
      font-weight: 600;
      width: 100%;
      padding: 0 5%;
      transition: 0.2s ease-in-out;

      &--grey::after {
        content: "Tryb pacjenta";
      }

      &--violet::after {
        content: "Tryb specjalisty";
      }
    }

    &__icon,
    &__text {
      display: flex;
      justify-content: center;
      align-items: center;

      &--grey {
        color: #67676e;
        background: #eeeef3;
      }

      &--violet {
        color: #6a6ee1;
        background: #e7e7fc;
      }
    }
  }
</style>
