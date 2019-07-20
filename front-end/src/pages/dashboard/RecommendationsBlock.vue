<template>
  <Block
    class="recommendations"
    title="Obecne zalecenia"
  >
    <div
      class="recommendations__list"
      v-if="!loading.init"
    >
      <MainRecommendation
        v-for="(recommendation, index) in recommendations"
        :key="index"
        :data="recommendation"
        :showCancelBtn="true"
        :isTimeleft="true"
      />
    </div>
    <GreyBlock
      class="recommendations__info"
      v-if="!loading.init && recommendations.length === 0"
    >Brak zaleceń</GreyBlock>
    <GreyBlock
      class="recommendations__info recommendations__info--loading"
      v-if="loading.init"
    >Ładowanie
      <MainLoading color="#67676e" />
    </GreyBlock>
    <div
      class="recommendations__actions"
      v-if="!loading.init && recommendations.length !== 0"
    >
      <MainBtn
        v-if="pageInfo.hasPreviousPage"
        :disabled="loading.previousPage || loading.nextPage"
        :loading="loading.previousPage"
      ><span
          aria-hidden="true"
          class="fas fa-arrow-left"
        />
        Poprzednia</MainBtn>
      <MainBtn
        v-if="pageInfo.hasNextPage"
        :disabled="loading.previousPage || loading.nextPage"
        :loading="loading.nextPage"
        v-on:click.native="getNextRecommendations"
      >Następna
        <span
          aria-hidden="true"
          class="fas fa-arrow-right"
        /></MainBtn>
    </div>
  </Block>
</template>

<script>
import WhiteFunctionalBlock from "../../components/ui/blocks/WhiteFunctionalBlock";
import GreyBlock from "../../components/ui/blocks/GreyBlock";
import MainBtn from "../../components/ui/basic/MainBtn";
import MainLoading from "../../components/ui/basic/MainLoading";
import MainRecommendation from "../../components/ui/basic/MainRecommendation";

import { mapGetters, mapActions } from "vuex";

export default {
  name: "RecommendationsBlock",
  data: function() {
    return {
      loading: {
        init: true,
        previousPage: false,
        nextPage: false
      }
    };
  },
  components: {
    Block: WhiteFunctionalBlock,
    GreyBlock,
    MainBtn,
    MainLoading,
    MainRecommendation
  },
  computed: {
    ...mapGetters({
      pageInfo: "userRecommendations/pageInfo",
      recommendations: "userRecommendations/list"
    })
  },
  methods: {
    ...mapActions({
      getUserRecommendations: "userRecommendations/get"
    }),
    getFirstRecommendations: function() {
      const payload = {
        first: 3,
        after: ""
      };

      this.getUserRecommendations(payload)
        .then(() => (this.loading.init = false))
        .catch(error => {
          this.$toasted.error("Wystąpił błąd");
          console.error(error);
        });
    },
    getNextRecommendations: function() {
      this.loading.nextPage = true;
      console.log(this.loading.nextPage);
      const endCursor = this.pageInfo.endCursor;
      const payload = {
        first: 3,
        after: endCursor
      };

      this.getUserRecommendations(payload)
        .catch(error => {
          this.$toasted.error("Wystąpił błąd");
          console.error(error);
        })
        .finally(() => {
          this.loading.nextPage = false;
        });
    },
    getPreviousRecommendations: function() {
      this.loading.previousPage = true;
      const endCursor = this.pageInfo.endCursor;
      this.getUserRecommendations(3, endCursor)
        .then(() => (this.loading.previousPage = false))
        .catch(error => {
          this.$toasted.error("Wystąpił błąd");
          console.error(error);
        });
    }
  },
  mounted() {
    this.getFirstRecommendations();
  }
};
</script>

<style lang="scss" scoped>
.recommendations {
  min-height: 24rem;
  //margin-bottom: 1em;
  &__info {
    height: 24rem;
    padding: 0 1rem;
    &--loading {
      svg {
        height: 2rem;
        width: 2rem;
        margin-left: 1rem;
      }
    }
  }

  &__actions {
    display: flex;
    margin-top: 2rem;
    .button {
      width: 100%;
      padding: 1em !important;
      background: #eeeef3 !important;
      color: #6a6ee1 !important;
      &:first-child {
        &:not(:only-child) {
          margin-right: 1rem;
        }
        span {
          margin-right: 0.5rem;
        }
      }

      &:last-child {
        span {
          margin-left: 0.5rem;
        }
      }

      span.button__loading > svg > circle {
        stroke: #6a6ee1;
      }
    }
  }
}

@media only screen and (max-width: 960px) {
  .recommendations {
    min-height: unset;
    &__info {
      height: unset;
      padding: 1rem;
    }
  }
}
</style>
