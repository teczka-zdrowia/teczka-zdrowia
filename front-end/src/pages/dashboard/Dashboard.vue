<template>
  <div class="dashboard">
    <div class="row">
      <div class="column">
        <Block class="prescriptions" title="Obecne zalecenia">
          <div class="prescription">
            <i class="fas fa-prescription"></i>
            <div class="prescription__content">
              <div class="prescription__title">Witamina C</div>
              <div class="prescription__info">5mg • 2x dziennie</div>
            </div>
          </div>
          <div class="prescription">
            <i class="fas fa-prescription"></i>
            <div class="prescription__content">
              <div class="prescription__title">Witamina C</div>
              <div class="prescription__info">5mg • 2x dziennie</div>
            </div>
          </div>
        </Block>
        <!--<AirData class="air"></AirData>-->
      </div>
      <div class="map" v-if="this.$store.getters.window.width > 959">
        <div class="map__content">
          <l-map ref="map" :zoom="zoom" :center="[52.0715018,21.5211664]">
            <l-tile-layer :url="url"></l-tile-layer>
          </l-map>
        </div>
        <div class="map__actions">
          <div class="actions__content">
            <div class="actions__title">Czego szukasz?</div>
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
            <MainBtn class="actions__btn">Szukaj</MainBtn>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <!--<Block class="messages" title="Ostatnie wiadomości">
        <a class="message" href="#">
          <img
            class="message__img"
            src="https://www.mendeley.com/careers/getasset/c475b7c0-d36c-4c73-be33-a34030b6ca82/"
          >
          <div class="message__name">Jan Iksiński</div>
          <div class="message__last">Dzień dobry</div>
          <div class="message__hour">18:00</div>
        </a>
        <a class="message" href="#">
          <img
            class="message__img"
            src="https://www.mendeley.com/careers/getasset/c475b7c0-d36c-4c73-be33-a34030b6ca82/"
          >
          <div class="message__name">Jan Iksiński</div>
          <div class="message__last">Dzień dobry</div>
          <div class="message__hour">18:00</div>
        </a>
        <a class="message" href="#">
          <img
            class="message__img"
            src="https://www.mendeley.com/careers/getasset/c475b7c0-d36c-4c73-be33-a34030b6ca82/"
          >
          <div class="message__name">Jan Iksiński</div>
          <div class="message__last">Dzień dobry</div>
          <div class="message__hour">18:00</div>
        </a>
        <div class="message--last">Więcej</div>
      </Block>-->
      <Block class="appointments" title="Wizyty" ref="appointments">
        <div class="appointments__actions" v-if="this.$store.getters.window.width > 959">
          <div class="appointments__types">
            <MainBtn
              v-on:click.native="showUpcoming = true"
              v-bind:class="[showUpcoming == true ? 'active' : '']"
            >Nadchodzące</MainBtn>
            <MainBtn
              v-on:click.native="showUpcoming = false"
              v-bind:class="[showUpcoming == false ? 'active' : '']"
            >Minione</MainBtn>
          </div>
          <div class="appointments__pages">
            <MainBtn>
              <i class="fas fa-angle-left"></i>
            </MainBtn>
            <MainBtn>
              <i class="fas fa-angle-right"></i>
            </MainBtn>
          </div>
          <div class="appointments__sort">
            <div class="sort__title">Sortuj przez:</div>
            <select class="sort__select">
              <option selected>Data</option>
              <option>Specjalista</option>
              <option>Gabinet</option>
              <option>Opis</option>
            </select>
          </div>
        </div>
        <div class="appointments__actions" v-if="this.$store.getters.window.width < 960">
          <MainBtn class="actions__options">
            <i class="fas fa-cog"></i>
            Opcje
          </MainBtn>
        </div>
        <Appointments
          class="appointments__content"
          :maxAppointments="maxAppointments"
          v-if="this.$store.getters.window.width > 959"
        ></Appointments>
        <AppointmentsMobile v-if="this.$store.getters.window.width < 960"></AppointmentsMobile>
      </Block>
    </div>
  </div>
</template>

