<template>
  <div class="map">
    <div class="map__content" v-bind:class="{ 'block--blur' : showSearch}">
      <l-map ref="map" :zoom.sync="zoom" :options="mapOptions" :center="[52.0715018,19.5211664]">
        <l-tile-layer :url="url"></l-tile-layer>
        <l-control-zoom :position="'bottomleft'"/>
      </l-map>
    </div>
    <MapNavMobile v-if="isMobile"/>
    <MapNav v-else/>
  </div>
</template>

<script>
import MapNav from "./MapNav";
import MapNavMobile from "./MapNavMobile";

import {
  LMap,
  LTileLayer,
  LMarker,
  LControlAttribution,
  LControlZoom
} from "vue2-leaflet";
import { L } from "vue2-leaflet";
import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

var parser = require("xml-js");

export default {
  name: "Map",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LControlAttribution,
    LControlZoom,
    MapNav,
    MapNavMobile
  },
  data: function() {
    return {
      zoom: 6,
      map: null,
      showSearch: false,
      mapOptions: {
        zoomControl: false,
        attributionControl: false,
        zoomSnap: true
      },
      url:
        "https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initMap();
      navigator.geolocation.getCurrentPosition(pos => {
        this.map = this.$refs.map.mapObject.setView(
          [pos.coords.latitude, pos.coords.longitude],
          12
        );
      });
    });
  },
  methods: {
    initMap: function() {
      this.map = this.$refs.map.mapObject;
    }
  },
  computed: {
    isMobile: function() {
      return this.$store.getters.window.width < 960;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../main";

.map {
  width: 100%;
  z-index: 10;
  display: flex;
}

.map__content {
  height: 100%;
  width: 100%;
}
</style>
