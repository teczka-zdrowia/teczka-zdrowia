<template>
  <div>
    <div class="appointment" v-for="(item, index) in this.$store.getters.userAppointments">
      <div class="appointment__user">
        <img class="user__img" :src="item.doctor.img">
        <div class="user__name">{{ item.doctor.name }}</div>
        <div class="user__specialization">{{ item.doctor.spec }}</div>
      </div>
      <div class="appointment__content">
        <div class="content__el">
          <i class="fas fa-map-marker-alt"></i>
          {{ item.place }}
        </div>
        <div class="content__few">
          <div class="content__el">
            <i class="fas fa-calendar-day"></i>
            {{ item.date }}
          </div>
          <div class="content__el">
            <i class="far fa-clock"></i>
            {{ item.time }}
          </div>
        </div>
        <div class="content__el">
          <i class="far fa-comment-alt"></i>
          {{ item.desc }}
        </div>
      </div>
      <div class="appointment__actions">
        <MainBtn
          class="appointment__btn appointment__btn--accept"
          v-on:click="updateAcceptation(true)"
        >
          <i class="fa-check-circle" v-bind:class="[item.isAccepted == true ? 'fas' : 'far']"></i>
        </MainBtn>
        <MainBtn
          class="appointment__btn appointment__btn--cancel"
          v-on:click="updateAcceptation(false)"
        >
          <i class="fa-times-circle" v-bind:class="[item.isAccepted == false ? 'fas' : 'far']"></i>
        </MainBtn>
      </div>
    </div>
  </div>
</template>

<script>
import MainBtn from "../../components/ui/MainBtn";

export default {
  name: "Appointments",
  components: {
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
@import "../../main";

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

.appointment__user {
  display: grid;
  grid-template-columns: 3.5em auto;
  grid-template-areas:
    "img name"
    "img spec";
  grid-column-gap: 1em;
  height: 3.5em;
}

.user__img {
  grid-area: img;
  height: 3.5em;
  border-radius: 1em;
  -webkit-filter: drop-shadow(0 0 10px rgba(213, 213, 213, 0.3));
  filter: drop-shadow(0 0 10px rgba(213, 213, 213, 0.3));
}
.user__name {
  @extend %text--center;
  grid-area: name;
  font-weight: 700;
  color: #3e3e45;
  justify-content: left;
}
.user__specialization {
  @extend %text--center;
  grid-area: spec;
  font-weight: 600;
  color: #67676e;
  justify-content: left;
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
  background: #f7f7ff;
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
  justify-content: space-around;
}

.appointment__btn {
  @extend %text--center;
  padding: 0.75em;
  display: flex;
  font-weight: 700;
  border-radius: 3em;
  background: #ededff;
  i {
    @extend %text--center;
    font-size: 1.5em;
  }
  &--accept {
    color: $darkviolet;
  }
  &--cancel {
    color: #e74c3c;
  }
}
</style>