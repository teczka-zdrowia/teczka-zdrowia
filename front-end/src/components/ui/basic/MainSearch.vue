<template>
  <div class="search">
    <slot
      class="input"
      name="input"
    ></slot>
    <div class="icon">
      <span
        aria-hidden="true"
        class="fas fa-filter"
      />
    </div>
    <slot
      class="select"
      name="select"
    ></slot>
  </div>
</template>

<script>
export default {
  name: "MainSearch"
};
</script>

<style lang="scss" scoped>
@import "../../../main.scss";

.search {
  display: flex;
  position: relative;
}

.input {
  border-top-left-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
  background: #eeeef3;
  padding: 0.75rem;
  font-weight: 600;
  width: calc(100% - 3rem);
  transition: 0.2s ease-in-out;
  &:focus {
    @include placeholder {
      opacity: 0;
    }
  }
  @include placeholder {
    transition: 0.2s ease-in-out;
    color: #6a6ee1;
    font-family: Montserrat, "Font Awesome 5 Free";
  }
}

.icon {
  @extend %text--center;
  border-top-right-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  transition: 0.2s ease-in-out;
  color: #3e3e45;
  background: #e4e4ec;
  padding: 0 1rem;
  cursor: pointer;
  &:hover {
    & ~ .select {
      visibility: visible;
      opacity: 1;
    }
  }
}

.select {
  z-index: 100;
  visibility: hidden;
  opacity: 0;
  position: absolute;
  top: calc(100% + 0.5rem);
  padding: 1rem 0.75rem;
  width: calc(100% - 1.5rem);
  background: #e4e4ec;
  border-radius: 0.5rem;
  transition: all 0.2s ease-in-out;
  box-shadow: 0 0 20px 0px rgba(213, 213, 213, 0.3);
  label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 600;
    &:not(:last-child) {
      margin-bottom: 1rem;
    }
    select {
      cursor: pointer;
      padding: 0.25rem;
      border-radius: 0.5rem;
      width: 50%;
      background: #fafafc;
      border: 0;
    }
    &.label--highlight {
      padding: 0.5rem;
      border-radius: 0.5rem;
      background: #eeeef3;
    }
  }
  &:hover {
    visibility: visible;
    opacity: 1;
    & ~ .appointments__sort {
      border-radius: 0;
    }
  }
}
</style>