<template>
  <div class="history" v-if="this.$store.getters.userHistoryCount > 0">
    <div class="history__top">
      <div class="history__title">Historia wizyt</div>
      <div class="history__options" v-if="this.$store.getters.window.width > 1199">
        <div class="history__option">
          <div class="option__title">Gabinet:</div>
          <select class="option__select">
            <option selected>Wszystkie</option>
            <option>Gabinet X</option>
            <option>Gabinet Y</option>
            <option>Gabinet Z</option>
          </select>
        </div>
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
      <div class="history__options" v-if="this.$store.getters.window.width < 1200">
        <div class="history__option">
          <MainBtn class="options--mobile">
            <i class="fas fa-cog"></i>
            Opcje
          </MainBtn>
        </div>
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
  justify-content: space-between;
  font-weight: 600;
  margin: 2em 0 1em;
}
.history__title {
  color: #3e3e45;
  font-size: 1.5em;
  margin-right: 1.5em;
}

.history__options {
  display: flex;
}

.history__option {
  display: flex;
  border-radius: 0.5em;
  overflow: hidden;
  &:not(:last-child) {
    margin-right: 2em;
  }
}

.option__title {
  @extend %text--center;
  padding: 0.5em 1em;
  background: #fafafc;
  color: #6a6ee1;
}
.option__select {
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

.options--mobile {
  height: 100%;
  width: 100%;
  i {
    margin-right: 1em;
    vertical-align: middle;
    transition: transform 0.2s ease-in-out;
  }
  &:hover {
    i {
      transform: rotate(90deg);
    }
  }
}
</style>