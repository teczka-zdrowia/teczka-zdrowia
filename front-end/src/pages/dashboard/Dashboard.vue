<template>
  <div class="dashboard">
    <div class="row">
      <div class="column">
        <Block
          class="prescriptions"
          title="Obecne zalecenia"
        >
          <MainPrescription
            v-for="prescription in userPrescriptions"
            :key="prescription.id"
            :prescriptionID="prescription.id"
            :title="prescription.title"
            :info="prescription.info"
            :days="prescription.days"
            :showCancelBtn="true"
            :isTimeleft="true"
          />
        </Block>
      </div>
      <Map v-if="!isMobile" />
    </div>
    <div class="row">
      <!--<Block class="messages" title="Ostatnie wiadomości"> <a class="message" href="#"> <img class="message__img" src="https://www.mendeley.com/careers/getasset/c475b7c0-d36c-4c73-be33-a34030b6ca82/" > <div class="message__name">Jan Iksiński</div> <div class="message__last">Dzień dobry</div> <div class="message__hour">18:00</div> </a> <a class="message" href="#"> <img class="message__img" src="https://www.mendeley.com/careers/getasset/c475b7c0-d36c-4c73-be33-a34030b6ca82/" > <div class="message__name">Jan Iksiński</div> <div class="message__last">Dzień dobry</div> <div class="message__hour">18:00</div> </a> <a class="message" href="#"> <img class="message__img" src="https://www.mendeley.com/careers/getasset/c475b7c0-d36c-4c73-be33-a34030b6ca82/" > <div class="message__name">Jan Iksiński</div> <div class="message__last">Dzień dobry</div> <div class="message__hour">18:00</div> </a> <div class="message--last">Więcej</div> </Block>-->
      <Block
        class="appointments"
        title="Najbliższe wizyty"
      >
        <AppointmentsBox
          :showActions="false"
          :showMore="true"
        />
      </Block>
    </div>
  </div>
</template>

<script>
import WhiteFunctionalBlock from "../../components/ui/blocks/WhiteFunctionalBlock";
import VioletBlock from "../../components/ui/blocks/VioletBlock";
import MainSelect from "../../components/ui/basic/MainSelect";
import MainBtn from "../../components/ui/basic/MainBtn";
import MainPrescription from "../../components/ui/basic/MainPrescription";
import AppointmentsBox from "../../components/ui/appointments/AppointmentsBox";
import AirData from "./AirData";
import Map from "../map/Map";

import { mapGetters } from "vuex";

export default {
  name: "Dashboard",
  components: {
    Block: WhiteFunctionalBlock,
    VioletBlock,
    MainSelect,
    MainBtn,
    AppointmentsBox,
    AirData,
    MainPrescription,
    Map
  },
  data: function() {
    return {
      showUpcoming: true
    };
  },
  computed: {
    ...mapGetters({
      isMobile: "window/isMobile",
      userPrescriptions: "userPrescriptions/active"
    })
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
}

.column {
  display: block;
  position: relative;
  width: 33%;
}

.prescriptions {
  min-height: 24rem;
  //margin-bottom: 1em;
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
  width: calc(67% - 1em) !important;
  overflow: hidden;
  position: relative;
  z-index: 10;
  min-height: 24rem;
}

.map__content {
  height: 100%;
  width: 100%;
  min-height: 23rem;
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
}
</style>
