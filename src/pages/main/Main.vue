<template>
  <div class="main">
    <div class="main__content">
      <Logo/>
      <div class="coming">Już wkrótce</div>
    </div>
  </div>
</template>

<script>
import MainBtn from '../../components/ui/basic/MainBtn'
import Logo from '../../components/ui/basic/logo/Logo'

export default {
  name: 'Main',
  components: {
    MainBtn,
    Logo
  }
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
    margin-bottom: 3em;
  }

  .coming {
    @extend %text--center;
    padding: 1em;
    color: #fafafc;
    font-weight: 600;
    border: 3px solid #fafafc;
    font-size: 2em;
    cursor: default;
    transition: 0.2s ease-in-out;
    border-radius: 0.5rem;

    &:hover {
      background: #fafafc;
      color: $darkviolet;
    }
  }
</style>
