<template>
  <div
    class="history"
    v-if="this.$store.getters['userHistory/count'] > 0"
  >
    <div class="history__top">
      <div class="history__title">Historia</div>
      <MainSearch class="history__right">
        <input
          class="input"
          slot="input"
          type="text"
          placeholder="  Szukaj"
        >
        <div
          class="select"
          slot="select"
        >
          <label>
            Sortuj przez:
            <select>
              <option selected>Data</option>
              <option>Specjalista</option>
              <option>Gabinet</option>
              <option>Opis</option>
            </select>
          </label>
          <label>
            Porządkuj:
            <select>
              <option selected>Rosnąco</option>
              <option>Malejąco</option>
            </select>
          </label>
          <label>
            Ładuj po:
            <select>
              <option selected>5</option>
              <option>10</option>
              <option>20</option>
            </select>
          </label>
          <label class="label--highlight">
            Gabinet:
            <select>
              <option selected>Wszystkie</option>
              <option>Gabinet długonazwowy</option>
              <option>Lorem ipsum</option>
            </select>
          </label>
        </div>
      </MainSearch>
    </div>
    <HistoryElements></HistoryElements>
  </div>
</template>

<script>
import MainBtn from "../basic/MainBtn";
import MainSearch from "../basic/MainSearch";
import HistoryElements from "./HistoryElements";

export default {
  name: "History",
  components: {
    MainBtn,
    MainSearch,
    HistoryElements
  }
};
</script>

<style lang="scss" scoped>
@import "../../../main";

.history {
  width: 100%;
}

.history__top {
  @extend %text--center;
  font-weight: 700;
  justify-content: space-between;
  font-weight: 600;
  margin: 2em 0 1em;
  width: calc(100% - 2rem);
  padding: 1rem;
  border-radius: 0.5rem;
  -webkit-box-shadow: 0 0 20px 0px rgba(213, 213, 213, 0.3);
  box-shadow: 0 0 20px 0px rgba(213, 213, 213, 0.3);
  background: #fafafc;
}
.history__title {
  color: #3e3e45;
  font-size: 1.5em;
  margin-right: 1.5em;
  font-weight: 700;
}

.history__right {
  display: flex;
  position: relative;
}

.history__search {
  border-top-left-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
  background: #eeeef3;
  padding: 0.75rem;
  font-weight: 600;
  width: calc(100% - 3rem);
  transition: 0.2s ease-in-out;
  &:focus {
    @include placeholder {
      opacity: 0;
    }
  }
  @include placeholder {
    transition: 0.2s ease-in-out;
    color: #6a6ee1;
    font-family: Montserrat, "Font Awesome 5 Free";
  }
}

.history__sort {
  @extend %text--center;
  border-top-right-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  transition: 0.2s ease-in-out;
  color: #3e3e45;
  background: #e4e4ec;
  padding: 0 1rem;
  cursor: pointer;
  &:hover {
    & ~ .history__sort__content {
      visibility: visible;
      opacity: 1;
    }
  }
}

.history__sort__content {
  z-index: 100;
  visibility: hidden;
  opacity: 0;
  position: absolute;
  top: calc(100% + 0.5rem);
  padding: 1rem 0.75rem;
  width: calc(100% - 1.5rem);
  background: #e4e4ec;
  border-radius: 0.5rem;
  transition: all 0.2s ease-in-out;
  label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 600;
    &:not(:last-child) {
      margin-bottom: 1rem;
    }
    select {
      cursor: pointer;
      padding: 0.25rem;
      border-radius: 0.5rem;
      width: 50%;
      background: #fafafc;
      border: 0;
    }
  }
  &:hover {
    visibility: visible;
    opacity: 1;
    & ~ .history__sort {
      border-radius: 0;
    }
  }
}
</style>