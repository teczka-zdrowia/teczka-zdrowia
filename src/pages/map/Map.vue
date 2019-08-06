<template>
  <div class="map">
    <div
      class="map__content"
      v-bind:class="{ 'block--blur' : showSearch}"
    >
      <l-map
        ref="map"
        :zoom.sync="zoom"
        :options="mapOptions"
        :center="center"
      >
        <l-tile-layer :url="url"></l-tile-layer>
        <l-control-zoom :position="'bottomleft'" />
        <l-marker
          v-for="marker in markers"
          :key="marker.id"
          :icon="marker.icon"
          :lat-lng="marker.latLng"
          v-on:click="marker.info()"
        >
        </l-marker>
      </l-map>
    </div>
    <MapNavMobile v-if="isMobile" />
    <MapNav v-else />
  </div>
</template>

<script>
import MapNav from "./MapNav";
import MapNavMobile from "./MapNavMobile";

import { mapActions } from "vuex";

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
      center: [52.0715018, 19.5211664],
      mapOptions: {
        zoomControl: false,
        attributionControl: false,
        zoomSnap: true
      },
      url:
        "https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png",
      icons: {
        place: L.icon({
          iconUrl: "static/leaflet/place-icon.png",
          iconSize: [50, 50],
          iconAnchor: [25, 25]
        }),
        doctor: L.icon({
          iconUrl: "static/leaflet/doctor-icon.png",
          iconSize: [50, 50],
          iconAnchor: [25, 25]
        })
      },
      markers: []
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initMap();
      this.addMarkers();
      navigator.geolocation.getCurrentPosition(pos => {
        this.map = this.$refs.map.mapObject.setView(
          [pos.coords.latitude, pos.coords.longitude],
          12
        );
      });
    });
  },
  methods: {
    ...mapActions({
      showModal: "modal/show"
    }),
    initMap: function() {
      this.map = this.$refs.map.mapObject;
    },
    addMarkers: function() {
      /* TODO backend communication */
      this.markers = [
        {
          id: 1,
          icon: this.icons.place,
          latLng: [52.2486084, 20.9698996],
          info: () => this.showPlaceModal(1)
        },
        {
          id: 2,
          icon: this.icons.doctor,
          latLng: [53.2486084, 21.9698996],
          info: () => this.showDoctorModal(1)
        },
        {
          id: 3,
          icon: this.icons.doctor,
          latLng: [50.6486084, 21.9698996],
          info: () => this.showDoctorModal(1)
        }
      ];
    },
    showDoctorModal: function(id) {
      /* Backend communication TODO */
      this.showModal({
        componentName: "DoctorInfo",
        data: {
          hideBorders: true,
          doctor: {
            id: 1,
            img:
              "https://www.mendeley.com/careers/getasset/c475b7c0-d36c-4c73-be33-a34030b6ca82/",
            name: "Konto Testowe",
            spec: "fizjoterapeuta",
            email: "adrian@orlow.me",
            phone: "111 222 333",
            birthdate: "2002-12-23 00:11:32.000000"
          }
        }
      });
    },
    showPlaceModal: function(id) {
      /* Backend communication TODO */
      this.showModal({
        componentName: "PlaceInfo",
        data: {
          hideBorders: true,
          id: 1,
          name: "MedMax",
          address: "Kwiatowa 45",
          city: "Jaworzno",
          isActive: true,
          isDeleted: false,
          isAdmin: false
        }
      });
    }
  },
  computed: {
    isMobile: function() {
      return this.$store.getters["window/isMobile"];
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

/deep/ .leaflet-tile-pane {
  filter: saturate(0);
}
</style>
