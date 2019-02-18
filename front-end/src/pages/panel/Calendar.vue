<template>
  <date-pick
    v-model="date"
    :hasInputElement="false"
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
  }
};
</script>