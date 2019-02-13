<template>
  <div class="history__list">
    <div v-for="(item, index) in this.$store.getters.userHistory">
      <div class="list__el">
        <div class="list__doctor">
          <img class="doctor__img" :src="item.doctor.img">
          <div class="doctor__name">{{ item.doctor.name }}</div>
        </div>
        <div class="list__specialization">{{ item.doctor.spec }}</div>
        <div class="list__date">
          <i class="fas fa-calendar-day"></i>
          {{ item.date }}
        </div>
        <div class="list__place">
          <i class="fas fa-map-marker-alt"></i>
          {{ item.place }}
        </div>
        <div class="list__desc">
          <i class="far fa-comment-alt"></i>
          {{ item.desc }}
        </div>
        <div class="list__more" v-bind:class="[item.isOpened ? 'more--violet' : 'more--white']">
          <div class="list__btn" v-on:click="item.isOpened = !item.isOpened">
            <i class="fas" v-bind:class="[item.isOpened ? 'fa-angle-up' : 'fa-angle-down']"></i>
          </div>
        </div>
      </div>
      <div class="list__el more__container" v-if="item.isOpened">
        <div class="more__summary">
          <div class="summary__el">
            <i class="fas fa-calendar-day"></i>
            {{ item.date }}
          </div>
          <div class="summary__el">
            <i class="fas fa-map-marker-alt"></i>
            {{ item.place }}
          </div>
          <div class="summary__few">
            <div class="summary__signature">
              BRAK PODPISU
              <img
                title="Podpis"
                class="signature--img"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2WmyvFYCME_v23yZc4iECWn1voD1f7y2N637KJGY2VJVDk617"
              >
            </div>
            <div class="summary__print" title="Drukuj">
              <i class="fas fa-print"></i>
            </div>
          </div>
        </div>
        <div class="more__content">
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
          <div class="more__row">
            <div class="more__row__title">Zalecenia</div>
            <div class="more__row__prescription">
              <i class="fas fa-prescription"></i>
              <div class="prescription__content">
                <div class="prescription__title">Witamina C</div>
                <div class="prescription__info">5mg • 2x dziennie</div>
              </div>
            </div>
            <div class="more__row__prescription">
              <i class="fas fa-prescription"></i>
              <div class="prescription__content">
                <div class="prescription__title">Sport</div>
                <div class="prescription__info">1h • każdego dnia</div>
              </div>
            </div>
            <div class="more__row__prescription">
              <i class="fas fa-prescription"></i>
              <div class="prescription__content">
                <div class="prescription__title">Sport</div>
                <div class="prescription__info">1h • każdego dnia</div>
              </div>
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
    </div>
    <div class="list__actions">
      <div class="list__previous">Poprzednia</div>
      <div class="list__next">
        <MainBtn>Następna</MainBtn>
      </div>
    </div>
  </div>

  <!--

  !!! !!! !!!

  HISTORY ELEMENTS PRZEPROJEKOWAĆ
  NA WZÓR PANEL.VUE

  !!! !!! !!!

  -->
</template>

<script>
import MainBtn from "../../components/ui/MainBtn";

export default {
  name: "HistoryElements",
  components: {
    MainBtn: MainBtn
  }
};
</script>

<style lang="scss" scoped>
@import "../../main";

.history__list > div:last-child {
  margin-bottom: 2em;
}

.list__el {
  width: calc(100% - 2em);
  padding: 1em;
  border-radius: 0.5em;
  box-shadow: 0 0 20px 0px rgba(213, 213, 213, 0.3);
  background: #fafafc;
  height: 3.5em;
  display: flex;
  margin-bottom: 1em;
  & > div {
    @extend %text--center;
    font-weight: 600;
    color: #67676e;
    justify-content: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    i {
      margin-left: 1em;
      margin-right: 1em;
      color: $darkviolet;
    }
  }
  .list__doctor {
    min-width: auto;
    padding-right: 1em;
    overflow: inherit;
    height: 100%;
    display: flex;
    justify-content: left;
    .doctor__img {
      height: 100%;
      width: auto;
      border-radius: 1em;
      display: block;
    }
    .doctor__name {
      font-weight: 700;
      color: #3e3e45;
      margin-left: 2em;
    }
  }
  .list__specialization {
    margin-left: 1em;
    color: #91919c;
    width: 33%;
  }
  .list__date {
    width: 66%;
    max-width: 9em;
  }
  .list__place {
    width: 66%;
  }
  .list__desc {
    width: 66%;
  }
  .list__more {
    width: 3.5em;
    min-width: 3.5em;
    max-width: 3.5em;
    margin-left: auto;
    .list__btn {
      @extend %text--center;
      padding: 0.5em;
      border-radius: 0.5rem;
      width: 2em;
      height: 2em;
      transition: 0.2s ease-in-out;
      cursor: pointer;
      i {
        font-size: 1.5em;
        margin-left: 1em;
        margin-right: 1em;
      }
    }
    &.more--white {
      .list__btn {
        background: #f0f0ff;
        i {
          color: #6a6ee1;
        }
        &:hover {
          background: #ececff;
        }
      }
    }
    &.more--violet {
      .list__btn {
        background: $darkviolet;
        background: linear-gradient(to right, $lightviolet, $darkviolet);
        filter: drop-shadow(0 0 10px $lightgrey);
        i {
          color: #ececff;
        }
        &:hover {
          background-position: right center;
        }
      }
    }
  }
  @media only screen and (max-width: 1350px) {
    .list__specialization {
      display: none;
    }
  }
  @media only screen and (max-width: 1200px) {
    .list__place {
      display: none;
    }
  }
  @media only screen and (max-width: 900px) {
    .list__desc {
      display: none;
    }
  }
}

