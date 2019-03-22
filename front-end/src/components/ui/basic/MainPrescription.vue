<template>
  <div class="prescription">
      <i class="fas fa-prescription"></i>
      <div class="prescription__content">
        <div class="prescription__title">{{ title }}</div>
        <div class="prescription__info">{{ info }}</div>
      </div>
      <div class="prescription__cancel" title="Zakończ zalecenie" v-if="showCancelBtn" v-on:click="cancelPrescription(prescriptionId)">
        <i class="fas fa-times"></i>
      </div>
      <div class="prescription__timeleft" v-if="days > 0">
        <div v-if="timeleft">
            Pozostało
        </div>
        <span>{{ days }}</span> dni
      </div>
      <div class="prescription__timeleft" v-if="days == 0">Czas nieokreślony</div>
  </div>
</template>

<script>
export default {
  name: "MainPrescription",
  props: {
    title: {
      type: String
    },
    info: {
      type: String
    },
    showCancelBtn: {
      type: Boolean,
      default: false
    },
    days: {
      type: Number,
      default: 0
    },
    isTimeleft: {
      type: Boolean,
      default: false
    },
    prescriptionId: {
      type: Number
    }
  },
  methods: {
      cancelPrescription: function (id) {
          // TODO
      }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../main.scss";

.prescription {
  width: 100%;
  font-weight: 600;
  display: grid;
  grid-template-columns: 3rem auto 3rem;
  grid-template-areas:
    "icon info cancel"
    "timeleft timeleft timeleft";
  grid-column-gap: 1em;
  grid-row-gap: 0.5rem;
  & > i {
    grid-area: icon;
    margin-right: 1rem;
    padding: 0.5em;
    font-size: 1.5em;
    width: 1em;
    height: 1em;
    text-align: center;
    color: #6a6ee1;
    background: #eeeef3;
    border-radius: 0.5em;
  }
  &:not(:last-child) {
    margin-bottom: 1.5rem;
  }
}

.prescription__content {
  grid-area: info;
  height: calc(100% - 0.5rem);
  white-space: normal;
  display: flex;
  flex-direction: column;
  margin: 0.25rem 0;
}

.prescription__title {
  font-weight: 700;
  color: #3e3e45;
  margin-bottom: 0.25em;
}

.prescription__info {
  color: #67676e;
}

.prescription__timeleft {
  @extend %text--center;
  grid-area: timeleft;
  border-radius: 0.5rem;
  padding: 0.5rem;
  background: #eeeef3;
  color: #3e3e45;
  font-weight: 600;
  max-width: 100%;
  min-width: 9.5em;
  span {
    margin: 0 6px;
    color: #3e3e45;
    font-weight: 700;
  }
}

.prescription__cancel {
  @extend %text--center;
  grid-area: cancel;
  border-radius: 0.5rem;
  height: 100%;
  width: 3rem;
  background: rgba(238, 238, 243, 0.5);
  color: rgba(231, 76, 60, 0.75);
  cursor: pointer;
  transition: 0.2s ease-in-out;
  &:hover {
    background: rgba(238, 238, 243, 1);
    color: rgba(231, 76, 60, 1);
  }
}
</style>