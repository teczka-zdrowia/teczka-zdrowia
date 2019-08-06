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
@import "../../../main.scss";

select::-ms-expand {
  display: none;
}

select.select--main {
  background-image: url(data:image/svg+xml;base64,PHN2ZyBhcmlhLWhpZGRlbj0idHJ1ZSIgZm9jdXNhYmxlPSJmYWxzZSIgZGF0YS1wcmVmaXg9ImZhcyIgZGF0YS1pY29uPSJhbmdsZS1kb3duIiBjbGFzcz0ic3ZnLWlubGluZS0tZmEgZmEtYW5nbGUtZG93biBmYS13LTEwIiByb2xlPSJpbWciIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDMyMCA1MTIiPjxwYXRoIGZpbGw9IiM5MTkxOWMiIGQ9Ik0xNDMgMzUyLjNMNyAyMTYuM2MtOS40LTkuNC05LjQtMjQuNiAwLTMzLjlsMjIuNi0yMi42YzkuNC05LjQgMjQuNi05LjQgMzMuOSAwbDk2LjQgOTYuNCA5Ni40LTk2LjRjOS40LTkuNCAyNC42LTkuNCAzMy45IDBsMjIuNiAyMi42YzkuNCA5LjQgOS40IDI0LjYgMCAzMy45bC0xMzYgMTM2Yy05LjIgOS40LTI0LjQgOS40LTMzLjggMHoiPjwvcGF0aD48L3N2Zz4=);
  background-position: 95% 50%;
  background-repeat: no-repeat;
  background-color: #f3f4f9;
  background-size: 1em;
  -webkit-appearance: none;
  -moz-appearance: none;
  text-indent: 1px;
  text-overflow: "";
  padding: 5%;
  border: none;
  border-radius: 0.5em;
  display: inline-block;
  color: #3e3e45;
  font-weight: 600;
  position: relative;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  &:hover {
    background-color: #eaeaea;
  }
  div {
    margin: 0;
    font-weight: 600;
  }
}
</style>