.more__container {
  width: calc(100% - 4em);
  padding: 2em;
  height: auto;
  .more__summary {
    display: block;
  }
  .summary__el {
    line-height: 1.2;
    height: auto;
    width: calc(100% - 2em);
    border-radius: 0.5em;
    box-shadow: 0 0 20px 0px rgba(213, 213, 213, 0.3);
    background: #ffffff;
    display: block;
    @extend %text--overflow;
    font-weight: 600;
    color: #67676e;
    padding: 1em;
    i {
      margin-right: 1em;
      color: #6a6ee1;
    }
    &:not(:last-child) {
      margin-bottom: 1em;
    }
    &:hover {
      white-space: normal;
      padding-left: 2em;
      i {
        margin-left: 0;
      }
    }
  }
  .summary__few {
    width: 100%;
    display: flex;
  }
  .summary__signature {
    @extend %text--center;
    max-width: 20em;
    height: auto;
    width: calc(100% - 6em);
    border-radius: 0.5em;
    -webkit-box-shadow: 0 0 20px 0px rgba(213, 213, 213, 0.3);
    box-shadow: 0 0 20px 0px rgba(213, 213, 213, 0.3);
    background: #ffffff;
    display: block;
    font-weight: 700;
    color: #67676e;
    padding: 1.25em;
    position: relative;
    overflow: hidden;
    font-size: 0.8em;
    img {
      position: absolute;
      height: 100%;
      width: 100%;
      left: 0;
      top: 0;
    }
  }
  .summary__print {
    @extend %text--center;
    background: #3e3e45;
    margin-left: 1em;
    cursor: pointer;
    border-radius: 0.5em;
    i {
      color: #fafafc;
    }
  }
  .more__content {
    display: flex;
    width: 100%;
    .more__row {
      width: 100%;
      display: block;
      margin: 0 1em;
      margin-bottom: auto;
      height: 100%;
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
        .more__row__attachment {
          @extend %text--center;
          justify-content: left;
          transition: ease-in-out 0.2s;
          border-radius: 0.5em;
          overflow: hidden;
          cursor: pointer;
          i {
            margin-left: 0;
            padding: 0.5em;
            font-size: 1.5em;
            color: #6a6ee1;
            background: #f0f0ff;
            border-radius: 0.5em;
          }
          &:not(:last-child) {
            margin-bottom: 1em;
          }
          &:hover {
            background: #f0f0ff;
          }
        }
      }
      .more__row__prescription {
        width: 100%;
        font-weight: 600;
        margin-bottom: 1em;
        display: flex;
        i {
          margin-left: 0;
          margin-right: 1rem;
          padding: 0.5em;
          font-size: 1.5em;
          width: 1em;
          height: 1em;
          text-align: center;
          color: #6a6ee1;
          background: #f0f0ff;
          border-radius: 0.5em;
        }
        .prescription__content {
          height: 100%;
          margin: auto 0;
          white-space: normal;
        }
        .prescription__title {
          font-weight: 700;
          color: #3e3e45;
          margin-bottom: 0.25em;
        }
        .prescription__info {
          color: #67676e;
        }
      }
    }
  }
}
@media only screen and (max-width: 1200px) {
  .more__container {
    display: block;
    .more__about {
      width: auto;
      margin-bottom: 1em;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .more__content {
      display: grid;
      grid-row-gap: 1.5em;
    }
  }
}

.list__actions {
  margin-top: 0.5em;
  height: 3em;
  display: flex;
  float: right;
  .list__previous {
    @extend %text--center;
    margin-right: 2em;
    border: 0;
    transition: 0.2s ease-in-out;
    border-radius: 0.5em;
    float: right;
    border-radius: 0.25em;
    padding: 0.5em 1.5em;
    background: none;
    color: #1a1b37;
    font-weight: 600;
    background: #e6e6f4;
    cursor: pointer;
    &:hover {
      background: #e2e2ea;
    }
    i {
      margin-left: 0.75em;
    }
  }
}

@media only screen and (max-width: 959px) {
  .more__summary {
    margin-bottom: 1em;
  }
  .more__container .more__content .more__row {
    margin: 0;
  }
  .doctor__img {
    display: none;
  }
  .summary__print {
    width: 100%;
    i {
      margin-left: 0 !important;
    }
    &::after {
      content: "Drukuj";
      color: #fafafc;
    }
  }
}

@media only screen and (max-width: 520px) {
  .list__el .list__doctor {
    .doctor__img {
      display: none;
    }
    .doctor__name {
      margin-left: 0;
    }
  }
}
</style>