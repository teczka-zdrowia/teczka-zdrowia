<template>
  <div>
    <Block class="addappointment__content">
      <form @submit.prevent="updateAppointment">
        <UpdateAppointmentComponent/>
        <div class="addappointment__actions">
          <button
            class="addappointment__btn addappointment__btn--grey"
            type="button"
            v-on:click="$router.go(-1)"
          >Anuluj
          </button>
          <MainBtn
            class="addappointment__btn addappointment__btn--violet"
            :loading="isLoading"
            :disabled="isLoading"
            color="#fafafa"
            v-on:click="updateAppointment"
          >Zaktualizuj
          </MainBtn>
        </div>
      </form>
    </Block>
  </div>
</template>

<script>
import UpdateAppointmentComponent from '../../components/ui/UpdateAppointmentComponent'
import MainBtn from '../../components/ui/basic/MainBtn'
import WhiteFunctionalBlock from '../../components/ui/blocks/WhiteFunctionalBlock'
import { mapActions, mapGetters } from 'vuex'
import handleErrors from '../../utils/handleErrors'

export default {
  name: 'AddAppointment',
  data: function () {
    return {
      isLoading: false
    }
  },
  computed: {
    ...mapGetters({
      appointmentData: 'updateAppointment/data',
      appointmentOldData: 'updateAppointment/oldData'
    })
  },
  methods: {
    ...mapActions({
      updateUserAppointment: 'updateAppointment/update',
      showModal: 'modal/show'
    }),
    updateAppointment: async function () {
      this.isLoading = true

      const payload = {
        id: this.appointmentOldData.id,
        data: this.appointmentData
      }

      await this.updateUserAppointment(payload)
        .then(appointment => {
          this.$toasted.success('Poprawnie zaktualizowano wizytę')
          this.$router.go(-1)
          this.showModal({
            componentName: 'AppointmentInfo',
            data: {
              hideBorders: true,
              viewerType: 'author',
              appointment: appointment
            }
          })
        })
        .catch(errors => handleErrors(errors))

      this.isLoading = false
    }
  },
  components: {
    UpdateAppointmentComponent,
    MainBtn,
    Block: WhiteFunctionalBlock
  },
  mounted () {
    if (this.appointmentData.id === null) {
      this.$rotuer.go(-1)
    }
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
