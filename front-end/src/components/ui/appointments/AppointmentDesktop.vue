<template>
  <div class="appointment">
    <MainUserInfo class="list__info__el" :name="data.doctor.name" :img="data.doctor.img" :phone="data.doctor.phone" :isBig="true" :isBigPhone="true" :userId="1"/>
    <div class="appointment__content">
      <div class="content__el">
        <i class="fas fa-map-marker-alt"></i>
        {{ data.place }}
      </div>
      <div class="content__few">
        <div class="content__el">
          <i class="fas fa-calendar-day"></i>
          {{ data.date }}
        </div>
        <div class="content__el">
          <i class="far fa-clock"></i>
          {{ data.time }}
        </div>
      </div>
      <div class="content__el">
        <i class="far fa-comment-alt"></i>
        {{ data.desc }}
      </div>
    </div>
    <div class="appointment__actions">
      <MainBtn
        class="appointment__btn"
        v-bind:class="[data.isAccepted == true ? 'appointment__btn--accepted' : '']"
        v-on:click="updateAcceptation(true)"
      >Będę</MainBtn>
      <MainBtn
        class="appointment__btn"
        v-bind:class="[data.isAccepted == false ? 'appointment__btn--cancelled' : '']"
        v-on:click="updateAcceptation(false)"
      >Nie będę</MainBtn>
    </div>
  </div>
</template>

<script>
import MainBtn from "../basic/MainBtn";
import MainUserInfo from "../basic/MainUserInfo";

export default {
  props: ["data"],
  name: "AppointmentDekstop",
  components: {
    MainUserInfo,
    MainBtn
  },
  methods: {
    updateAcceptation: function(val) {
      //TO DO
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../main";

.appointment {
  padding: 1em;
  border-radius: 0.5em;
  box-shadow: 0 0 20px 0px rgba(213, 213, 213, 0.3);
  background: #fff;
  width: 100%;
  &:not(:last-child) {
    margin-right: 1em;
  }
}

.appointments__more {
  width: 100%;
  button {
    width: 100%;
    padding: 1em;
    border-radius: 0.5em;
    box-shadow: 0 0 20px 0px rgba(213, 213, 213, 0.3);
    background: #eeeef3 !important;
    color: #6a6ee1 !important;
  }
}

.appointment__content {
  margin-top: 2em;
  margin-bottom: 1em;
  text-align: center;
}

.content__few {
  width: 100%;
  display: flex;
  div {
    justify-content: center;
  }
  div:first-child {
    margin-right: 1em;
  }
  @media only screen and (max-width: 480px) {
    i {
      display: none;
    }
  }
}
.content__el {
  @extend %text--center;
  text-align: left;
  justify-content: left;
  padding: 1em;
  background: #fafafc;
  display: inline-flex;
  width: auto;
  font-weight: 600;
  color: #3e3e45;
  border-radius: 1em;
  margin-bottom: 1em;
  width: calc(100% - 2em);
  i {
    color: $darkviolet;
    margin-right: 10px;
  }
}

.appointment__actions {
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 0.5em;
}

.appointment__btn {
  @extend %text--center;
  padding: 0.75em;
  display: flex;
  font-weight: 700;
  background: #eeeef3;
  color: #67676e;
  border-radius: 0;
  filter: none;
  i {
    @extend %text--center;
    font-size: 1.5em;
    margin-right: 0.7rem;
  }
  &--accepted {
    background: $darkviolet;
    color: #fafafa;
  }
  &--cancelled {
    background: #e74c3c;
    color: #fafafa;
  }
}

@media only screen and (max-width: 800px) {
  .appointment {
    width: calc(100% - 2em);
    max-width: 100%;
  }
}
</style>