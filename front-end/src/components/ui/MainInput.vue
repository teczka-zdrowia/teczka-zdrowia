<template>
  <label class="input--main">
      <div>
          <slot>
          </slot>
          <div class="input__focus"></div>
          <div class="input__info"></div>
      </div>
  </label>
</template>

<script>
export default {
  name: "MainInput"
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

@mixin placeholder {
  &::-webkit-input-placeholder {@content}
  &:-moz-placeholder           {@content}
  &::-moz-placeholder          {@content}
  &:-ms-input-placeholder      {@content}  
}

label.input--main {
    width: 90%;
    padding: 5%;
    border-radius: .5em;
    background: #f8f8ff;
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
        border-top-left-radius: .125em;
        border-bottom-left-radius: .125em;
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
            font-size: .9em;
            font-weight: 600;
            color: #aaaab4;
        }
    }

    &.many {
        border-radius: 0;
        &:not(.double) {
            border-bottom: .5px solid rgba(145, 145, 156, 0.3);
        }
        &:first-child {
            border-top-right-radius: .5em;
            border-top-left-radius: .5em;
        }
        &:last-child {
            border-bottom-right-radius: .5em;
            border-bottom-left-radius: .5em;
            border: none;
        }

    }
    &.double {
        border-radius: 0;
        display: inline-block;
        &:first-child {
            border-right: .5px solid rgba(145, 145, 156, 0.3);
            width: 40%;
            border-top-left-radius: .5em;
            border-top-right-radius: 0;
        }
        &:last-child {
            border-radius: 0;
            width: 40%;
            float: right;
            border-top-left-radius: 0;
            border-top-right-radius: .5em;
        }
    }
    & .input__info {
        width: 2em;
        height: 2em;
        position: absolute;
        top: calc(50% + .5em);
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
    &:not(.novalid) input:required:valid ~ .input__info::after  {
        content: "";
        color: #2ecc71;
        visibility: visible;
        opacity: 1;
    }
    & div input:focus {
        & ~ .input__focus {
            visibility: visible;
            opacity: 1;
        }
    }
}
</style>