<script>
import WhiteFunctionalBlock from "../../components/ui/WhiteFunctionalBlock";
import VioletBlock from "../../components/ui/VioletBlock";
import MainSelect from "../../components/ui/MainSelect";
import MainBtn from "../../components/ui/MainBtn";
import Appointments from "./Appointments";
import AppointmentsMobile from "./AppointmentsMobile";
import AirData from "./AirData";
import { LMap, LTileLayer, LMarker, LControlAttribution } from "vue2-leaflet";
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
    Block: WhiteFunctionalBlock,
    VioletBlock,
    MainSelect,
    MainBtn,
    Appointments,
    AppointmentsMobile,
    AirData,
    LMap,
    LTileLayer,
    LMarker,
    LControlAttribution
  },
  data: function() {
    return {
      zoom: 6,
      maxAppointments: 0,
      showUpcoming: true,
      map: null,
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
      let mapAttribution = this.$refs.map.$el.querySelectorAll(
        ".leaflet-bottom"
      )[1];
      mapAttribution.classList.remove("leaflet-right");
      mapAttribution.classList.add("leaflet-left");
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
      console.log(this.$refs.appointments.$el.offsetWidth);
      this.maxAppointments = Math.floor(
        this.$refs.appointments.$el.offsetWidth / 300
      );
    });
  }
};
</script>

<style lang="scss" scoped>
@import "../../main";

.row {
  margin-bottom: 1em;
  display: flex;
  width: 100%;
  justify-content: space-between;
  &:last-child {
    margin-bottom: 3em;
  }
}

