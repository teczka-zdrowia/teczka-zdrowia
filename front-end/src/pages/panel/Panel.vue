<template>
  <div class="panel">
    <div class="row">
      <div class="column basic">
        <div class="calendar__title">Kalendarz</div>
        <Block class="calendar">
          <Calendar></Calendar>
        </Block>
      </div>
      <div class="appointments">
        <div class="appointments__top">
          <div class="appointments__title">Wizyty</div>
          <div class="appointments__types">
            <MainBtn
              v-on:click.native="showUpcoming = true"
              v-bind:class="[showUpcoming ? 'active' : '']"
            >Nadchodzące</MainBtn>
            <MainBtn
              v-on:click.native="showUpcoming = false"
              v-bind:class="[!showUpcoming ? 'active' : '']"
            >Minione</MainBtn>
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
        <div class="appointemtns__content">
          <Appointments></Appointments>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import WhiteFunctionalBlock from "../../components/ui/WhiteFunctionalBlock";
import VioletBlock from "../../components/ui/VioletBlock";
import MainBtn from "../../components/ui/MainBtn";
import Appointments from "./Appointments";
import Calendar from "./Calendar";

var parser = require("xml-js");

export default {
  name: "Dashboard",
  components: {
    Block: WhiteFunctionalBlock,
    VioletBlock: VioletBlock,
    MainBtn: MainBtn,
    Appointments,
    Calendar
  },
  data: function() {
    return {
      date: "2019-01-01",
      showUpcoming: true
    };
  }
};
</script>

<style lang="scss" scoped>
@import "../../main";

.panel__title {
  color: #3e3e45;
  font-weight: 600;
  width: 100%;
  font-size: 1.5em;
  margin-bottom: 1em;
}

.row {
  margin-bottom: 1em;
  display: flex;
  width: 100%;
  justify-content: space-between;
  &:last-child {
    margin-bottom: 3em;
  }
  .column {
    display: block;
    position: relative;
  }
}

.basic {
  width: 25%;
}

.calendar__title {
  color: #3e3e45;
  font-weight: 600;
  width: 100%;
  font-size: 1.5em;
  margin-bottom: 1em;
  height: 2rem;
}

.calendar {
  padding: 0em !important;
}

.appointments {
  display: block;
  position: relative;
  width: calc(75% - 1em);
}

.appointments__top {
  @extend %text--center;
  justify-content: space-between;
  margin-bottom: 1em;
  font-weight: 600;
  height: 2.5em;
}

.appointments__title {
  color: #3e3e45;
  font-size: 1.5em;
  margin-right: 1.5em;
}

.appointments__types {
  display: flex;
  height: 100%;
  button {
    background: #ededff;
    color: #6a6ee1;
    border-radius: 0.5em;
    &:hover {
      color: $primrary-light;
      background: $darkviolet;
      background: linear-gradient(to right, $lightviolet, $darkviolet);
      filter: drop-shadow(0 0 10px $lightgrey);
    }
    &:first-child {
      margin-right: 1em;
    }
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

.appointments__sort {
  display: flex;
  border-radius: 0.5em;
  overflow: hidden;
}

.sort__title {
  @extend %text--center;
  padding: 0.5em 1em;
  background: #fafafc;
  color: #6a6ee1;
}
.sort__select {
  font-weight: 600;
  padding: 0.5em 1em;
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
</style>
