<template>
  <div class="cplace">
    <form class="cplace__form">
      <MainInput class="many">
        Nazwa
        <input
          type="text"
          name="name"
          maxlength="14"
          v-model="data.name"
          placeholder="MedMax"
          required
        >
      </MainInput>
      <div class="input--double-container">
        <MainInput class="many double">
          Adres
          <input
            type="text"
            name="address"
            minlength="1"
            v-model="data.address"
            placeholder="Polna 6"
            required
          >
        </MainInput>
        <MainInput class="many double">
          Miejscowość
          <input
            type="text"
            name="city"
            minlength="1"
            v-model="data.city"
            placeholder="Warszawa"
            required
          >
        </MainInput>
      </div>
    </form>

  </div>
</template>

<script>
import MainInput from "../ui/basic/MainInput";

export default {
  name: "CreatePlaceComponent",
  data: function() {
    return {
      data: {
        name: "",
        address: "",
        city: ""
      }
    };
  },
  components: {
    MainInput
  }
};
</script>

<style lang="scss" scoped>
.cplace {
  &__form {
  }
}
</style>
