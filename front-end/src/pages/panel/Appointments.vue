<template>
  <div>
    <div class="appointment">
      <div class="appointment__block">
        <img src="https://www.mendeley.com/careers/getasset/c475b7c0-d36c-4c73-be33-a34030b6ca82/">
        <div class="block__text">Jan Iksiński</div>
      </div>
      <div class="appointment__few">
        <div class="appointment__block">
          <i class="fas fa-map-marker-alt"></i>
          <div class="block__text">MedMax Warszawa</div>
        </div>
        <div class="appointment__block">
          <i class="far fa-comment-alt"></i>
          <div class="block__text">Rutynowa kontrola</div>
        </div>
      </div>
      <div class="appointment__when">
        <div class="when__date">
          <i class="fas fa-calendar-day"></i>
          <p>25.10.2019</p>
        </div>
        <div class="when__time">
          <i class="far fa-clock"></i>
          <p>18:30</p>
        </div>
      </div>
      <div class="appointment__block appointment__acceptation acceptation--true">
        <i class="fas fa-check"></i>
      </div>
      <div class="appointment__block appointment__actions">
        <i class="fas fa-ellipsis-h"></i>
        <div class="actions__content">
          <div class="actions__action">
            <i class="fas fa-pen"></i>
          </div>
          <div class="actions__action">
            <i class="fas fa-times"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="appointment">
      <div class="appointment__block">
        <img src="https://www.mendeley.com/careers/getasset/c475b7c0-d36c-4c73-be33-a34030b6ca82/">
        <div class="block__text">Jan Iksiński</div>
      </div>
      <div class="appointment__few">
        <div class="appointment__block">
          <i class="fas fa-map-marker-alt"></i>
          <div class="block__text">MedMax Warszawa</div>
        </div>
        <div class="appointment__block">
          <i class="far fa-comment-alt"></i>
          <div class="block__text">Rutynowa kontrola</div>
        </div>
      </div>
      <div class="appointment__when">
        <div class="when__date">
          <i class="fas fa-calendar-day"></i>
          <p>25.10.2019</p>
        </div>
        <div class="when__time">
          <i class="far fa-clock"></i>
          <p>18:30</p>
        </div>
      </div>
      <div class="appointment__block appointment__acceptation acceptation--true">
        <i class="fas fa-check"></i>
      </div>
      <div class="appointment__block appointment__actions">
        <i class="fas fa-ellipsis-h"></i>
        <div class="actions__content">
          <div class="actions__action">
            <i class="fas fa-pen"></i>
          </div>
          <div class="actions__action">
            <i class="fas fa-times"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="appointment">
      <div class="appointment__block">
        <img src="https://www.mendeley.com/careers/getasset/c475b7c0-d36c-4c73-be33-a34030b6ca82/">
        <div class="block__text">Jan Iksiński</div>
      </div>
      <div class="appointment__few">
        <div class="appointment__block">
          <i class="fas fa-map-marker-alt"></i>
          <div class="block__text">MedMax Warszawa</div>
        </div>
        <div class="appointment__block">
          <i class="far fa-comment-alt"></i>
          <div class="block__text">Rutynowa kontrola</div>
        </div>
      </div>
      <div class="appointment__when">
        <div class="when__date">
          <i class="fas fa-calendar-day"></i>
          <p>25.10.2019</p>
        </div>
        <div class="when__time">
          <i class="far fa-clock"></i>
          <p>18:30</p>
        </div>
      </div>
      <div class="appointment__block appointment__acceptation acceptation--true">
        <i class="fas fa-check"></i>
      </div>
      <div class="appointment__block appointment__actions">
        <i class="fas fa-ellipsis-h"></i>
        <div class="actions__content">
          <div class="actions__action">
            <i class="fas fa-pen"></i>
          </div>
          <div class="actions__action">
            <i class="fas fa-times"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Appointments"
};
</script>

<style lang="scss" scoped>
@import "../../main";

