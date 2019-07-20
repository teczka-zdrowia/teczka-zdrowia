<template>
  <div class="recommendation">
    <span
      aria-hidden="true"
      class="fas fa-prescription"
    />
    <div class="recommendation__content">
      <div class="recommendation__title">{{ data.title }}</div>
      <div class="recommendation__info">{{ data.description }}</div>
    </div>
    <div
      class="recommendation__cancel"
      title="Zakończ zalecenie"
      v-if="showCancelBtn"
      @click="cancelRecommendation(data.id, title)"
    >
      <span
        aria-hidden="true"
        class="fas fa-times"
      />
    </div>
    <div
      class="recommendation__timeleft"
      v-if="data.days > 0"
    >
      <div v-if="isTimeleft">
        Pozostało
      </div>
      <span>{{ daysLeft }}</span> dni
    </div>
    <div
      class="recommendation__timeleft"
      v-if="data.days == 0"
    >Czas nieokreślony</div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "MainRecommendation",
  props: {
    showCancelBtn: {
      type: Boolean,
      default: false
    },
    isTimeleft: {
      type: Boolean,
      default: false
    },
    data: {
      id: {
        type: Number
      },
      title: {
        type: String
      },
      description: {
        type: String
      },
      days: {
        default: 0
      },
      start_date: {
        type: String
      }
    }
  },
  methods: {
    ...mapActions({
      showModal: "modal/show"
    }),
    cancelRecommendation: function(id, title) {
      this.showModal({
        componentName: "CancelRecommendation",
        data: {
          recommendationID: id,
          recommendationTitle: title
        }
      });
    }
  },
  computed: {
    daysLeft: function() {
      let today = new Date();
      let startDate = new Date(this.data.start_date);
      let finalDate = new Date();
      finalDate.setDate(startDate.getDate() + this.data.days);
      return Math.round((finalDate - startDate) / (1000 * 60 * 60 * 24));
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../main.scss";

.recommendation {
  width: 100%;
  font-weight: 600;
  display: grid;
  grid-template-columns: 3rem auto 3rem;
  grid-template-areas:
    "icon info cancel"
    "timeleft timeleft timeleft";
  grid-column-gap: 1em;
  grid-row-gap: 0.5rem;
  & > span {
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

.recommendation__content {
  grid-area: info;
  height: calc(100% - 0.5rem);
  white-space: normal;
  display: flex;
  flex-direction: column;
  margin: 0.25rem 0;
}

.recommendation__title {
  font-weight: 700;
  color: #3e3e45;
  margin-bottom: 0.25em;
}

.recommendation__info {
  color: #67676e;
}

.recommendation__timeleft {
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

.recommendation__cancel {
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