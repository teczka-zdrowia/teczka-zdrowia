<template>
  <div>
    <div
      class="more__container"
      v-if="more.isLoading"
    >
      <div class="more__content">
        Ładowanie (w dev wersji symulowane)
      </div>
    </div>
    <div
      class="more__container"
      v-if="!more.isLoading"
    >
      <div class="more__content">
        <div class="more__column more__column--left">
          <div class="more__row">
            <div class="more__row__title">Notatka</div>
            <div class="more__row__text">{{ more.note }}</div>
          </div>
          <div class="more__row">
            <div class="more__row__title">Zabiegi</div>
            <div class="more__row__text">{{ more.treatments }}</div>
          </div>
        </div>
        <div class="more__column more__column--right">
          <div class="more__row">
            <div class="more__row__title">Zalecenia</div>
            <MainPrescription
              v-for="prescription in more.prescriptions"
              :key="prescription.id"
              :prescriptionId="prescription.id"
              :title="prescription.title"
              :info="prescription.info"
              :days="prescription.days"
              :showCancelBtn="false"
              :isTimeleft="false"
            />
          </div>
          <div class="more__row">
            <div class="more__row__title">Załączniki</div>
            <div class="more__row__attachments">
              <div
                class="more__row__attachment"
                v-for="attachment in more.attachments"
                :key="attachment.id"
              >
                <span
                  aria-hidden="true"
                  class="fas fa-paperclip"
                />
                {{ attachment.name }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="more__content more__content--actions">
        <img
          class="more__signature"
          :src="more.signature"
          title="Podpis pacjenta"
          alt="Podpis pacjenta"
        >
        <div class="more__print">
          <span
            aria-hidden="true"
            class="fas fa-print"
          />
          Drukuj
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MainBtn from "../basic/MainBtn";
import MainUserInfo from "../basic/MainUserInfo";
import MainPrescription from "../basic/MainPrescription";
import MainPlaceInfo from "../basic/MainPlaceInfo";

import { mapGetters } from "vuex";

export default {
  name: "HistoryElement",
  props: {
    more: {
      type: Object
    }
  },
  components: {
    MainPrescription,
    MainPlaceInfo,
    MainUserInfo,
    MainBtn
  },
  computed: {
    ...mapGetters({
      isMobile: "window/isMobile"
    })
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
  span {
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
  & > span {
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
  span {
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
    height: 11rem;
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
    height: 3rem;
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
      &:last-child {
        &::before {
          content: none;
        }
        & > div {
          color: #67676e !important;
          padding: 0.5rem;
          margin: -0.5rem;
          margin-top: 0.25rem;
        }
      }
    }
  }
}
</style>