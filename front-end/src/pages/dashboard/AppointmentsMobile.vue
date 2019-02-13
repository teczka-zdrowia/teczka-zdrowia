<template>
  <div>
    <div class="appointment" v-for="(item, index) in this.$store.getters.userAppointments">
      <div class="appointment__user">
        <img class="user__img" :src="item.doctor.img">
        <div class="user__name">{{ item.doctor.name }}</div>
        <div class="user__specialization">{{ item.doctor.spec }}</div>
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
    </div>
  </div>
</template>

<script>
export default {
  name: "AppointmentsMobile"
};
</script>

<style lang="scss" scoped>
@import "../../main";

.appointment {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #67676e;
  cursor: pointer;
  height: 5em;
  width: 100%;
  border-radius: 0.5em;
  -webkit-box-shadow: 0 0 20px 0px rgba(213, 213, 213, 0.3);
  box-shadow: 0 0 20px 0px rgba(213, 213, 213, 0.3);
  background: #fafafc;
  transition: all 0.2s ease-in-out;
  display: flex;
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 0 60px 0 rgba(145, 145, 156, 0.3);
  }
  &:active {
    transform: scale(1.025);
  }
  &:not(:last-child) {
    margin-bottom: 1em;
  }
}

.appointment__user {
  display: grid;
  grid-template-columns: 5rem auto;
  grid-template-areas:
    "img name"
    "img spec";
  grid-column-gap: 1em;
  height: 5rem;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  width: 100%;
}

.user__img {
  grid-area: img;
  height: 4rem;
  margin: auto;
  transition: 0.2s ease-in-out;
  border-radius: 1rem;
  -webkit-filter: drop-shadow(0 0 10px rgba(213, 213, 213, 0.3));
  filter: drop-shadow(0 0 10px rgba(213, 213, 213, 0.3));
}

.user__name {
  @extend %text--center;
  grid-area: name;
  font-weight: 700;
  color: #3e3e45;
  justify-content: left;
  max-width: 10em;
}
.user__specialization {
  @extend %text--center;
  grid-area: spec;
  font-weight: 600;
  color: #67676e;
  justify-content: left;
}

.appointment__when {
  height: 100%;
  width: 100%;
  max-width: 9em;
  margin-left: auto;
  background: #f5f5f8;
  font-weight: 600;
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

@media only screen and (max-width: 425px) {
  .appointment {
    display: block;
    height: auto;
  }
  .appointment__when {
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: unset;
  }
  .user__img {
    height: 3.5em;
  }
}
</style>