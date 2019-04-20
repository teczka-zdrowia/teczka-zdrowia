<template>
  <div
    class="appointment"
    v-bind:class="{ noborders: hideBorders }"
  >
    <MainUserInfo
      class="list__info__el"
      :name="data.doctor.name"
      :img="data.doctor.img"
      :phone="data.doctor.phone"
      :isBig="true"
      :isBigPhone="true"
      :userId="1"
    />
    <div class="appointment__content">
      <MainPlaceInfo
        class="content__el"
        :name="data.place.name"
        :id="data.place.id"
      />
      <div class="content__few">
        <div class="content__el">
          <span
            aria-hidden="true"
            class="fas fa-calendar-day"
          />
          {{ data.date }}
        </div>
        <div class="content__el">
          <span
            aria-hidden="true"
            class="far fa-clock"
          />
          {{ data.time }}
        </div>
      </div>
      <div class="content__el">
        <span
          aria-hidden="true"
          class="far fa-comment-alt"
        />
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
import MainPlaceInfo from "../basic/MainPlaceInfo";

export default {
  props: {
    data: {
      type: Object
    },
    hideBorders: {
      type: Boolean,
      default: false
    }
  },
  name: "AppointmentDekstop",
  components: {
    MainPlaceInfo,
    MainUserInfo,
    MainBtn
  },
  methods: {
    updateAcceptation: function(val) {
      this.data.isAccepted = val;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../main";

.appointment {
  padding: 1rem;
  border-radius: 0.5em;
  box-shadow: 0 0 20px 0px rgba(213, 213, 213, 0.3);
  background: #fff;
  width: calc(100% - 2rem);
  &.noborders {
    padding: 0;
    border-radius: 0;
    box-shadow: none;
    background: transparent;
    width: 100%;
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
  border-radius: 1rem;
  width: calc(100% - 2em);
  margin-bottom: 1rem;
  span {
    color: $darkviolet;
    margin-right: 10px;
  }
}

.appointment__actions {
  width: 100%;
  display: flex;
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
  width: 100%;
  span {
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