.appointment {
  margin-bottom: 1.5em;
  width: 100%;
  display: flex;
  font-weight: 600;
  & > div:not(:last-child) {
    margin-right: 1em;
  }
  & > div:first-child {
    font-weight: 700;
    color: #3e3e45;
    width: auto;
    overflow: unset;
    text-overflow: unset;
  }
}

.appointment__block {
  @extend %text--center;
  justify-content: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #67676e;
  cursor: pointer;
  height: 3em;
  width: calc(100% - 2em);
  padding: 1em;
  border-radius: 0.5em;
  box-shadow: 0 0 20px 0px rgba(213, 213, 213, 0.3);
  background: #fafafc;
  &:not(:last-child) {
    transition: all 0.2s ease-in-out;
    &:hover {
      transform: scale(1.05);
      box-shadow: 0 0 60px 0 rgba(145, 145, 156, 0.3);
    }
    &:active {
      transform: scale(1.025);
    }
  }
  i,
  img {
    margin-right: 1em;
  }
  i {
    color: #6a6ee1;
  }
  img {
    height: 100%;
    width: auto;
    border-radius: 1em;
    display: block;
  }
}

.appointment__few {
  display: grid;
  row-gap: 0.5em;
  width: 50%;
  .appointment__block {
    height: auto;
    padding: 0;
    padding-left: 1em;
    padding-right: 1em;
    max-width: 100%;
    overflow: hidden;
    transition: 0.2s ease-in-out;
    white-space: normal;
    .block__text {
      transition: 0.2s ease-in-out;
      background: #fafafc;
      border: 0.5rem solid #fafafc;
      border-left: 0;
      border-right: 1rem solid #fafafc;
      border-top-right-radius: 0.5em;
      border-bottom-right-radius: 0.5em;
    }
    &:hover {
      .block__text {
        background: #fafafc;
      }
    }
    &:last-child {
      cursor: unset;
    }
  }
}

.appointment__when {
  height: 5em;
  width: auto;
  border-radius: 0.5em;
  box-shadow: 0 0 20px 0px rgba(213, 213, 213, 0.3);
  background: #fafafc;
  i {
    margin: 0 1em;
    color: #6a6ee1;
  }
  p {
    color: #67676e;
    margin-right: 1em;
  }
}

.when__date,
.when__time {
  @extend %text--center;
  justify-content: left;
  height: 50%;
  width: 100%;
}

.when__time {
  background: #f5f5f8;
  border-bottom-left-radius: 0.5em;
  border-bottom-right-radius: 0.5em;
}

.appointment__acceptation {
  width: 5em;
  i {
    font-size: 2em;
    margin: auto;
    padding: 0.25em;
  }
}

.appointment__actions {
  position: relative;
  overflow: unset;
  width: 5em;
  transition: 0.2s ease-in-out;
  i {
    font-size: 2em;
    margin: auto;
    padding: 0.25em;
    color: #8a8a92;
  }
  &:hover {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
  &:hover .actions__content {
    box-shadow: 0 20px 60px 0 rgba(145, 145, 156, 0.3);
    visibility: visible;
    opacity: 1;
    z-index: 999999;
  }
}

.actions__content {
  visibility: hidden;
  opacity: 0;
  z-index: 0;
  position: absolute;
  top: 100%;
  right: 0;
  width: 100%;
  transition: 0.2s ease-in-out;
  border-bottom-left-radius: 0.5em;
  border-bottom-right-radius: 0.5em;
  box-shadow: 0 0 20px 0px rgba(213, 213, 213, 0.3);
  background: #fafafc;
  overflow: hidden;
}

.actions__action {
  @extend %text--center;
  height: 5.4rem;
  color: #67676e;
  font-weight: 600;
  transition: 0.2s ease-in-out;
  i {
    transition: 0.2s ease-in-out;
    font-size: 1.5em;
    margin: auto;
    color: #67676e;
  }
  &:hover {
    background: #f5f5f5;
    color: #5356ae;
    &:first-child i {
      color: #5356ae;
    }
    &:last-child i {
      color: #e74c3c;
    }
  }
}
</style>