<template>
  <div class="logo">
    <span
      aria-hidden="true"
      class="fas fa-briefcase-medical"
    />
    Teczka
    <span>Zdrowia</span>
  </div>
</template>

<script>
export default {
  name: 'Logo'
}
</script>

<style lang="scss" scoped>
@import "../../../../main";

.logo {
  color: #fafafa;
  font-size: 2em;
  display: flex;
  vertical-align: middle;
  span {
    margin-right: 0.5em;
  }
  span {
    font-weight: 600;
    margin-left: 10px;
  }
}
</style>
