<template>
  <div class="panel">
    <div class="row">
      <div class="column">
        <Block class="calendar">
          <div class="calendar__title">Kalendarz</div>
          <Calendar />
        </Block>
        <Patients />
      </div>
      <div class="appointments">
        <Places />
        <Appointments />
      </div>
    </div>
  </div>
</template>

<script>
import WhiteFunctionalBlock from "../../components/ui/blocks/WhiteFunctionalBlock";
import Calendar from "./Calendar";
import Appointments from "./Appointments";
import Patients from "./Patients";
import Places from "./Places";

export default {
  name: "Panel",
  components: {
    Block: WhiteFunctionalBlock,
    Calendar,
    Appointments,
    Patients,
    Places
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

.calendar {
  padding: 0 !important;
  width: auto;
  max-width: 22rem;
  display: table;
}

.calendar__title {
  color: #3e3e45;
  font-weight: 700;
  width: calc(100% - 3rem);
  font-size: 1.5em;
  padding: 1.5rem;
}

.appointments {
  width: calc(100% - 23rem);
}
</style>
