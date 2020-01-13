<template>
  <div
    class="header"
    v-bind:class="{ 'header--justify-end' : !isPaymentValid && !hasDoctorPermissions }"
  >
    <MainBtn
      v-if="isPaymentValid && viewAsDoctor"
      v-on:click.native="addAppointment"
    >Dodaj wizytę</MainBtn>
    <MainViewSwitch v-if="hasDoctorPermissions" />
    <UserInfo />
  </div>
</template>

<script>
import MainBtn from "../ui/basic/MainBtn";
import UserInfo from "../ui/UserInfo";
import GreyBlock from "../ui/blocks/GreyBlock";
import MainViewSwitch from "../ui/basic/MainViewSwitch";

import { mapActions, mapGetters } from "vuex";

export default {
  name: "AppHeader",
  components: {
    MainBtn,
    UserInfo,
    GreyBlock,
    MainViewSwitch
  },
  methods: {
    ...mapActions({
      showModal: "modal/show"
    }),
    addAppointment: function() {
      this.showModal({
        componentName: "AddAppointment",
        data: {
          hideBorders: true
        }
      });
    }
  },
  computed: {
    ...mapGetters({
      isPaymentValid: "userInfo/isPaymentValid",
      hasDoctorPermissions: "userInfo/hasDoctorPermissions",
      viewAs: "settings/viewAs"
    }),
    viewAsDoctor: function() {
      return this.viewAs === "doctor";
    }
  }
};
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
