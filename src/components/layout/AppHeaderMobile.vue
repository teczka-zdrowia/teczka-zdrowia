<template>
  <div class="header">
    <UserInfo />
  </div>
</template>

<script>
import MainBtn from "../ui/basic/MainBtn";
import UserInfo from "../ui/UserInfo";

export default {
  name: "AppHeader",
  components: {
    MainBtn: MainBtn,
    UserInfo: UserInfo
  }
};
</script>

<style lang="scss" scoped>
$primrary-light: #fafafa;

.header {
  padding: 1rem 0.5rem;
  height: 3rem;
  width: calc(100% - 1em);
  background: $primrary-light;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 999;
  display: flex;
  justify-content: flex-end;
  box-shadow: 0 0 20px 0px rgba(213, 213, 213, 0.3);
  .button {
    position: fixed;
    right: 1rem;
    height: auto;
    bottom: 2rem;
    padding: 0.5em;
    font-size: 1.5em;
  }
  &:has(div) {
    margin-left: auto;
  }
}
.header__content {
  width: 100%;
}
</style>