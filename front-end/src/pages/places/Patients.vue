<template>
  <div>
    <div class="actions__options">
      <MainBtn class="options__btn options__btn--add">
        <i class="fas fa-plus"></i>
      </MainBtn>
      <MainBtn
        class="options__btn options__btn--options"
        v-if="this.$store.getters.window.width < 959"
      >
        <i class="fas fa-cog"></i>
        Opcje
      </MainBtn>
      <div class="options__select" v-if="this.$store.getters.window.width > 960">
        <div class="select__title">Sortuj:</div>
        <select class="select__content">
          <option selected>A - Z</option>
          <option>Z - A</option>
        </select>
      </div>
    </div>
    <div class="actions__patients">
      <div class="actions__patient">
        <img src="https://www.mendeley.com/careers/getasset/c475b7c0-d36c-4c73-be33-a34030b6ca82/">
        <div class="patient__name">Jan Iksiński</div>
      </div>
      <div class="actions__patient">
        <img src="https://www.mendeley.com/careers/getasset/c475b7c0-d36c-4c73-be33-a34030b6ca82/">
        <div class="patient__name">Jan Iksiński</div>
      </div>
      <div class="actions__patient">
        <img src="https://www.mendeley.com/careers/getasset/c475b7c0-d36c-4c73-be33-a34030b6ca82/">
        <div class="patient__name">Jan Iksiński</div>
      </div>
      <div class="actions__patient">
        <img src="https://www.mendeley.com/careers/getasset/c475b7c0-d36c-4c73-be33-a34030b6ca82/">
        <div class="patient__name">Jan Iksiński</div>
      </div>
      <div class="actions__patient">
        <img src="https://www.mendeley.com/careers/getasset/c475b7c0-d36c-4c73-be33-a34030b6ca82/">
        <div class="patient__name">Jan Iksiński</div>
      </div>
      <div class="actions__patient disabled">
        <img src="https://www.mendeley.com/careers/getasset/c475b7c0-d36c-4c73-be33-a34030b6ca82/">
        <div class="patient__name">Jan Iksiński</div>
        <i class="fas fa-lock"></i>
      </div>
      <div class="actions__patient disabled">
        <img src="https://www.mendeley.com/careers/getasset/c475b7c0-d36c-4c73-be33-a34030b6ca82/">
        <div class="patient__name">Jan Iksiński</div>
        <i class="fas fa-lock"></i>
      </div>
      <div class="actions__patient disabled">
        <img src="https://www.mendeley.com/careers/getasset/c475b7c0-d36c-4c73-be33-a34030b6ca82/">
        <div class="patient__name">Jan Iksiński</div>
        <i class="fas fa-lock"></i>
      </div>
    </div>
  </div>
</template>

<script>
import MainBtn from "../../components/ui/MainBtn";

export default {
  name: "Offices",
  components: {
    MainBtn
  }
};
</script>

<style lang="scss" scoped>
@import "../../main";

.actions__options {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 1rem;
}

.options__btn {
  padding: 1rem 0;
  width: calc(50% - 0.5rem);
  i {
    margin-right: 0.75rem;
  }
  &:first-child {
    margin-right: 1rem;
  }
  &--add {
    &::after {
      content: "Nowy";
    }
  }
  &--options {
    background: #e6e6e8;
    color: #6a6ee1;
    i {
      transition: transform 0.2s ease-in-out;
    }
    &:hover {
      i {
        transform: rotate(90deg);
      }
    }
  }
}

.actions__patients {
  display: grid;
  grid-template-columns: 100%;
  grid-column-gap: 1em;
  row-gap: 1em;
}

.actions__patient {
  @extend %text--center;
  position: relative;
  font-weight: 700;
  color: #3e3e45;
  width: auto;
  overflow: unset;
  text-overflow: unset;
  transition: all 0.2s ease-in-out;
  justify-content: left;
  white-space: nowrap;
  color: #67676e;
  cursor: pointer;
  height: 3em;
  width: calc(100% - 2em);
  padding: 1em;
  border-radius: 0.5em;
  box-shadow: 0 0 20px 0px rgba(213, 213, 213, 0.3);
  background: #fafafc;
  .patient__name {
    font-weight: 700;
    color: #3e3e45;
  }
  img {
    height: 100%;
    width: auto;
    border-radius: 1em;
    display: block;
    margin-right: 1em;
  }
  i {
    margin-left: auto;
    padding: 0.5em;
    font-size: 1.5em;
    width: 1em;
    height: 1em;
    text-align: center;
    color: #6a6ee1;
    background: #e6e6e8;
    border-radius: 0.5em;
  }
  &:hover {
    transform: scale(1.025);
    box-shadow: 0 0 60px 0 rgba(145, 145, 156, 0.3);
  }
  &:active {
    transform: scale(1.0125);
  }
  &.disabled {
    background: #eeeef3;
    filter: grayscale(100%);
    i:hover {
      &::before {
        content: "";
      }
    }
  }
}

.options__select {
  display: flex;
  border-radius: 0.5em;
  overflow: hidden;
  &:not(:last-child) {
    margin-right: 2em;
  }
}

.select__title {
  @extend %text--center;
  padding: 0.5em 1em;
  background: #fafafc;
  color: #6a6ee1;
  font-weight: 600;
}
.select__content {
  font-weight: 600;
  padding: 0.5em 1em;
  color: #fafafc;
  background: #6a6ee1;
  background: -webkit-gradient(
    linear,
    left top,
    right top,
    from(#9394eb),
    to(#6a6ee1)
  );
  background: linear-gradient(to right, #9394eb, #6a6ee1);
  -webkit-filter: drop-shadow(0 0 10px rgba(213, 213, 213, 0.3));
  filter: drop-shadow(0 0 10px rgba(213, 213, 213, 0.3));
  border: 0;
  option {
    font-weight: 600;
    background: #6a6ee1;
  }
}

@media only screen and (min-width: 960px) {
  .actions__patients {
    grid-template-columns: 50% 50%;
  }
  .options__btn {
    &::after {
      content: "Nowy pacjent";
    }
    width: auto;
    padding: 1rem;
  }
}
</style>