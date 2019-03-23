<template>
  <div class="management">
    <div>
      <Block class="management__block" title="Ustawienia"></Block>
      <Block class="management__block" title="Statystyki"></Block>
    </div>
    <div class="management__patients">
      <div class="patients__block">Pracownicy</div>
      <MainUser :userType="1"/>
      <MainUser :userType="1"/>
      <MainUser :userType="2"/>
      <MainUser :userType="2"/>
      <MainUser :userType="2"/>
      <MainUser :userType="2"/>
    </div>
  </div>
</template>

<script>
import MainBtn from "../../components/ui/basic/MainBtn";
import MainSearch from "../../components/ui/basic/MainSearch";
import MainUser from "../../components/ui/basic/MainUser";
import WhiteFunctionalBlock from "../../components/ui/blocks/WhiteFunctionalBlock";

export default {
  name: "Management",
  components: {
    Block: WhiteFunctionalBlock,
    MainUser,
    MainSearch,
    MainBtn
  }
};
</script>

<style lang="scss" scoped>
@import "../../main";

.management {
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 1rem;
}

.patients__block {
  padding: 1rem;
  width: calc(100% - 2rem);
  margin-bottom: 1rem;
  background: #fdfdfd;
  box-shadow: 0 0 20px 0px rgba(213, 213, 213, 0.3);
  border-radius: 0.5rem;
  color: #3e3e45;
  text-align: center;
  font-weight: 700;
  font-size: 1.5em;
}

.management__block {
  padding: 1rem;
  margin-right: 1rem;
  &:not(:last-child) {
    margin-bottom: 1rem;
  }
}

.management__patients {
  & > div:not(:last-child) {
    margin-bottom: 1rem;
  }
}
</style>