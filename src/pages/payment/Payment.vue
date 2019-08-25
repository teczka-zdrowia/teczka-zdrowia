<template>
  <div>
    <div class="payment">
      <div
        class="payment__present active"
        v-if="daysUntil > 0"
      >
        <div class="payment__present__title">
          Plan:&nbsp;<span>FREE30</span>
        </div>
        <div class="payment__present__until">
          Aktywny do {{ paidUntil }} ({{ daysUntil > 1 ? `${daysUntil} dni` : `${daysUntil} dzień` }})
        </div>
      </div>
      <div
        class="payment__present"
        v-else
      >
        <div class="payment__present__title">
          Plan nieaktywny
        </div>
      </div>
      <transition name="fade">
        <div
          class="payment__storage"
          v-if="!loading.storage && gbMax != 0"
        >
          <div class="payment__storage__title">
            Miejsce na pliki: <span>{{ gbMax.toFixed(1) }} GB</span>
          </div>
          <div class="payment__storage__bar">
            <div
              class="payment__storage__bar--used"
              :style="`width: ${this.percentageUsed}%`"
            >
              <span v-if="percentageUsed > 50">
                {{ percentageUsed }}%
              </span>
            </div>
            <div
              class="payment__storage__bar--free"
              :style="`width: ${percentageFree}%`"
            >
              <span v-if="percentageFree > 50">
                {{ percentageFree }}%
              </span>
            </div>
          </div>
          <div class="payment__storage__free">
            Pozostało {{ (gbMax - gbUsed).toFixed(1) }} GB ({{ percentageFree }}%)
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

let moment = require("moment");
moment.locale("pl");

export default {
  name: "Payment",
  data: function() {
    return {
      loading: {
        storage: true
      }
    };
  },
  computed: {
    ...mapGetters({
      viewer: "userInfo/full"
    }),
    paidUntil: function() {
      return moment(this.viewer.paid_until, "YYYY-MM-DD").format("DD.MM.YYYY");
    },
    daysUntil: function() {
      return moment(this.viewer.paid_until, "YYYY-MM-DD").diff(
        moment(),
        "days"
      );
    },
    kbUsed: function() {
      return this.viewer.storage ? this.viewer.storage.kb_used : null;
    },
    kbMax: function() {
      return this.viewer.storage ? this.viewer.storage.kb_max : null;
    },
    gbUsed: function() {
      return this.viewer.storage ? this.kbToGB(this.kbUsed) : null;
    },
    gbMax: function() {
      return this.viewer.storage ? this.kbToGB(this.kbMax) : null;
    },
    gbFree: function() {
      return this.viewer.storage ? this.gbMax - this.gbUsed : null;
    },
    percentageUsed: function() {
      const quotient = this.kbUsed / this.kbMax;
      const percentage = quotient.toFixed(0);
      return this.viewer.storage ? percentage : null;
    },
    percentageFree: function() {
      return 100 - this.percentageUsed;
    }
  },
  methods: {
    ...mapActions({
      getStorage: "userInfo/getStorage"
    }),
    getUserStorage: async function() {
      this.loading.storage = true;
      await this.getStorage();
      this.loading.storage = false;
    },
    kbToGB: function(val) {
      return val / 1000 / 1000;
    }
  },
  mounted: function() {
    this.getUserStorage();
  }
};
</script>

<style lang="scss" scoped>
@import "../../main";

.payment {
  display: grid;
  grid-gap: 1rem;

  &__present {
    display: grid;
    color: #3e3e45;
    font-weight: 600;
    border-radius: 0.5rem;
    box-shadow: 0 0 20px 0px rgba(213, 213, 213, 0.3);
    background: #fafafa;
    -webkit-transition: 0.2s ease-in-out;
    transition: 0.2s ease-in-out;
    overflow: hidden;
    text-align: center;
    &.active {
      grid-template-rows: auto 3.5rem;
    }
    &__title {
      @extend %text--center;
      padding: 1rem;
      font-size: 1.5rem;
      span {
        color: #6a6ee1;
      }
    }
    &__until {
      padding: 1rem;
      background: #6a6ee1;
      color: #fafafa;
      text-align: center;
      font-size: 1.25rem;
    }
  }
  &__storage {
    color: #3e3e45;
    font-weight: 600;
    border-radius: 0.5rem;
    box-shadow: 0 0 20px 0px rgba(213, 213, 213, 0.3);
    background: #fafafa;
    -webkit-transition: 0.2s ease-in-out;
    transition: 0.2s ease-in-out;
    overflow: hidden;
    text-align: center;
    &__title {
      padding: 1rem;
      font-size: 1.5rem;
      span {
        color: #6a6ee1;
      }
    }
    &__bar {
      display: flex;
      margin: 1rem;
      margin-top: 0;
      border-radius: 0.5rem;
      overflow: hidden;
      font-weight: 600;
      color: #fafafa;
      & > div {
        padding: 1rem;
      }
      &--used {
        background: #6a6ee1;
      }
      &--free {
        background: #797de3;
      }
    }
    &__free {
      padding: 1rem;
      background: #eeeef3;
      color: #67676e;
      text-align: center;
      font-size: 1.25rem;
    }
  }
}

@media screen and (min-width: 960px) {
  .payment {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
