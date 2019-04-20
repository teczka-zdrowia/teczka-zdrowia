<template>
  <div class="cplace">
    <CreatePlaceComponent ref="createPlaceComponent" />
    <div class="cplace__actions">
      <button
        class="cplace__action cplace__action--violet"
        v-on:click="cPlace"
      >
        Utwórz gabinet
      </button>
    </div>
  </div>
</template>

<script>
import CreatePlaceComponent from "../../components/ui/CreatePlaceComponent";
import { mapActions } from "vuex";

export default {
  name: "CreatePlace",
  components: {
    CreatePlaceComponent
  },
  methods: {
    ...mapActions({
      completeStep: "initializeSteps/complete"
    }),
    cPlace: function() {
      const created = this.$refs.createPlaceComponent.createPlace();
      if (created) {
        // TODO
        this.completeStep(1);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.cplace {
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
    margin-top: 1rem;
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
