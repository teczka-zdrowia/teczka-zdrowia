<template>
  <div class="icon">
    <span
      aria-hidden="true"
      class="fas fa-briefcase-medical"
    />
  </div>
</template>

<script>
export default {
  name: 'Icon'
}
</script>

<style lang="scss" scoped>
  @import "../../../../main";

  .icon {
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
