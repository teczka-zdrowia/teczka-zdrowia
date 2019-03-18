<template>
  <div>
    <div class="list__el">
      <div class="list__info">
        <div class="list__info__el list__info__el--user">
          <img class="user__img" :src="data.doctor.img">
          <div class="user__name">{{ data.doctor.name }}</div>
          <div class="user__phone">
            <a :href="`tel:11222333`">
              <i class="fas fa-phone"></i>
              Zadzwoń
            </a>
          </div>
        </div>
        <div class="list__info__el list__info__el--column">
          <div class="list__info__el list__info__el--date">25.10.2019</div>
          <div class="list__info__el--line"></div>
          <div class="list__info__el list__info__el--place">MedMax Warszawa</div>
        </div>
      </div>
      <div class="list__more" v-on:click="data.isOpened = !data.isOpened">
        <div class="list__btn">
          <i class="fas" v-bind:class="[data.isOpened ? 'fa-angle-up' : 'fa-angle-down']"></i>
        </div>
      </div>
    </div>
    <div class="more__container" v-if="data.isOpened">
      <div class="more__content">
        <div class="more__column more__column--left">
          <div class="more__row">
            <div class="more__row__title">Notatka</div>
            <div
              class="more__row__text"
            >Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.</div>
          </div>
          <div class="more__row">
            <div class="more__row__title">Zabiegi</div>
            <div
              class="more__row__text"
            >Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.</div>
          </div>
        </div>
        <div class="more__column more__column--right">
          <div class="more__row">
            <div class="more__row__title">Zalecenia</div>
            <div class="more__row__prescription">
              <i class="fas fa-prescription"></i>
              <div class="prescription__content">
                <div class="prescription__title">Tytuł</div>
                <div class="prescription__info">Opis</div>
              </div>
              <div class="prescription__time">5 dni</div>
            </div>
            <div class="more__row__prescription">
              <i class="fas fa-prescription"></i>
              <div class="prescription__content">
                <div class="prescription__title">Sport</div>
                <div class="prescription__info">1h • każdego dnia</div>
              </div>
              <div class="prescription__time">Czas nieokreślony</div>
            </div>
            <div class="more__row__prescription">
              <i class="fas fa-prescription"></i>
              <div class="prescription__content">
                <div class="prescription__title">Sport</div>
                <div class="prescription__info">1h • każdego dnia</div>
              </div>
              <div class="prescription__time">15 dni</div>
            </div>
          </div>
          <div class="more__row">
            <div class="more__row__title">Załączniki</div>
            <div class="more__row__attachments">
              <div class="more__row__attachment">
                <i class="fas fa-paperclip"></i>
                Załącznik A
              </div>
              <div class="more__row__attachment">
                <i class="fas fa-paperclip"></i>
                Załącznik B
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="more__content more__content--actions">
        <img
          class="more__signature"
          src="https://upload.wikimedia.org/wikipedia/en/thumb/a/a2/Signature_of_Vishwanathan_Anand.svg/1280px-Signature_of_Vishwanathan_Anand.svg.png"
          title="Podpis pacjenta"
          alt="Podpis pacjenta"
        >
        <div class="more__print">
          <i class="fas fa-print"></i>
          Drukuj
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MainBtn from "../basic/MainBtn";

export default {
  name: "HistoryElement",
  props: ["data"],
  components: {
    MainBtn: MainBtn
  }
};
</script>

<style lang="scss" scoped>
@import "../../../main";

.history__list > div:last-child {
  margin-bottom: 2em;
}

.list__el {
  height: 5.5em;
  display: flex;
  justify-content: space-between;
  margin-bottom: 1em;
}

.list__info {
  width: 100%;
  margin-right: 1rem;
  padding: 1em;
  border-radius: 0.5em;
  font-weight: 600;
  box-shadow: 0 0 20px 0px rgba(213, 213, 213, 0.3);
  background: #fafafc;
  color: #67676e;
  display: flex;
  align-items: center;
  overflow: hidden;
}

.list__more {
  @extend %text--center;
  width: 3.5rem;
  min-width: 3.5rem;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 20px 0px rgba(213, 213, 213, 0.3);
  background: #fafafc;
  color: #3e3e45;
  font-size: 2rem;
  cursor: pointer;
  transition: 0.2s ease-in-out;
}

.list__info__el {
  &:not(:first-child) {
    padding-left: 1rem;
  }
  &:not(:last-child) {
    padding-right: 1rem;
    border-right: 1px solid rgba(0, 0, 0, 0.1);
  }
  &--column {
    display: flex;
    align-items: center;
    height: 100%;
    .list__info__el {
      height: auto;
      padding: 0;
      border-right: 0;
      &--line {
        width: 1px;
        height: 100%;
        background: rgba(0, 0, 0, 0.1);
        margin: 0 1rem;
      }
    }
  }
}

.list__info__el--user {
  display: grid;
  grid-template-columns: 3.5rem auto;
  grid-template-areas:
    "img name"
    "img phone";
  grid-column-gap: 1em;
  height: 3.5rem;
  cursor: pointer;
  transition: 0.2s ease-in-out;
}

