<template>
  <div class="panel">
    <div class="row">
      <div class="column">
        <Block class="calendar">
          <div class="calendar__title">Kalendarz</div>
          <Calendar />
        </Block>
        <Patients class="patients" />
        <div class="appointments">
          <Places />
          <Appointments />
        </div>
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
  grid-area: calendar;
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

.column {
  display: grid;
  grid-template-columns: 21rem auto;
  grid-template-areas:
    "calendar appointments"
    "patients appointments";
  grid-gap: 1rem;
  width: 100%;
  grid-auto-rows: 28.5rem auto;
}

.appointments {
  grid-area: appointments;
  width: 100%;
}

.patients {
  grid-area: patients;
}

@media only screen and (max-width: 768px) {
  .column {
    grid-template-columns: auto;
    grid-template-areas:
      "calendar"
      "appointments"
      "patients";
    grid-gap: 1rem;
    width: 100%;
    grid-auto-rows: 28rem auto;
  }

  .calendar {
    max-width: 100%;
  }
}
</style>
