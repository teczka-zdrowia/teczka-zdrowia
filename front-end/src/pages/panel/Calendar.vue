<template>
  <date-pick
    v-model="date"
    :hasInputElement="false"
    :nextMonthCaption="'Następny miesiąc'"
    :prevMonthCaption="'Poprzedni miesiąc'"
    :setTimeCaption="'Ustaw czas'"
    :weekdays="['Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'Sb', 'Nd']"
    :months="['Styczeń', 'Luty', 'Marzec','Kwiecień','Maj','Czerwiec','Lipiec','Sierpień','Wrzesień','Październik','Listopad','Grudzień']"
    :highlighted="['2019-1-1','2019-1-2','2019-1-3']"
    :selectableYearRange="20"
  ></date-pick>
</template>

<script>
import DatePick from "../../components/ui/vue-date-pick/vueDatePick";

export default {
  components: { DatePick },
  data: function() {
    return {
      date: "2019-01-11"
    };
  },
  props: {
    nextMonthCaption: { type: String, default: "Następny miesiąc" },
    prevMonthCaption: { type: String, default: "Poprzedni month" },
    setTimeCaption: { type: String, default: "Wyznacz czas:" },
    weekdays: {
      type: Array,
      default: () => ["Pn", "Wt", "Śr", "Cz", "Pt", "Sb", "Nd"]
    },
    months: {
      type: Array,
      default: () => [
        "January",
        "Luty",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ]
    }
  }
};
</script>

<style lang="scss" scoped>
.calendar {
  .vdpHeader {
    border-radius: 0.5em;
    overflow: hidden;
    .vdpPeriodControl button {
      font-weight: 600;
      color: #3e3e45;
    }
  }

  .vdpInnerWrap {
    width: 100%;
    border: 0;
    background: #fafafc;
    font-weight: 600;
    box-shadow: none;
  }

  .vdpCell.today {
    color: #6a6ee1;
  }

  .vdpCell.selected .vdpCellContent {
    color: #fff;
    background: #6a6ee1;
  }

  @media (hover: hover) {
    .vdpCell.selectable:hover .vdpCellContent {
      color: #fff;
      background: #6a6ee1;
    }
  }
}
</style>