<template>
  <div
    class="place-info"
    v-bind:class="{nopadding: noPadding}"
    v-on:click="moreInfo"
  >
    <span
      aria-hidden="true"
      class="fas fa-map-marker-alt"
      v-if="!hideIcon"
      v-bind:class="{violet: violetIcon}"
    />
    {{ data.name }}
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'MainPlaceInfo',
  props: {
    data: {
      type: Object
    },
    noPadding: {
      default: false,
      type: Boolean
    },
    violetIcon: {
      default: false,
      type: Boolean
    },
    hideIcon: {
      default: false,
      type: Boolean
    }
  },
  methods: {
    ...mapActions({
      showModal: 'modal/show'
    }),
    moreInfo: function () {
      this.showModal({
        componentName: 'PlaceInfo',
        data: {
          hideBorders: true,
          place: this.data
        }
      })
    }
  }
}
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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  &.nopadding {
    padding: 0;
  }
  span {
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
