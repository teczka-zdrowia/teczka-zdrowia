<template>
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
</template>

<script>
import MainSelect from "../../components/ui/basic/MainSelect";
import MainBtn from "../../components/ui/basic/MainBtn";

var parser = require("xml-js");

export default {
  name: "MapNav",
  components: {
    MainSelect,
    MainBtn
  },
  data: function() {
    return {
      query: {
        type: "",
        spec: "",
        city: ""
      }
    };
  }
};
</script>

<style lang="scss" scoped>
@import "../../main";

.map__actions {
  position: absolute;
  padding: 0 1rem;
  width: 33%;
  min-width: 12rem;
  height: 100%;
  z-index: 1000;
  right: 1rem;
  top: 0;
}

.actions__content {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  //max-height: 17rem;
  margin-left: auto;
  padding: 2em;
  width: calc(100% - 4rem);
  height: auto;
  background: #fafafc;
  border-radius: 0.5rem;
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
</style>
