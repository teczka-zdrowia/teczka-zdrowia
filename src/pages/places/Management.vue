<template>
  <div class="management">
    <div>
      <Block
        class="management__block"
        title="Ustawienia"
      >
        <Settings />
      </Block>
      <Block
        class="management__block"
        title="Statystyki"
      >
        <Statistics />
      </Block>
    </div>
    <Employees />
  </div>
</template>

<script>
import WhiteFunctionalBlock from '../../components/ui/blocks/WhiteFunctionalBlock'
import Settings from './Settings'
import Statistics from './Statistics'
import Employees from './Employees'

import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Management',
  components: {
    Block: WhiteFunctionalBlock,
    Settings,
    Statistics,
    Employees
  }
}
</script>

<style lang="scss" scoped>
@import "../../main";

.management {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 2rem;
}

.management__block {
  padding: 1rem;
  &:not(:last-child) {
    margin-bottom: 1rem;
  }
  .block__top {
    margin-bottom: 1rem;
  }
}

@media only screen and (min-width: 960px) {
  .management {
    grid-template-columns: 1fr 1fr;
    grid-gap: 1rem;
  }
}
</style>