.appointments {
  display: table;
  //width: calc(67% - 5em);
  width: calc(100% - 4em);
  position: relative;
  .appointments__actions {
    display: flex;
    width: 100%;
    justify-content: space-between;
    .appointments__types,
    .appointments__pages {
      display: flex;
      button {
        background: #ededff;
        color: #6a6ee1;
        &:hover {
          color: $primrary-light;
          background: $darkviolet;
          background: linear-gradient(to right, $lightviolet, $darkviolet);
          filter: drop-shadow(0 0 10px $lightgrey);
        }
        border-radius: 3em;
        &:first-child {
          margin-right: 1em;
        }
      }
    }
    .appointments__types {
      button {
        border-radius: 0.5em;
      }
      button.active {
        color: $primrary-light;
        background: $darkviolet;
        background: linear-gradient(to right, $lightviolet, $darkviolet);
        filter: drop-shadow(0 0 10px $lightgrey);
        transition: 0.2s ease-in-out;
        background-position: right center;
      }
    }
    .appointments__pages {
      button {
        padding: 0.5em 1.25em;
        border-radius: 100%;
        width: 0;
        i {
          @extend %text--center;
          font-size: 1.25em;
        }
      }
    }
    .appointments__sort {
      display: flex;
      overflow: hidden;
    }

    .sort__title {
      @extend %text--center;
      padding: 0.5em 1em;
      color: #6a6ee1;
      font-weight: 600;
    }
    .sort__select {
      font-weight: 600;
      padding: 0.5em 1em;
      border-radius: 0.5em;
      color: #fafafc;
      background: #6a6ee1;
      background: -webkit-gradient(
        linear,
        left top,
        right top,
        from(#9394eb),
        to(#6a6ee1)
      );
      background: linear-gradient(to right, #9394eb, #6a6ee1);
      -webkit-filter: drop-shadow(0 0 10px rgba(213, 213, 213, 0.3));
      filter: drop-shadow(0 0 10px rgba(213, 213, 213, 0.3));
      border: 0;
      option {
        font-weight: 600;
        background: #6a6ee1;
      }
    }
    .actions__pages {
      left: -1.5rem;
      position: absolute;
      width: calc(100% + 3rem);
      display: flex;
      justify-content: space-between;
      top: 50%;
      button {
        border-radius: 100%;
        width: 0.5em;
        height: 3em;
        //background: #ededff;
        //color: #6a6ee1;
        i {
          @extend %text--center;
          font-size: 1.25em;
        }
      }
    }
    .actions__options {
      background: #ededff;
      color: #6a6ee1;
      padding: 1em;
      width: 100%;
      margin-bottom: 2rem;
      cursor: pointer;
      i {
        margin-right: 1em;
      }
    }
  }
  .appointments__content {
    width: 100%;
    display: flex;
    margin-top: 2em;
  }
}
.column {
  display: block;
  position: relative;
  width: 33%;
}

.prescriptions {
  min-height: 19rem;
  //margin-bottom: 1em;
}

.prescription {
  width: 100%;
  font-weight: 600;
  margin-bottom: 1em;
  display: flex;
  i {
    margin-right: 1rem;
    padding: 0.5em;
    font-size: 1.5em;
    width: 1em;
    height: 1em;
    text-align: center;
    color: #6a6ee1;
    background: #f0f0ff;
    border-radius: 0.5em;
  }
}

.prescription__content {
  height: 100%;
  margin: auto 0;
  white-space: normal;
}

.prescription__title {
  font-weight: 700;
  color: #3e3e45;
  margin-bottom: 0.25em;
}

.prescription__info {
  color: #67676e;
}

.air {
  @extend %text--center;
  font-size: 1.25em;
  height: auto !important;
  padding: 1.5em 2em;
  font-weight: 600;
  color: #ffe6e7;
  span {
    color: #fafafa;
    margin-left: 10px;
    font-weight: 600;
  }
}

.map {
  border-radius: 0.5em;
  box-shadow: 0 0 20px 0px rgba(213, 213, 213, 0.3);
  background: #fafafc;
  width: calc(67% - 1em);
  overflow: hidden;
  position: relative;
  z-index: 10;
}

.map__content {
  height: 100%;
  width: 100%;
  min-height: 23rem;
}
.map__actions {
  min-width: 14em;
  max-height: 19em;
  position: absolute;
  padding: 1em;
  width: 33%;
  right: 0;
  top: 0;
  height: calc(100% - 2em);
  z-index: 1000;
}

.actions__content {
  margin-left: auto;
  padding: 2em;
  width: calc(100% - 4em);
  height: auto;
  background: #fafafc;
  border-radius: 0.5em;
  box-shadow: 0 0 20px 0px rgba(213, 213, 213, 0.3);
}

.actions__title {
  font-weight: 600;
  color: #3e3e45;
  font-size: 1.2em;
  text-align: center;
  margin-bottom: 1em;
}

.actions__selects {
  select {
    width: 100%;
    background-color: #e7ebf6;
    margin-bottom: 1em;
    &:hover {
      background-color: #e0e7f9;
    }
  }
}

.actions__btn {
  width: 100%;
  height: auto;
  padding-top: 1em;
  padding-bottom: 1em;
}

.messages {
  display: table;
  position: relative;
  width: calc(33% - 4em);
}

.block__content {
  border-radius: 0.5em;
  overflow: hidden;
}
.message--last {
  padding: 1em 0;
  text-align: center;
  font-weight: 600;
  background: #f4f4ff;
  cursor: pointer;
}
.message {
  @extend %text--center;
  padding: 1em 0;
  justify-content: space-between;
  transition: 0.2s ease-in-out;
  cursor: pointer;
  display: grid;
  grid-template-columns: 3.5em auto;
  grid-template-areas:
    "img name hour"
    "img short short";
  grid-template-columns: 3.5em calc(80% - 3.5em) 10%;
  height: 3.5em;
  &:not(:last-child) {
    border-bottom: 1px solid rgba(213, 213, 213, 0.6);
  }
}

.message__img {
  grid-area: img;
  height: 3.5em;
  border-radius: 1em;
  -webkit-filter: drop-shadow(0 0 10px rgba(213, 213, 213, 0.3));
  filter: drop-shadow(0 0 10px rgba(213, 213, 213, 0.3));
}
.message__name {
  justify-content: left;
  grid-area: name;
  font-weight: 600;
  color: #3e3e45;
}
.message__last {
  justify-content: left;
  grid-area: short;
  font-weight: 600;
  color: #67676e;
}
.message__hour {
  grid-area: hour;
  font-weight: 500;
  color: #67676e;
}

.leaflet-left .leaflet-control:not(:has(a)) {
  margin-left: 1em;
}

.leaflet-top .leaflet-control:not(:has(a)) {
  margin-top: 1em;
}

@media only screen and (max-width: 1400px) {
  .row:last-child {
    display: block;
    .column {
      width: 100%;
    }
  }
  .messages {
    width: calc(100% - 4em);
    margin-bottom: 1em;
  }
  .appointments {
    display: block;
    width: calc(100% - 4em);
  }
}

@media only screen and (max-width: 960px) {
  .row {
    display: block;
    .column {
      width: 100%;
    }
  }
  .prescriptions {
    min-height: unset;
  }
  .appointments {
    width: calc(100% - 3rem);
  }
}
</style>
