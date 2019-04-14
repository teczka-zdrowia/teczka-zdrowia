<template>
  <div class="history__list">
    <HistoryElement
      v-for="(item, index) in userHistory"
      :key="index"
      :data="item"
    />
    <MainShowMore :isLoading="isLoading" />
  </div>
</template>

<script>
import MainShowMore from "../basic/MainShowMore";
import HistoryElement from "./HistoryElement";

export default {
  name: "HistoryElements",
  components: {
    HistoryElement,
    MainShowMore
  },
  data: function() {
    return {
      isLoading: false
    };
  },
  computed: {
    userHistory: function() {
      return this.$store.getters["userHistory/all"];
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../main";

.history__list > div:last-child {
  margin-bottom: 2em;
}

.list__actions {
  margin-top: 0.5em;
  height: 3em;
  display: flex;
  justify-content: center;
}

.list__more {
  @extend %text--center;
  border: 0;
  transition: 0.2s ease-in-out;
  border-radius: 0.5em;
  border-radius: 0.25em;
  padding: 0.5em 1.5em;
  background: none;
  color: #1a1b37;
  font-weight: 600;
  background: #fafafc;
  cursor: pointer;
  &:hover {
    background: #ffffff;
  }
  i {
    margin-left: 0.75em;
  }
}
</style>