<template>
  <div class="history" v-if="this.$store.getters.userHistoryCount > 0">
    <div class="history__top">
      <div class="history__title">Historia wizyt</div>
      <div class="history__option">
        <div class="option__title">Sortuj przez:</div>
        <select class="option__select">
          <option selected>Data</option>
          <option>Specjalista</option>
          <option>Gabinet</option>
          <option>Opis</option>
        </select>
      </div>
      <div class="history__option">
        <div class="option__title">Na stronę:</div>
        <select class="option__select">
          <option selected>5</option>
          <option>10</option>
          <option>15</option>
        </select>
      </div>
    </div>
    <HistoryElements></HistoryElements>
  </div>
</template>

<script>
import MainBtn from "../../components/ui/MainBtn";
import HistoryElements from "./HistoryElements";

export default {
  name: "History",
  components: {
    MainBtn: MainBtn,
    HistoryElements: HistoryElements
  }
};
</script>

<style lang="scss" scoped>
@import "../../main";

.history {
  width: 100%;
}

.history__top {
  @extend %text--center;
  justify-content: left;
  font-weight: 600;
  margin: 2em 0 1em;
}
.history__title {
  color: #3e3e45;
  font-size: 1.5em;
  margin-right: 1.5em;
}
.history__option {
  @extend %text--center;
  margin-right: 1.5em;
  .option__title {
    @extend %text--center;
    color: #91919c;
    margin-right: 1em;
  }
  .option__select {
    @extend %text--center;
    background: transparent;
    border: none;
    font-weight: 600;
    color: #3e3e45;
  }
}
</style>