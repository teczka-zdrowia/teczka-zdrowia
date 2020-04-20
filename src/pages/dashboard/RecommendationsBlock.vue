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
        v-for="recommendation in recommendations"
        :key="recommendation.id"
        :data="recommendation"
        :showCancelBtn="true"
        :isTimeleft="true"
      />
    </div>
    <GreyBlock
      class="recommendations__info"
      v-if="!loading.init && recommendations.length === 0"
    >Brak zaleceń
    </GreyBlock>
    <GreyBlock
      class="recommendations__info recommendations__info--loading"
      v-if="loading.init"
    >Ładowanie
      <MainLoading color="#67676e"/>
    </GreyBlock>
    <div
      class="recommendations__actions"
      v-if="!loading.init && recommendations.length !== 0"
    >
      <MainBtn
        v-if="paginatorInfo.currentPage > 1"
        :disabled="loading.previousPage || loading.nextPage"
        :loading="loading.previousPage"
        color="#6a6ee1"
        v-on:click.native="getPreviousRecommendations"
      ><span
        aria-hidden="true"
        class="fas fa-arrow-left"
      />
        Poprzednia
      </MainBtn>
      <MainBtn
        v-if="paginatorInfo.hasMorePages"
        :disabled="loading.previousPage || loading.nextPage"
        :loading="loading.nextPage"
        color="#6a6ee1"
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
import WhiteFunctionalBlock from '../../components/ui/blocks/WhiteFunctionalBlock'
import GreyBlock from '../../components/ui/blocks/GreyBlock'
import MainBtn from '../../components/ui/basic/MainBtn'
import MainLoading from '../../components/ui/basic/MainLoading'
import MainRecommendation from '../../components/ui/basic/MainRecommendation'

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'RecommendationsBlock',
  data: function () {
    return {
      loading: {
        init: true,
        previousPage: false,
        nextPage: false
      }
    }
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
      paginatorInfo: 'userRecommendations/paginatorInfo',
      recommendations: 'userRecommendations/list'
    })
  },
  methods: {
    ...mapActions({
      getUserRecommendations: 'userRecommendations/get'
    }),
    getRecommendations: async function (payload, type) {
      this.loading[type] = true

      await this.getUserRecommendations(payload).catch(error => {
        this.$toasted.error('Wystąpił błąd podczas ładowania zaleceń')
        console.error(error)
      })

      this.loading[type] = false
    },
    getFirstRecommendations: function () {
      const payload = {
        page: 1,
        count: 3
      }

      this.getRecommendations(payload, 'init')
    },
    getNextRecommendations: function () {
      const currentPage = this.paginatorInfo.currentPage
      const payload = {
        page: currentPage + 1,
        count: 3
      }

      this.getRecommendations(payload, 'nextPage')
    },
    getPreviousRecommendations: function () {
      const currentPage = this.paginatorInfo.currentPage
      const payload = {
        page: currentPage - 1,
        count: 3
      }

      this.getRecommendations(payload, 'previousPage')
    }
  },
  mounted: function () {
    this.getFirstRecommendations()
  }
}
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
