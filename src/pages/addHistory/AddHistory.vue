<template>
  <div>
    <Block class="addhistory__content">
      <form @submit.prevent="createHistory">
        <AddHistoryComponent />
        <div class="addhistory__actions">
          <button
            class="addhistory__btn addhistory__btn--grey"
            type="button"
            v-on:click="$router.go(-1)"
          >Anuluj</button>
          <MainBtn
            class="addhistory__btn addhistory__btn--violet"
            :loading="isLoading"
            :disabled="isLoading"
            color="#fafafa"
            v-on:click="createHistory"
          >Dodaj historię</MainBtn>
        </div>
      </form>
    </Block>
  </div>
</template>

<script>
import AddHistoryComponent from '../../components/ui/AddHistoryComponent'
import MainBtn from '../../components/ui/basic/MainBtn'
import WhiteFunctionalBlock from '../../components/ui/blocks/WhiteFunctionalBlock'
import { mapActions, mapGetters } from 'vuex'
import handleErrors from '../../utils/handleErrors'

export default {
  name: 'AddHistory',
  data: function () {
    return {
      isLoading: false
    }
  },
  computed: {
    ...mapGetters({
      historyData: 'addHistory/data',
      historyInstance: 'addHistory/history'
    })
  },
  methods: {
    ...mapActions({
      addUserHistory: 'addHistory/add',
      addHistoryAttachments: 'addHistory/addAttachments',
      addHistoryRecommendations: 'addHistory/addRecommendations'
    }),
    createHistory: async function () {
      this.isLoading = true

      const { recommendations, attachments, ...history } = this.historyData

      await this.addUserHistory(history)
        .then(() =>
          Promise.all([
            this.addRecommendations(recommendations),
            this.addAttachments(attachments)
          ])
        )
        .then(() => {
          this.$toasted.success('Poprawnie dodano historię')
          this.$router.go(-1)
        })
        .catch(errors => handleErrors(errors))

      this.isLoading = false
    },
    addRecommendations: function (recommendations) {
      const recommendationsPayload = {
        data: recommendations,
        historyId: this.historyInstance.id
      }

      return this.addHistoryRecommendations(recommendationsPayload)
    },
    addAttachments: function (attachments) {
      const attachmentsPayload = {
        data: attachments,
        historyId: this.historyInstance.id
      }

      return this.addHistoryAttachments(attachmentsPayload)
    }
  },
  components: {
    AddHistoryComponent,
    MainBtn,
    Block: WhiteFunctionalBlock
  }
}
</script>

<style lang="scss" scoped>
.addhistory__content {
  padding: 0 !important;
}

.addhistory__actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  overflow: hidden;
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
}

.addhistory__btn {
  padding: 1rem;
  font-weight: 600;
  border-radius: 0;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  &--grey {
    background: #f5f5f5;
    color: #1a1b37;
  }
  &--violet {
    background: #6a6ee1;
    color: #fafafc;
  }
}
</style>
