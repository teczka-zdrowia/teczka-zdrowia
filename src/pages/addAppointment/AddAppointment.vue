<template>
  <div>
    <Block class="addappointment__content">
      <form @submit.prevent="addAppointment">
        <AddAppointmentComponent />
        <div class="addappointment__actions">
          <button
            class="addappointment__btn addappointment__btn--grey"
            type="button"
            v-on:click="$router.go(-1)"
          >Anuluj</button>
          <MainBtn
            class="addappointment__btn addappointment__btn--violet"
            :loading="isLoading"
            :disabled="isLoading"
            color="#fafafa"
            v-on:click="addAppointment"
          >Dodaj wizytę</MainBtn>
        </div>
      </form>
    </Block>
  </div>
</template>

<script>
import AddAppointmentComponent from '../../components/ui/AddAppointmentComponent'
import MainBtn from '../../components/ui/basic/MainBtn'
import WhiteFunctionalBlock from '../../components/ui/blocks/WhiteFunctionalBlock'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'AddAppointment',
  data: function () {
    return {
      isLoading: false
    }
  },
  computed: {
    ...mapGetters({
      appointmentData: 'addAppointment/data'
    })
  },
  methods: {
    ...mapActions({
      addUserAppointment: 'addAppointment/add'
    }),
    addAppointment: async function () {
      this.isLoading = true

      await this.addUserAppointment(this.appointmentData)
        .then(() => {
          this.$toasted.success('Poprawnie dodano wizytę')
          this.$router.go(-1)
        })
        .catch(error => {
          console.error(error)
          this.$toasted.error('Wystąpił błąd')
        })

      this.isLoading = false
    }
  },
  components: {
    AddAppointmentComponent,
    MainBtn,
    Block: WhiteFunctionalBlock
  }
}
</script>

<style lang="scss" scoped>
.addappointment__content {
  padding: 0 !important;
}

.addappointment__actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  overflow: hidden;
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
}

.addappointment__btn {
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
