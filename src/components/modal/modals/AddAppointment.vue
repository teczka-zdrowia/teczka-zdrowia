<template>
  <form class="modal--aa" @submit.prevent="addAppointment">
    <AddAppointmentComponent />
    <div class="modal__actions">
      <button
        class="modal__btn modal__btn--grey"
        type="button"
        v-on:click="hideModal"
      >
        Anuluj
      </button>
      <MainBtn
        class="modal__btn modal__btn--violet"
        :loading="isLoading"
        :disabled="isLoading"
        color="#fafafa"
        v-on:click="addAppointment"
        >Dodaj wizytę</MainBtn
      >
    </div>
  </form>
</template>

<script>
import AddAppointmentComponent from '../../ui/AddAppointmentComponent'
import MainBtn from '../../ui/basic/MainBtn'
import { mapActions, mapGetters } from 'vuex'
import handleErrors from '../../../utils/handleErrors'

import '../modal.scss'

export default {
  name: 'AddAppointment',
  data: function () {
    return {
      isLoading: false
    }
  },
  computed: {
    ...mapGetters({
      data: 'modal/data',
      appointmentData: 'addAppointment/data'
    })
  },
  methods: {
    ...mapActions({
      hideModal: 'modal/hide',
      addUserAppointment: 'addAppointment/add'
    }),
    addAppointment: async function () {
      this.isLoading = true

      await this.addUserAppointment(this.appointmentData)
        .then(appointment => {
          this.$toasted.success('Poprawnie dodano wizytę')
          this.$eventBus.$emit('new-appointment', appointment)
          this.hideModal()
        })
        .catch(errors => handleErrors(errors))

      this.isLoading = false
    }
  },
  components: {
    AddAppointmentComponent,
    MainBtn
  }
}
</script>

<style lang="scss" scoped>
.modal--aa {
  display: flex;
  flex-direction: column;
  background: #f5f5f5;
  border-radius: 0.5rem;
  .modal__actions {
    padding: 1rem;
  }
}

@media only screen and (max-width: 720px) {
  .modal--aa {
    width: 100vw;
    border-radius: 0;
    height: calc(100vh - 56px);
  }
}
</style>
