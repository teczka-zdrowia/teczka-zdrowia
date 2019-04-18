<template>
  <div class="modal--pi">
    <div class="modal--pi__content">
      <div class="modal--pi__top">
        <div class="modal--pi__top__info">
          <div class="modal--pi__title">
            {{ data.name }}
          </div>
          <div class="modal--pi__address">
            {{ data.address }}, {{ data.city }}
          </div>
        </div>
        <div class="modal--pi__map">
          <l-map
            ref="map"
            :zoom.sync="zoom"
            :options="mapOptions"
          >
            <l-tile-layer :url="url" />
            <l-marker
              v-if="marker"
              :lat-lng="marker"
              :icon="icon"
            />
          </l-map>
        </div>
      </div>
      <button
        class="modal__btn fullwidth modal__btn--grey"
        @click="hideModal"
      >Zamknij</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";
import { L } from "vue2-leaflet";
import "leaflet/dist/leaflet.css";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
delete L.Icon.Default.prototype._getIconUrl;

const provider = new OpenStreetMapProvider();

import "../modal.scss";

export default {
  name: "PlaceInfo",
  data: function() {
    return {
      zoom: 6,
      map: null,
      mapOptions: {
        zoomControl: false,
        attributionControl: false,
        zoomSnap: true
      },
      url:
        "https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png",
      icon: L.icon({
        iconUrl: "static/leaflet/place-icon.png",
        iconSize: [50, 50],
        iconAnchor: [25, 25]
      }),
      marker: null
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initMap();
      provider
        .search({ query: `${this.data.address}, ${this.data.city}` })
        .then(result => {
          this.map = this.$refs.map.mapObject.setView(
            [result[0].y, result[0].x],
            16
          );
          this.marker = L.latLng(result[0].y, result[0].x);
        });
    });
  },
  components: {
    LMap,
    LTileLayer,
    LMarker
  },
  computed: {
    ...mapGetters({
      data: "modal/data"
    })
  },
  methods: {
    ...mapActions({
      hideModal: "modal/hide"
    }),
    initMap: function() {
      this.map = this.$refs.map.mapObject;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../main";

.modal--pi {
  &__content {
    border-radius: 0.5em;
    box-shadow: 0 0 20px 0px rgba(213, 213, 213, 0.3);
    background: #fafafc;
    overflow: hidden;
  }
  &__top {
    display: flex;
    flex-direction: column;
    &__info {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
  }
  &__title {
    padding: 1rem;
    width: calc(100% - 2rem);
    color: #3e3e45;
    font-weight: 700;
    text-align: center;
    background: #ececec;
    font-size: 1.5rem;
  }
  &__address {
    @extend %text--center;
    padding: 1rem;
    width: calc(100% - 2rem);
    color: #67676e;
    font-weight: 600;
    background: #f5f5f5;
    text-align: center;
    height: 100%;
  }
  &__map {
    width: 100%;
    height: 10rem;
  }
  &__info {
    padding: 1.5rem;
    &__title {
      font-size: 1.25rem;
      font-weight: 600;
      padding-bottom: 0.5rem;
    }
    &__el {
      padding: 0.5rem 0;
      display: flex;
      i {
        padding: 1rem;
        border-radius: 0.5rem;
        background: #ececec;
      }
      a {
        margin-left: 1rem;
        font-weight: 600;
        padding: 1rem;
        border-radius: 0.5rem;
        background: #f5f5f5;
        width: 100%;
      }
    }
  }
}
</style>
