<template>
  <RedBlock ref="airData" v-bind:class="[levelID < 4 ? 'block--violet' : '']">
    {{ text }}
    <span>{{ textBold }}</span>
  </RedBlock>
</template>

<script>
import RedBlock from "../../components/ui/RedBlock";

export default {
  name: "AirData",
  data: function() {
    return {
      text: "Ładowanie danych...",
      textBold: "",
      levelID: 6
    };
  },
  methods: {
    deg2Rad: function(deg) {
      return (deg * Math.PI) / 180;
    },
    pythagorasEquirectangular: function(lat1, lon1, lat2, lon2) {
      lat1 = this.deg2Rad(lat1);
      lat2 = this.deg2Rad(lat2);
      lon1 = this.deg2Rad(lon1);
      lon2 = this.deg2Rad(lon2);
      var R = 6371; // km
      var x = (lon2 - lon1) * Math.cos((lat1 + lat2) / 2);
      var y = lat2 - lat1;
      var d = Math.sqrt(x * x + y * y) * R;
      return d;
    },
    airQuality(stationID) {
      return fetch(
        `https://cors-anywhere.herokuapp.com/http://api.gios.gov.pl/pjp-api/rest/aqindex/getIndex/${stationID}`
      )
        .then(response => {
          return response.json();
        })
        .then(stationInfo => {
          return {
            levelID: stationInfo.stIndexLevel.id,
            indexLevelName: stationInfo.stIndexLevel.indexLevelName
          };
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    closestStation: function(lat, lng) {
      return fetch(
        "https://cors-anywhere.herokuapp.com/http://api.gios.gov.pl/pjp-api/rest/station/findAll"
      )
        .then(response => {
          return response.json();
        })
        .then(stations => {
          var mindif = 99999;
          var closest;

          for (var i = 0; i < stations.length; ++i) {
            var dif = this.pythagorasEquirectangular(
              lat,
              lng,
              stations[i].gegrLat,
              stations[i].gegrLon
            );
            if (dif < mindif) {
              closest = i;
              mindif = dif;
            }
          }

          return stations[closest].id;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    getAirData: function(pos) {
      const stationID = this.closestStation(
        pos.coords.latitude,
        pos.coords.longitude
      );
      stationID
        .then(ID => {
          return this.airQuality(ID);
        })
        .then(response => {
          this.text = "";
          this.textBold = `Indeks jakości powietrza: ${
            response.indexLevelName
          }`;
          this.levelID = response.levelID;
        });
    }
  },
  mounted() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.getAirData, () => {
        this.text = "Brak dostępu";
        this.$toasted.error(
          "Zezwól na dostęp do lokalizacji, aby zobaczyć indeks jakości powietrza",
          {
            icon: "times",
            duration: 2000
          }
        );
      });
    }
  },
  components: {
    RedBlock
  }
};
</script>

<style lang="scss" scoped>
.block--violet {
  text-align: center;
  background: #6a6ee1 !important;
  background: -webkit-gradient(
    linear,
    left top,
    right top,
    from(#9394eb),
    to(#6a6ee1)
  ) !important;
  background: linear-gradient(to right, #9394eb, #6a6ee1) !important;
  filter: drop-shadow(0 0 10px rgba(213, 213, 213, 0.3)) !important;
  color: #d8d8e0 !important;
  span {
    color: #fafafa !important;
  }
}
</style>