.user__img {
  grid-area: img;
  height: 100%;
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
}

.user__phone {
  @extend %text--center;
  grid-area: phone;
  font-weight: 600;
  -webkit-box-pack: left;
  -ms-flex-pack: left;
  justify-content: left;
  border-radius: 0.5rem;
  background: #27ae60;
  color: #fff;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  height: 2rem;
  width: 8rem;
  margin: auto;
  margin-left: 0;
  margin-top: 0;
  a {
    color: #fff;
    margin: auto;
  }
  i {
    margin-right: 0.5rem;
  }
}

.more__container {
  margin-bottom: 1rem;
  border-radius: 0.5rem;
  overflow: hidden;
}

.more__content {
  width: calc(100% - 2em);
  padding: 1em;
  height: auto;
  box-shadow: 0 0 20px 0px rgba(213, 213, 213, 0.3);
  background: #fafafc;
  font-weight: 600;
  color: #67676e;
  display: flex;
  &--actions {
    background: #f5f5f8;
    justify-content: space-between;
  }
}

.more__column {
  &--left {
    width: 66%;
    padding-right: 1rem;
    border-right: 1px solid rgba(0, 0, 0, 0.1);
  }
  &--right {
    width: 33%;
    padding-left: 1rem;
  }
}

.more__row {
  display: block;
  margin-bottom: auto;
  &:not(:last-child) {
    padding-bottom: 1rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
  &:not(:first-child) {
    padding-top: 1rem;
  }
}

.more__row__title {
  font-weight: 700;
  color: #3e3e45;
  margin-bottom: 1em;
}
.more__row__text {
  white-space: pre-wrap;
  line-height: 1.2;
}
.more__row__attachments {
  display: block;
}
.more__row__attachment {
  @extend %text--center;
  justify-content: left;
  transition: ease-in-out 0.2s;
  border-radius: 0.5em;
  overflow: hidden;
  cursor: pointer;
  i {
    margin-left: 0;
    margin-right: 1rem;
    padding: 0.5em;
    font-size: 1.5em;
    color: #6a6ee1;
    background: #eeeef3;
    border-radius: 0.5em;
  }
  &:not(:last-child) {
    margin-bottom: 1em;
  }
  &:hover {
    background: #eeeef3;
  }
}
.more__row__prescription {
  width: 100%;
  font-weight: 600;
  display: grid;
  grid-template-columns: 3rem auto;
  grid-template-areas:
    "icon info"
    "time time";
  grid-column-gap: 1em;
  grid-row-gap: 0.5rem;
  & > i {
    grid-area: icon;
    margin-right: 1rem;
    padding: 0.5em;
    font-size: 1.5em;
    width: 1em;
    height: 1em;
    text-align: center;
    color: #6a6ee1;
    background: #eeeef3;
    border-radius: 0.5em;
  }
  &:not(:last-child) {
    margin-bottom: 1.5rem;
  }
}

.prescription__content {
  grid-area: info;
  height: calc(100% - 0.5rem);
  white-space: normal;
  display: flex;
  flex-direction: column;
  margin: 0.25rem 0;
}

.prescription__title {
  font-weight: 700;
  color: #3e3e45;
  margin-bottom: 0.25em;
}

.prescription__info {
  color: #67676e;
}

.prescription__time {
  @extend %text--center;
  grid-area: time;
  border-radius: 0.5rem;
  padding: 0.5rem;
  background: #eeeef3;
  color: #3e3e45;
  font-weight: 600;
  max-width: 100%;
  min-width: 9.5em;
  span {
    margin: 0 6px;
    color: #3e3e45;
    font-weight: 700;
  }
}

.more__signature {
  @extend %text--center;
  height: 2rem;
  width: auto;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background: #eeeef3;
}

.more__print {
  @extend %text--center;
  background: #eeeef3;
  color: #3e3e45;
  font-weight: 600;
  padding: 0 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  i {
    margin-right: 0.5rem;
  }
}

@media only screen and (max-width: 960px) {
  .more__content {
    display: block;
    &--actions {
      display: flex;
    }
  }
  .more__column {
    &--left {
      width: 100%;
      padding-right: 0;
      padding-bottom: 1rem;
      border-right: 0;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }
    &--right {
      width: 100%;
      padding-left: 0;
      padding-top: 1rem;
    }
  }
}

@media only screen and (max-width: 650px) {
  .list__el {
    height: 10rem;
  }
  .list__info {
    display: block;
  }
  .list__info__el:not(:last-child) {
    border-right: 0;
    padding-right: 0;
  }
  .list__info__el--line {
    display: none;
  }
  .list__info__el--column {
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    margin-top: 1rem;
    height: 2.5rem;
    background: #f5f5f8;
    padding: 1rem;
    margin-left: -1rem;
    width: 100%;
    .list__info__el {
      &::before {
        content: "";
        font-family: "Font Awesome 5 Free";
        color: #6a6ee1;
        margin-right: 1rem;
      }
      &:first-child::before {
        content: "\f783";
      }
      &:last-child::before {
        content: "\f3c5";
      }
    }
  }
}
</style>