<template>
  <div
    class="header"
    v-bind:class="{ 'header--justify-end' : !isPaymentValid }"
  >
    <MainBtn
      v-if="isPaymentValid"
      v-on:click.native="addAppointment"
    >Dodaj wizytę</MainBtn>
    <UserInfo />
  </div>
</template>

<script>
import MainBtn from '../ui/basic/MainBtn'
import UserInfo from '../ui/UserInfo'

import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'AppHeader',
  components: {
    MainBtn,
    UserInfo
  },
  methods: {
    ...mapActions({
      showModal: 'modal/show'
    }),
    addAppointment: function () {
      this.showModal({
        componentName: 'AddAppointment',
        data: {
          hideBorders: true
        }
      })
    }
  },
  computed: {
    ...mapGetters({
      isPaymentValid: 'userInfo/isPaymentValid'
    })
  }
}
</script>

<style lang="scss" scoped>
$primrary-light: #fafafa;

.header {
  padding: 1.5rem 4rem;
  margin-left: 5em;
  height: 3rem;
  width: calc(100% - 13em);
  background: $primrary-light;
  position: relative;
  display: flex;
  justify-content: space-between;
  &--justify-end {
    justify-content: flex-end;
  }
}
</style>
