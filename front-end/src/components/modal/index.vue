<template>
  <div
    class="modal"
    v-bind:class="{ visible: visible }"
    @keydown.esc="hideModal"
  >
    <div
      class="modal__overlay"
      v-if="visible"
      @click.self="hideModal"
    ></div>
    <div
      class="modal__content"
      v-if="visible"
    >
      <div class="modal__innerContent">
        <component :is="component"></component>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";
import "./modal.scss";

export default {
  name: "Modal",
  data: function() {
    return {
      component: null
    };
  },
  created() {
    const escapeHandler = e => {
      if (e.key === "Escape" && this.visible) {
        this.hideModal();
      }
    };

    document.addEventListener("keydown", escapeHandler);
    this.$once("hook:destroyed", () => {
      document.removeEventListener("keydown", escapeHandler);
    });
  },
  computed: {
    ...mapGetters({
      visible: "modal/visible",
      modalComponent: "modal/component"
    })
  },
  methods: {
    ...mapActions({
      hideModal: "modal/hide"
    })
  },
  watch: {
    modalComponent(componentName) {
      if (!componentName) return;

      Vue.component(componentName, () => import(`./${componentName}`));

      this.component = componentName;
    }
  }
};
</script>