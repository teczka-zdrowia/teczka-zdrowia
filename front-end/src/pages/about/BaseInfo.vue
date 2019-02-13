<template>
  <div class="info--base">
    <div class="base__top">
      <img class="user__img" :src="this.$store.getters.userInfo.img">
      <div class="user__name">{{data.name}} {{data.surname}}</div>
      <div class="user__specialization">{{ this.$store.getters.userInfo.spec }}</div>
    </div>
    <div class="base__more">
      <div class="more__el">
        <div class="more__title">
          <i class="fas fa-birthday-cake"></i>
          <span>Urodziny</span>
        </div>
        <div class="more__content">{{ userBirthdate }} ({{ userAge }} lat)</div>
      </div>
      <div class="more__el">
        <div class="more__title">
          <i class="fas fa-at"></i>
          <span>Email</span>
        </div>
        <div class="more__content">{{ data.email }}</div>
      </div>
      <div class="more__el">
        <div class="more__title">
          <i class="fas fa-phone"></i>
          <span>Telefon</span>
        </div>
        <div class="more__content">{{ userPhone }}</div>
      </div>
      <div class="more__el">
        <div class="more__title">
          <i class="fas fa-id-card-alt"></i>
          <span>PESEL</span>
        </div>
        <div class="more__content" v-if="isPESEL">{{ data.pesel }}</div>
        <div class="more__content more__pesel" v-else v-on:click="isPESEL = true">Odkryj</div>
      </div>
    </div>
  </div>
</template>

<script>
let moment = require("moment");
moment.locale("pl");

export default {
  name: "BaseInfo",
  data: function() {
    return {
      isEdit: false,
      isPESEL: false,
      data: {},
      newData: {}
    };
  },
  mounted() {
    this.data = Object.assign({}, this.$store.getters.userInfo);
  },
  watch: {
    isEdit: function(val) {
      if (val == true) {
        this.newData = Object.assign({}, this.data);
        this.newData.birthdate = moment(
          this.newData.birthdate,
          "YYYY-MM-DD HH:MI:SS"
        ).format("YYYY-MM-DD");
      }
    }
  },
  computed: {
    userPhone: function() {
      if (this.data.phone)
        return this.data.phone.replace(
          /(\d{1,3})(\d{1,3})(\d{1,4})/g,
          "$1 $2 $3"
        );
    },
    userAge: function() {
      return Math.abs(
        moment(this.userBirthdate, "DD.MM.YYYY").diff(moment(), "years")
      );
    },
    userBirthdate: function() {
      return moment(this.data.birthdate, "YYYY-MM-DD HH:MI:SS").format(
        "DD.MM.YYYY"
      );
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../main";

input[type="date"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  display: none;
}

::-webkit-clear-button {
  display: none;
  -webkit-appearance: none;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.info--base {
  width: 66%;
  padding: 2rem;
  background: #fafafc;
  border-radius: 0.5rem;
  box-shadow: 0 0 20px 0px $lightgrey;
  display: table;
}

.base__top {
  display: grid;
  grid-template-columns: 4rem auto;
  grid-template-areas:
    "img name"
    "img spec";
  grid-column-gap: 1em;
  height: 4rem;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  width: 100%;
  font-size: 1.25em;
  margin-bottom: 1em;
}

.user__img {
  grid-area: img;
  height: 4rem;
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
}
.user__specialization {
  @extend %text--center;
  grid-area: spec;
  font-weight: 600;
  color: #67676e;
  justify-content: left;
}

@media only screen and (max-width: 959px) {
  .info--base {
    padding: 1.5rem;
    width: calc(100% - 3rem);
    margin-bottom: 1em;
  }
}

/* --- MF --- */

.base__more {
}

.more__el {
  width: 100%;
  display: flex;
  border-radius: 0.5rem;
  overflow: hidden;
  &:not(:last-child) {
    margin-bottom: 1em;
  }
}

.more__title,
.more__content {
  padding: 1rem;
  font-weight: 600;
}

.more__title {
  @extend %text--center;
  justify-content: left;
  width: 1.5rem;
  background: #9394eb;
  color: #fafafc;
  span {
    display: none;
  }
}

.more__content {
  width: calc(100% - 3rem);
  background: #ececff;
  color: #91919c;
  &.more__pesel {
    @extend %text--center;
    background: #9394eb;
    color: #fafafc;
    cursor: pointer;
  }
}

@media only screen and (min-width: 425px) {
  .more__title {
    width: 7rem;
    i {
      margin-right: 0.75em;
    }
    span {
      display: unset;
    }
  }
  .more__content {
    width: calc(100% - 11rem);
  }
}
</style>