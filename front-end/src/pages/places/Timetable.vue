<template>
  <div>
    <div class="actions__options">
      <MainBtn class="options__btn options__btn--options" v-if="isMobile">
        <i class="fas fa-cog"></i>
        Opcje
      </MainBtn>
      <div class="actions__options--desktop" v-if="!isMobile">
        <div class="options__types">
          <MainBtn
            v-on:click.native="showUpcoming = true"
            v-bind:class="[showUpcoming == true ? 'active' : '']"
          >Nadchodzące</MainBtn>
          <MainBtn
            v-on:click.native="showUpcoming = false"
            v-bind:class="[showUpcoming == false ? 'active' : '']"
          >Minione</MainBtn>
        </div>
        <div class="options__select">
          <div class="select__title">Sortuj przez:</div>
          <select class="select__content">
            <option selected>Data</option>
            <option>Specjalista</option>
            <option>Gabinet</option>
            <option>Opis</option>
          </select>
        </div>
      </div>
    </div>
    <div class="appointment" v-for="(item, index) in this.$store.getters.userAppointments">
      <div class="appointment__user">
        <img class="user__img" :src="item.doctor.img">
        <div class="user__name">{{ item.doctor.name }}</div>
      </div>
      <div class="appointment__doctor">
        <div class="doctor__title">
          <p>Dodano przez:</p>
        </div>
        <div class="doctor__name">
          <p>Ola Długonazwiskowa</p>
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
    </div>
  </div>
</template>

<script>
import MainBtn from "../../components/ui/MainBtn";

export default {
  name: "AppointmentsMobile",
  data: function() {
    return {
      showUpcoming: true
    };
  },
  components: {
    MainBtn
  },
  computed: {
    isMobile: function() {
      return this.$store.getters.window.width < 960;
    }
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
  &--desktop {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 0;
  }
}

.options__btn {
  padding: 1rem 0 !important;
  width: 100% !important;
  background: #e6e6e8 !important;
  color: #6a6ee1 !important;
  i {
    transition: transform 0.2s ease-in-out;
    margin-right: 0.75rem;
  }
  &:hover {
    i {
      transform: rotate(90deg);
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
  padding: 1rem;
  background: #fafafc;
  color: #6a6ee1;
  font-weight: 600;
}
.select__content {
  font-weight: 600;
  padding: 1rem;
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
  grid-template-areas: "img name";
  grid-column-gap: 1em;
  height: 5rem;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  width: 100%;
}

.user__img {
  grid-area: img;
  height: 3.5rem;
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
  margin-top: auto;
  margin-bottom: 0.33em;
  height: 100%;
}

.user__specialization {
  @extend %text--center;
  grid-area: spec;
  font-weight: 600;
  color: #67676e;
  justify-content: left;
  margin-bottom: auto;
  margin-top: 0.33em;
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

.appointment__doctor {
  height: 100%;
  width: 100%;
  max-width: 14em;
  margin-left: 1rem;
  background: #eeeef3;
  font-weight: 600;
  p {
    color: #67676e;
    margin: 1rem 1rem;
  }
}

.doctor__title p {
  color: #3e3e45;
}

.doctor__name p {
  white-space: normal;
  word-break: break-all;
}

.doctor__title,
.doctor__name {
  @extend %text--center;
  height: 50%;
  width: 100%;
}

.options__types {
  display: flex;
  button {
    background: #eeeef3;
    color: #6a6ee1;
    border-radius: 0.5rem;
    &:hover {
      color: $primrary-light;
      background: $darkviolet;
      background: linear-gradient(to right, $lightviolet, $darkviolet);
      filter: drop-shadow(0 0 10px $lightgrey);
    }
    &:first-child {
      margin-right: 1em;
    }
    &.active {
      color: $primrary-light;
      background: $darkviolet;
      background: linear-gradient(to right, $lightviolet, $darkviolet);
      filter: drop-shadow(0 0 10px $lightgrey);
      transition: 0.2s ease-in-out;
      background-position: right center;
    }
  }
}

@media only screen and (max-width: 720px) {
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
  .appointment__doctor {
    display: flex;
    width: 100%;
    max-width: unset;
    margin-left: 0;
    .doctor__title {
      width: auto;
      p {
        margin: 0.75rem 0.75rem;
      }
    }
    p {
      margin: 0.75rem 0;
    }
  }
}
</style>