<template>
  <div class="main">
    <div class="main__content">
      <div class="error">
        <div class="error__title">Ups!</div>
        <div class="error__info">Nie znaleźliśmy takiej strony</div>
        <div class="error__back" v-on:click="$router.go(-1)">Powrót</div>
      </div>
    </div>
  </div>
</template>

<script>
import Logo from '../../components/ui/basic/logo/Logo'

export default {
  name: 'PageNotFound'
}
</script>

<style lang="scss" scoped>
  @import "../../main";

  .main {
    @extend %text--center;
    height: 100vh;
    width: 100%;
    background: $darkviolet;
    background: linear-gradient(to right, $lightviolet, $darkviolet);
  }

  .logo {
    @extend %text--center;
    margin-bottom: 2rem;
  }

  .error {
    @extend %text--center;
    color: #fafafc;
    display: block;
    text-align: center;

    &__title {
      font-weight: 700;
      font-size: 3em;
      margin-bottom: 1rem;
    }

    &__info {
      font-weight: 600;
      font-size: 1.5em;
      padding: 0 0.5rem;
    }

    &__back {
      cursor: pointer;
      margin-top: 1.5rem;
      color: #6a6ee1;
      background: #f0f0ff;
      border-radius: 0.5em;
      padding: 0.5em;
      font-weight: 600;
      font-size: 1.5rem;
      display: inline-block;
    }
  }
</style>
