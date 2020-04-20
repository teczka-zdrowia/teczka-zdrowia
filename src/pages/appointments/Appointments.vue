<template>
  <div class="appointments">
    <div class="row">
      <Block
        class="appointments--block"
        title="Wizyty"
      >
        <AppointmentsBox
          :showActions="true"
          :showUserAs="'doctor'"
        />
      </Block>
    </div>
    <div class="row">
      <HistoryBox/>
    </div>
  </div>
</template>

<script>
import WhiteFunctionalBlock from '../../components/ui/blocks/WhiteFunctionalBlock'
import AppointmentsBox from '../../components/ui/appointments/AppointmentsBox'
import HistoryBox from '../../components/ui/history/HistoryBox'

export default {
  name: 'Appointments',
  components: {
    Block: WhiteFunctionalBlock,
    AppointmentsBox,
    HistoryBox
  }
}
</script>

<style lang="scss" scoped>
  @import "../../main";

  .row {
    display: flex;
    width: 100%;
    justify-content: space-between;

    &:last-child {
      margin-bottom: 3em;
    }
  }

  .appointments--block {
    width: calc(100% - 2rem);
    padding: 1rem;
  }

  @media only screen and (max-width: 1400px) {
    .row:last-child {
      display: block;

      .column {
        width: 100%;
      }
    }
  }

  @media only screen and (max-width: 960px) {
    .row {
      display: block;

      .column {
        width: 100%;
      }
    }
  }
</style>
