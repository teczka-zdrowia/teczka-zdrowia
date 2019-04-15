<template>
  <div
    class="place-info"
    v-bind:class="{nopadding: noPadding}"
  >
    <i
      class="fas fa-map-marker-alt"
      v-bind:class="{violet: violetIcon}"
    />
    {{ name }}
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "MainPlaceInfo",
  props: {
    name: {
      type: String
    },
    placeID: {
      type: Number
    },
    noPadding: {
      default: false,
      type: Boolean
    },
    violetIcon: {
      default: false,
      type: Boolean
    }
  },
  methods: {
    ...mapActions({
      showModal: "modal/show"
    }),
    moreInfo: function() {
      /* Backend communication TODO */
      this.showModal({
        componentName: "PatientInfo",
        data: {
          hideBorders: true,
          id: 1,
          img:
            "https://www.mendeley.com/careers/getasset/c475b7c0-d36c-4c73-be33-a34030b6ca82/",
          name: "Konto",
          surname: "Testowe",
          email: "adrian@orlow.me",
          phone: "111 222 333",
          birthdate: "2002-12-23 00:11:32.000000"
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../main.scss";

.place-info {
  padding: 1rem;
  border-radius: 0.5rem;
  color: #3e3e45;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  font-weight: 600;
  &.nopadding {
    padding: 0;
  }
  i {
    margin-right: 0.75rem;
    &.violet {
      color: #6a6ee1;
    }
  }
  &:hover {
    background: #eeeef3;
  }
}
</style>