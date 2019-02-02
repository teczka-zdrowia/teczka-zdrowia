<template>
  <select class="select--main">
    <slot></slot>
  </select>
</template>

<script>
export default {
  name: "MainSelect"
};
</script>

<style lang="scss" scoped>
$lightgrey: rgba(213, 213, 213, 0.3);
$lightviolet: #9394eb;
$darkviolet: #6a6ee1;
$primrary-light: #fafafa;
$font-awesome: "Font Awesome 5 Free";

%text--center {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: center;
  justify-content: center;
  -ms-flex-align: center;
  align-items: center;
}

select::-ms-expand {
  display: none;
}

select.select--main {
  background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48c3ZnIHZlcnNpb249IjEuMSIgaWQ9IldhcnN0d2FfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCAzMjAgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAzMjAgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PHN0eWxlIHR5cGU9InRleHQvY3NzIj4uc3Qwe2ZpbGw6IzNFM0U0NTt9PC9zdHlsZT48cGF0aCBjbGFzcz0ic3QwIiBkPSJNMzEuMywxOTJoMjU3LjNjMTcuOCwwLDI2LjcsMjEuNSwxNC4xLDM0LjFMMTc0LjEsMzU0LjhjLTcuOCw3LjgtMjAuNSw3LjgtMjguMywwTDE3LjIsMjI2LjFDNC42LDIxMy41LDEzLjUsMTkyLDMxLjMsMTkyeiIvPjwvc3ZnPg==);
  background-position: 95% 50%;
  background-repeat: no-repeat;
  background-color: #f8fff8;
  background-size: 1em;
  -webkit-appearance: none;
  -moz-appearance: none;
  text-indent: 1px;
  text-overflow: "";
  width: 90%;
  padding: 5%;
  border: none;
  border-radius: 0.5em;
  display: inline-block;
  color: #3e3e45;
  font-weight: 600;
  position: relative;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  div {
    margin: 0;
    font-weight: 600;
  }
}
</style>
