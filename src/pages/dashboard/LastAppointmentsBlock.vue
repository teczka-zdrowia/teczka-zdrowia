<template>
  <Block
    class="appointments"
    title="Najbliższe wizyty"
  >
    <AppointmentsBox
      :showUserAs="'doctor'"
      :showActions="false"
      :showAppointmentsLink="true"
    />
  </Block>
</template>

<script>
import WhiteFunctionalBlock from '../../components/ui/blocks/WhiteFunctionalBlock'
import GreyBlock from '../../components/ui/blocks/GreyBlock'
import AppointmentsBox from '../../components/ui/appointments/AppointmentsBox'

import { mapGetters } from 'vuex'

export default {
  name: 'LastAppointmentsBlock',
  components: {
    Block: WhiteFunctionalBlock,
    GreyBlock,
    AppointmentsBox
  }
}
</script>
