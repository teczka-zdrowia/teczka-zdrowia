<template>
  <div class="main center--absolute">
    <p>Główna strona dostępna bez logowania, wkrótce coś tu będzie.</p>
    <router-link to="/Auth"><MainBtn>Logowanie</MainBtn></router-link>
  </div>
</template>

<script>
import MainBtn from "../../components/ui/MainBtn";

export default {
  name: "Main",
  components: {
      MainBtn: MainBtn
  }
}
</script>

<style lang="scss">

.main {
    font-weight: 600;
    font-size: 1.5em;
}

</style>
