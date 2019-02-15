<template>
  <div class="map">
    <div class="map__content" v-bind:class="{ 'block--blur' : showSearch}">
      <l-map ref="map" :zoom.sync="zoom" :options="mapOptions" :center="[52.0715018,19.5211664]">
        <l-tile-layer :url="url"></l-tile-layer>
        <l-control-zoom :position="'bottomleft'"/>
      </l-map>
    </div>
    <div class="map__actions">
      <div
        class="actions__bar"
        v-on:click="showSearch = !showSearch"
        v-bind:class="{ showed : showSearch}"
      >
        Czego szukasz?
        <i class="fas" v-bind:class="[showSearch ? 'fa-angle-up' : 'fa-angle-down']"></i>
      </div>
      <div class="actions__content" v-bind:class="{ showed : showSearch}">
        <div class="actions__selects">
          <MainSelect>
            <option disabled selected>Typ</option>
            <option>Lekarz</option>
            <option>Gabinet</option>
          </MainSelect>
          <MainSelect>
            <option disabled selected>Specjalizacja</option>
            <option>Fizoterapeuta</option>
            <option>Stomatolog</option>
            <option>Psycholog</option>
          </MainSelect>
          <MainSelect>
            <option disabled selected>Miasto</option>
            <option>Warszawa</option>
            <option>Gdańsk</option>
            <option>Katowice</option>
          </MainSelect>
        </div>
        <MainBtn class="actions__btn" v-on:click.native="showSearch = false">Szukaj</MainBtn>
      </div>
    </div>
  </div>
</template>

<script>
import MainSelect from "../../components/ui/MainSelect";
import MainBtn from "../../components/ui/MainBtn";
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
  name: "Dashboard",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LControlAttribution,
    LControlZoom,
    MainSelect,
    MainBtn
  },
  data: function() {
    return {
      showSearch: false,
      zoom: 6,
      map: null,
      mapOptions: {
        zoomControl: false,
        attributionControl: false,
        zoomSnap: true
      },
      url:
        "https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png",
      query: {
        type: "",
        spec: "",
        city: ""
      }
    };
  },
  methods: {
    initMap: function() {
      this.map = this.$refs.map.mapObject;
    }
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
  }
};
</script>

<style lang="scss" scoped>
@import "../../main";

.map {
  position: relative;
  width: 100%;
  height: 100vh;
  z-index: 10;
}

.map__content {
  height: 100%;
  width: 100%;
}

.map__actions {
  position: absolute;
  padding: 0.5rem;
  padding-top: 5.5rem;
  width: calc(100% - 1rem);
  left: 0;
  top: 0;
  height: 4rem;
  z-index: 1000;
}

.actions__bar {
  @extend %text--center;
  width: 100%;
  border-radius: 0.5rem;
  box-shadow: 0 0 20px 0px rgba(213, 213, 213, 0.3);
  height: 4rem;
  background: #efefef;
  font-weight: 600;
  color: #3e3e45;
  font-size: 1.2em;
  text-align: center;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  i {
    color: #3e3e45;
    margin-left: 0.75em;
  }
  &.showed {
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
    transition: 0.2s ease-in-out;
  }
}

.actions__content {
  visibility: hidden;
  opacity: 0;
  margin-left: auto;
  padding: 2em;
  width: calc(100% - 4em);
  height: auto;
  background: #fafafc;
  box-shadow: 0 20px 20px 0px rgba(213, 213, 213, 0.1);
  border-bottom-right-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
  transition: all 0.2s ease-in-out;
  &.showed {
    visibility: visible;
    opacity: 1;
    transition: all 0.2s ease-in-out;
  }
}

.actions__selects {
  select {
    width: 100%;
    margin-bottom: 1em;
  }
}

.actions__btn {
  width: 100% !important;
  height: auto !important;
  padding-top: 1em !important;
  padding-bottom: 1em !important;
}

@media only screen and (min-width: 960px) {
  .map {
    display: none;
  }
}
</style>
