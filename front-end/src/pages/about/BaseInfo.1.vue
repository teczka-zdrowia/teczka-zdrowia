<template>
  <div class="info--base">
    <div class="base__img">
      <img :src="this.$store.getters.userInfo.img">
      <div class="img__edit" v-if="isEdit">
        <i class="fas fa-camera"></i>
      </div>
    </div>
    <div class="data">
      <div class="data__top">
        <div class="data__name" v-if="!isEdit">{{data.name}} {{data.surname}}</div>
        <div class="data__name--input" v-if="isEdit">
          <input type="text" name="name" v-model="data.name" placeholder="Jan" required>
          <input type="text" name="surname" v-model="data.surname" placeholder="Kowalski" required>
          <input type="text" name="specialization" v-model="data.spec" placeholder="Fizjoterapeuta">
        </div>
        <div class="data__actions">
          <div class="data__action data__edit" v-if="!isEdit" v-on:click="isEdit = true">
            <i class="fas fa-pen"></i>
          </div>
          <div class="data__actions--edit" v-if="isEdit">
            <div class="data__action--edit data__cancel" v-on:click="isEdit = false">
              <i class="fas fa-times"></i>
            </div>
            <div class="data__action--edit data__save">
              <i class="fas fa-check"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="data__more" v-if="!isEdit">
        <div class="more__el">
          <div class="more__title">Urodziny:</div>
          <div class="more__content">{{ userBirthdate }} ({{ userAge }} lat)</div>
        </div>
        <div class="more__el">
          <div class="more__title">PESEL:</div>
          <div class="more__content" v-if="isPESEL">{{ data.pesel }}</div>
          <div class="more__content more__pesel" v-else v-on:click="isPESEL = true">Odkryj</div>
        </div>
        <div class="more__el">
          <div class="more__title">Email:</div>
          <div class="more__content">{{ data.email }}</div>
        </div>
        <div class="more__el">
          <div class="more__title">Telefon:</div>
          <div class="more__content">{{ userPhone }}</div>
        </div>
      </div>
      <div class="data__more" v-if="isEdit">
        <div class="more__el">
          <div class="more__title">Urodziny:</div>
          <div class="more__input">
            <input type="date" name="birthdate" v-model="newData.birthdate" required>
          </div>
        </div>
        <div class="more__el">
          <div class="more__title">PESEL:</div>
          <div class="more__input">
            <input
              type="text"
              name="pesel"
              v-model="newData.pesel"
              placeholder="12345678912"
              required
            >
          </div>
        </div>
        <div class="more__el">
          <div class="more__title">Email:</div>
          <div class="more__input">
            <input
              type="email"
              name="email"
              v-model="newData.email"
              placeholder="jan@kowalski.com"
              required
            >
          </div>
        </div>
        <div class="more__el">
          <div class="more__title">Telefon:</div>
          <div class="more__input">
            <input
              type="tel"
              name="phone"
              v-model="newData.phone"
              placeholder="123654789"
              minlength="9"
              maxlength="15"
              required
            >
          </div>
        </div>
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
  padding: 2em;
  background: #fafafc;
  border-radius: 0.5rem;
  box-shadow: 0 0 20px 0px $lightgrey;
  display: table;
}

.base__img {
  height: 5rem;
  width: 5rem;
  overflow: hidden;
  border-radius: 1em;
  float: left;
  position: relative;
  img {
    height: 100%;
    width: 100%;
    position: absolute;
  }
  @media only screen and (max-width: 800px) {
    margin: 0;
    margin-bottom: 1em;
    margin-left: 10%;
  }
}
.img__edit {
  position: absolute;
  height: 100%;
  width: 100%;
  background: rgba(203, 205, 255, 0.5);
  transition: 0.2s ease-in-out;
  cursor: pointer;
  &:hover {
    background: rgba(203, 205, 255, 0.7);
  }
  i {
    padding: 0.5em;
    right: 0;
    color: #9b9dff;
    border-bottom-left-radius: 0.5em;
    position: absolute;
    background: rgba(203, 205, 255, 0.9);
  }
}
.data {
  width: 80%;
  float: right;
  @media only screen and (max-width: 800px) {
    float: unset;
    margin: auto;
  }
}

.data__top {
  display: flex;
  width: 100%;
}
.data__name {
  @extend %text--overflow;
  font-size: 1.5em;
  font-weight: 700;
  color: #3e3e45;
  display: inline-block;
  width: 75%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.data__name--input {
  display: flex;
  margin-right: 2em;
  input {
    font-weight: 600;
    height: 1.5em;
    border: 5px solid #efefff;
    background: #efefff;
    border-radius: 0.5em;
    margin: -5px;
    text-align: center;
    width: calc(100% - 10px);
    cursor: pointer;
    color: #3e3e45;
    &:first-child,
    &:nth-child(2) {
      margin-right: 5%;
    }
    &:last-child {
      color: #67676e;
    }
  }
}
.data__specialization {
  @extend %text--overflow;
  @extend %text--center;
  font-weight: 600;
  color: #91919c;
  float: right;
}
.data__actions {
  float: right;
  margin-left: auto;
  display: flex;
}

.data__action {
  padding: 0.5em;
  font-size: 0.9em;
  border-radius: 0.5em;
  cursor: pointer;
  display: inline-block;
  margin-left: 1em;
  background: #ececff;
  width: 1em;
  height: 1em;
  i {
    color: #6a6ee1;
    @extend %text--center;
  }
  &:hover {
    background: #ececff;
  }
}
.data__actions--edit {
  font-size: 0.9em;
  border-radius: 0.5em;
  cursor: pointer;
  overflow: hidden;
  display: flex;
  height: auto;
  margin: -2.5px;
}
.data__action--edit {
  padding: 0.5em;
  width: 1em;
  height: 1em;
  background: #ececff;
  i {
    @extend %text--center;
  }
  &:hover {
    background: #ececff;
  }
  &.data__save {
    color: #2ecc71;
  }
  &.data__cancel {
    color: #e74c3c;
    border-right: 0.5px solid rgba(145, 145, 156, 0.3);
  }
}
.data__more {
  font-size: 0.9em;
  margin-top: 1.25em;
  display: grid;
  grid-template-columns: auto auto;
  grid-column-gap: 1em;
  grid-row-gap: 1em;
  @media only screen and (max-width: 800px) {
    grid-template-columns: auto;
    grid-row-gap: 0.5em;
  }
}

.more__el {
  display: flex;
  font-weight: 600;
}

.more__title {
  width: 6em;
  color: #3e3e45;
}
.more__content {
  color: #91919c;
}
.more__pesel {
  border: 5px solid $lightviolet;
  background: $lightviolet;
  color: #fff;
  border-radius: 0.5em;
  margin: -5px auto;
  margin-left: 10%;
  text-align: center;
  width: calc(90% - 10px);
  cursor: pointer;
  @media only screen and (max-width: 800px) {
    width: auto;
    margin-left: 0;
  }
}
.more__input input {
  border: 5px solid #efefff;
  background: #efefff;
  color: #fff;
  border-radius: 0.5em;
  margin: -5px;
  text-align: center;
  width: calc(90% - 10px);
  cursor: pointer;
  color: #91919c;
  font-weight: 600;
}
</style>