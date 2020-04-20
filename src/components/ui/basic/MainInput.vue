<template>
  <label class="input--main">
    <div>
      <slot></slot>
      <div class="input__focus"></div>
      <div class="input__info"></div>
    </div>
  </label>
</template>

<script>
export default {
  name: 'MainInput'
}
</script>

<style lang="scss" scoped>
  @import "../../../main";

  label.input--main {
    width: 90%;
    padding: 5%;
    border-radius: 0.5em;
    background: #fdfdff;
    display: inline-block;
    color: #91919c;
    position: relative;
    cursor: text;

    div {
      margin: 0;
      font-weight: 600;
    }

    .input__focus {
      opacity: 0;
      visibility: hidden;
      width: 7px;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      background: $darkviolet;
      border-top-left-radius: 0.125em;
      border-bottom-left-radius: 0.125em;
      transition: visibility 0s, opacity 0.2s cubic-bezier(0.4, 0, 1, 1);
    }

    input {
      margin-top: 0.5em;
      width: 80%;
      font-size: 1.2em;
      background: transparent;
      color: #3e3e45;
      font-weight: 600;
      @include placeholder {
        font-size: 0.9em;
        font-weight: 600;
        color: #aaaab4;
      }
    }

    &.many {
      border-radius: 0;

      &:not(.double) {
        border-bottom: 0.5px solid rgba(145, 145, 156, 0.3);
      }

      &:first-child {
        border-top-right-radius: 0.5em;
        border-top-left-radius: 0.5em;
      }

      &:last-child {
        border-bottom-right-radius: 0.5em;
        border-bottom-left-radius: 0.5em;
        border: none;
      }
    }

    &.double {
      border-radius: 0;
      display: inline-block;

      &:first-child {
        border-right: 0.5px solid rgba(145, 145, 156, 0.3);
        width: 40%;
        border-top-left-radius: 0.5em;
        border-top-right-radius: 0;
      }

      &:last-child {
        border-radius: 0;
        width: 40%;
        float: right;
        border-top-left-radius: 0;
        border-top-right-radius: 0.5em;
      }
    }

    & .input__info {
      width: 2em;
      height: 2em;
      position: absolute;
      top: calc(50% + 0.5em);
      right: 5%;
      transform: translateY(-50%);

      &::after {
        @extend %text--center;
        content: "";
        height: 100%;
        width: 100%;
        font-family: $font-awesome;
        font-size: 1.5em;
        font-weight: 600;
        visibility: hidden;
        opacity: 0;
        transition: visibility 0s, opacity 0.2s ease-in-out;
      }
    }

    &:not(.novalid) input:required:valid ~ .input__info::after {
      content: "";
      color: #2ecc71;
      visibility: visible;
      opacity: 1;
    }

    &:not(.norequired)
    input:required:not(:valid):not(:focus)
    ~ .input__info::after {
      content: "*";
      color: #c0392b;
      visibility: visible;
      opacity: 1;
      font-family: Montserrat;
      font-weight: 600;
      font-size: 2rem;
    }

    & div input:focus {
      & ~ .input__focus {
        visibility: visible;
        opacity: 1;
      }
    }
  }
</style>
