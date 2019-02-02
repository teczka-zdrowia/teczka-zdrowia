<template>
  <div class="header">
    <MainBtn>Dodaj wizytę</MainBtn>
    <UserInfo></UserInfo>
  </div>
</template>

<script>
import MainBtn from "../ui/MainBtn";
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
  padding: 1.5em 4em;
  margin-left: 5em;
  height: 3em;
  width: calc(100% - 13em);
  background: $primrary-light;
  position: relative;
  display: flex;
  justify-content: space-between;
}
</style>