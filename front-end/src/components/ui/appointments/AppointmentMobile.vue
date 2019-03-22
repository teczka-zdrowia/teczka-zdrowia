<template>
  <div class="appointment">
    <MainUserInfo class="appointments__user" :name="data.doctor.name" :img="data.doctor.img" :phone="data.doctor.phone" :isClickable="false" 
     :userId="1"/>
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
</template>

<script>
import MainBtn from "../basic/MainBtn";
import MainUserInfo from "../basic/MainUserInfo";

export default {
  name: "AppointmentsMobile",
  props: ["data"],
  components: {
    MainUserInfo,
    MainBtn
  }
};
</script>

<style lang="scss" scoped>
@import "../../../main";

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

.appointments__more {
  background: #eeeef3 !important;
  color: #6a6ee1 !important;
  width: 100% !important;
  height: 3em !important;
}

.appointments__user {
  grid-template-columns: 5rem auto !important;
  height: 5rem !important;
  .user__img {
    height: 4rem !important;
  }
}

@media only screen and (max-width: 520px) {
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
    height: 3.5em !important;
  }
}
</style>