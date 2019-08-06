<template>
  <label class="textarea--main">
    <div>
      <slot></slot>
      <div class="textarea__focus"></div>
    </div>
  </label>
</template>

<script>
export default {
  name: "MainInput"
};
</script>

<style lang="scss" scoped>
@import "../../../main";

.textarea--main {
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
  .textarea__focus {
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
  textarea {
    margin-top: 0.5em;
    font-size: 1.2em;
    background: transparent;
    color: #3e3e45;
    font-weight: 600;
    border: 0;
    padding: 0;
    height: 3rem;
    width: 100%;
    overflow: hidden;
    resize: none;
    @include placeholder {
      font-size: 0.9em;
      font-weight: 600;
      color: #aaaab4;
    }
  }

  & div textarea:focus {
    & ~ .textarea__focus {
      visibility: visible;
      opacity: 1;
    }
  }
}
</style>
