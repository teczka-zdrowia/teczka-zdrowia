<template>
  <div
    class="modal"
    v-bind:class="{ visible: visible }"
    @keydown.esc="hideModal"
  >
    <transition
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <div
        class="modal__overlay"
        v-if="visible"
        @click.self="hideModal"
      />
    </transition>
    <transition
      enter-active-class="animated fadeInUp"
      leave-active-class="animated fadeOutDown"
    >
      <div
        class="modal__content"
        v-if="visible"
      >
        <div
          class="modal__innerContent"
          v-bind:class="{noborders: hideBorders}"
        >
          <component :is="component"></component>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";
import MainLoading from "../ui/basic/MainLoading";
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
      data: "modal/data",
      visible: "modal/visible",
      modalComponent: "modal/component"
    }),
    hideBorders: function() {
      return this.data != null
        ? this.data.hideBorders != null
          ? this.data.hideBorders
          : false
        : false;
    }
  },
  methods: {
    ...mapActions({
      hideModal: "modal/hide"
    })
  },
  watch: {
    modalComponent(componentName) {
      if (!componentName) return;

      Vue.component(componentName, () => ({
        component: import(`./modals/${componentName}`),
        loading: MainLoading
      }));

      this.component = componentName;
    }
  }
};
</script>