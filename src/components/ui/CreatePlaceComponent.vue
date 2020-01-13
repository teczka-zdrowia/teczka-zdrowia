<template>
  <div class="cplace">
    <form class="cplace__form">
      <MainInput class="many">
        Nazwa
        <input
          type="text"
          name="name"
          minlength="1"
          v-model.lazy="data.name"
          placeholder="MedMax"
          required
        >
      </MainInput>
      <div class="input--double-container">
        <MainInput class="many double">
          Adres
          <input
            type="text"
            name="address"
            minlength="1"
            v-model.lazy="data.address"
            placeholder="Polna 6"
            required
          >
        </MainInput>
        <MainInput class="many double">
          Miejscowość
          <input
            type="text"
            name="city"
            minlength="1"
            v-model.lazy="data.city"
            placeholder="Warszawa"
            required
          >
        </MainInput>
      </div>
    </form>
    <div class="cplace__map">
      <div class="cplace__map__title">
        Miejsce na mapie
      </div>
      <div class="cplace__map__content">
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
  </div>
</template>

<script>
import MainInput from "../ui/basic/MainInput";
import { LMap, LTileLayer, LMarker, L } from "vue2-leaflet";
import handleErrors from "../../utils/handleErrors";

import "leaflet/dist/leaflet.css";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import { mapActions } from "vuex";
delete L.Icon.Default.prototype._getIconUrl;

const provider = new OpenStreetMapProvider();

export default {
  name: "CreatePlaceComponent",
  data: function() {
    return {
      zoom: 0,
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
      marker: null,
      data: {
        name: "",
        address: "",
        city: ""
      }
    };
  },
  mounted: function() {
    this.$nextTick(this.initMap());
  },
  methods: {
    ...mapActions({
      createUserPlace: "userRoles/createPlace"
    }),
    initMap: function() {
      this.map = this.$refs.map.mapObject;
    },
    getMarkerPos: function(payload) {
      provider
        .search({ query: `${payload.address}, ${payload.city}` })
        .then(result => {
          this.map = this.$refs.map.mapObject.setView(
            [result[0].y, result[0].x],
            16
          );
          this.marker = L.latLng(result[0].y, result[0].x);
        });
    },
    createPlace: function() {
      this.$emit("loading", true);
      this.createUserPlace(this.data)
        .then(() => {
          this.$emit("finished");
          this.$toasted.success("Pomyślnie dodano gabinet");
        })
        .catch(error => handleErrors(error));
    }
  },
  watch: {
    data: {
      handler: function(val) {
        this.getMarkerPos(val);
      },
      deep: true
    }
  },
  components: {
    MainInput,
    LMap,
    LTileLayer,
    LMarker
  }
};
</script>

<style lang="scss" scoped>
.cplace {
  &__form {
    border: 1px solid rgba(145, 145, 156, 0.3);
    width: calc(100% - 2px);
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
    label {
      background: #f5f5f5 !important;
    }
  }

  &__map {
    width: calc(100% - 2px);
    border: 1px solid rgba(145, 145, 156, 0.3);
    border-top: 0;
    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
    &__title {
      padding: 1rem;
      background: #f5f5f5;
      font-weight: 600;
      text-align: center;
      border-bottom: 1px solid rgba(145, 145, 156, 0.3);
    }
    &__content {
      height: 10rem;
    }
  }
}
</style>
