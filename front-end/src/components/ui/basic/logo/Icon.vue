<template>
  <div class="icon">
    <i class="fas fa-briefcase-medical"></i>
  </div>
</template>

<script>
export default {
  name: "Icon"
};
</script>

<style lang="scss" scoped>
@import "../../../../main";

.icon {
  color: #fafafa;
  font-size: 2em;
  display: flex;
  vertical-align: middle;
  i {
    margin-right: 0.5em;
  }
  span {
    font-weight: 600;
    margin-left: 10px;
  }
}
</style>
