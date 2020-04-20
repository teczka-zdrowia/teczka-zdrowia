<template>
  <div class="map">
    <div class="map__content">
      <l-map
        ref="map"
        :zoom.sync="zoom"
        :options="mapOptions"
        v-on:update:center="getCityFromMap($event)"
      >
        <l-tile-layer :url="url"></l-tile-layer>

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
    <MainBtn
      class="map__position"
      v-bind:class="{ active: isCurrentPosition }"
      v-on:click.native="setCurrentPosition"
    >
      <span
        aria-hidden="true"
        class="fas fa-crosshairs"
      />
    </MainBtn>
    <div class="map__nav">
      <div
        class="map__nav--loading"
        v-if="city.searching"
      >
        Szukanie miasta
        <MainLoading/>
      </div>
      <MainBtn
        class="map__nav--search"
        :loading="city.loadingPlaces"
        :disaabled="city.loadingPlaces"
        color="#fafafa"
        v-on:click.native="getPlaces"
        v-if="!city.searching"
      >
        Szukaj w:&nbsp;<span>{{ city.name }}</span>
      </MainBtn>
    </div>
  </div>
</template>

<script>
import MainLoading from '../../components/ui/basic/MainLoading'
import MainBtn from '../../components/ui/basic/MainBtn'
import { apolloClient } from '@/apollo'
import { PLACES_BY_CITY_QUERY } from '@/graphql/queries/_index'
import { mapActions } from 'vuex'

import {
  LMap,
  LTileLayer,
  LMarker,
  LControlAttribution,
  LControlZoom
  , L
} from 'vue2-leaflet'

import 'leaflet/dist/leaflet.css'
import { OpenStreetMapProvider } from 'leaflet-geosearch'
import { setTimeout } from 'timers'

const provider = new OpenStreetMapProvider()

delete L.Icon.Default.prototype._getIconUrl

var parser = require('xml-js')

export default {
  name: 'Map',
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LControlAttribution,
    LControlZoom,
    MainLoading,
    MainBtn
  },
  data: function () {
    return {
      zoom: 6,
      map: null,
      mapOptions: {
        zoomControl: false,
        attributionControl: false,
        zoomSnap: true
      },
      url:
          'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png',
      icons: {
        place: L.icon({
          iconUrl: 'static/leaflet/place-icon.png',
          iconSize: [50, 50],
          iconAnchor: [25, 25]
        }),
        doctor: L.icon({
          iconUrl: 'static/leaflet/doctor-icon.png',
          iconSize: [50, 50],
          iconAnchor: [25, 25]
        })
      },
      markers: [],
      isCurrentPosition: false,
      city: {
        name: '',
        searching: true,
        loadingPlaces: false
      }
    }
  },
  methods: {
    ...mapActions({
      showModal: 'modal/show'
    }),
    initMap: function () {
      this.map = this.$refs.map.mapObject
    },
    getCityFromMap: function (event) {
      const data = [event.lat, event.lng]
      this.isCurrentPosition = false
      this.getCity(data)
    },
    getCity: async function (coords) {
      this.city.searching = true

      const search = await provider.search({query: coords})

      const osm_id = search[0].raw.osm_id

      await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&osm_id=${osm_id}&osm_type=W&accept-language=pl`
      )
        .then(results => results.json())
        .then(results => {
          const address = results.address
          const place =
              address.city ||
              address.town ||
              address.village ||
              address.hamlet ||
              address.suburb
          this.city.name = place || this.city.name
        })

      this.city.searching = false
    },
    getPlaces: async function () {
      this.city.loadingPlaces = true

      await apolloClient
        .query({
          query: PLACES_BY_CITY_QUERY,
          variables: {
            city: `%${this.city.name}%`
          }
        })
        .then(data => data.data.places)
        .then(places => this.addMarkers(places))
        .catch(error => {
          this.$toasted.error('Nie znaleziono gabinetów')
          console.error(error)
        })

      this.city.loadingPlaces = false
    },
    getPlaceLatLng: async function (place) {
      const results = await provider
        .search({query: `${place.address}, ${place.city}`})
        .catch(error => {
          this.$toasted.error('Wystąpił błąd')
          console.error(error)
        })
      return [results[0].raw.lat, results[0].raw.lon]
    },
    addMarkers: async function (places) {
      let markers = []
      await places.map(async place => {
        const latLng = await this.getPlaceLatLng(place)
        markers.push({
          icon: this.icons.place,
          latLng: latLng,
          info: () => this.showPlaceModal(place)
        })
      })

      this.markers = markers
    },
    showPlaceModal: function (place) {
      this.showModal({
        componentName: 'PlaceInfo',
        data: {
          hideBorders: true,
          place: place
        }
      })
    },
    getCurrentPosition: function (options) {
      if (navigator.geolocation) {
        return new Promise((resolve, reject) =>
          navigator.geolocation.getCurrentPosition(resolve, reject)
        )
      } else {
        return new Promise(resolve => resolve({}))
      }
    },
    setCurrentPosition: function () {
      this.getCurrentPosition()
        .then(pos => {
          if (pos.coords) {
            this.map = this.$refs.map.mapObject.setView(
              [pos.coords.latitude, pos.coords.longitude],
              12
            )
          } else {
            this.map = this.$refs.map.mapObject.setView(
              [52.0715018, 19.5211664],
              12
            )
          }
        })
        .then(() => {
          const unwatch = this.$watch(
            'city.searching',
            function () {
              this.isCurrentPosition = true
              unwatch()
            },
            {deep: true}
          )
        })
    }
  },
  mounted: function () {
    this.$nextTick(() => {
      this.initMap()
      this.setCurrentPosition()
    })
  }
}
</script>

<style lang="scss" scoped>
  @import "../../main";

  .map {
    width: 100%;
    z-index: 10;
    display: flex;

    &__position {
      position: absolute;
      bottom: 1rem;
      left: 1rem;
      z-index: 10000;
      padding: 1em;
      font-size: 1.25rem;
      box-shadow: 0 0 20px 0px rgba(213, 213, 213, 0.3);
      background: #fdfdfd;
      color: #67676e;
      height: auto;

      svg {
        height: 1.25rem;
        width: 1.25rem;
      }

      &.active {
        color: #6a6ee1;
      }
    }

    &__nav {
      position: absolute;
      bottom: 1rem;
      right: 1rem;
      z-index: 10000;

      &--search {
        padding: 1em !important;
        font-size: 1.25rem;
        font-weight: 600;

        span {
          font-weight: 700;
        }
      }

      &--loading {
        padding: 1em;
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 700;
        text-align: center;
        border-radius: 0.5rem;
        font-size: 1.25rem;
        box-shadow: 0 0 20px 0px rgba(213, 213, 213, 0.3);
        background: #fdfdfd;
        color: #6a6ee1;

        svg {
          margin-left: 0.5rem;
          height: 1.5rem;
          width: 1.5rem;
        }
      }
    }
  }

  .map__content {
    height: 100%;
    width: 100%;
  }

  /deep/ .leaflet-tile-pane {
    filter: saturate(0);
  }

  @media only screen and (max-width: 460px) {
    .map__position,
    .map__nav--search,
    .map__nav--loading {
      padding: 1rem !important;
    }
  }
</style>
