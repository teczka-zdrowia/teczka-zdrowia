<template>
  <div class="about">
    <div class="about__top">
      <BaseInfo class="about__base"></BaseInfo>
      <div class="about__additional">
        <VioletBlock>
          <div class="list">
            <div class="list__el">
              <div class="list__title">Grupa krwi:</div>
              <div class="list__content">AB+</div>
            </div>
            <div class="list__el">
              <div class="list__title">Alergie:</div>
              <div class="list__content">Mleko, orzechy</div>
            </div>
            <div class="list__el">
              <div class="list__title">Choroby:</div>
              <div class="list__content">Cukrzyca</div>
            </div>
          </div>
        </VioletBlock>
      </div>
      <div class="about__other">
        <RedBlock>
          <div class="list">
            <div class="list__el">
              <div class="list__title" style="width: 100%; font-weight: 700;">Najczęstsze wizyty</div>
            </div>
            <div class="list__el">
              <div class="list__title">dr Tomasz Ołuf</div>
              <div class="list__content">dentysta</div>
            </div>
            <div class="list__el">
              <div class="list__title">dr Ozjasz Goldberg</div>
              <div class="list__content">psycholog</div>
            </div>
          </div>
        </RedBlock>
      </div>
    </div>
    <History class="about__history"></History>
  </div>
</template>

<script>
import BaseInfo from "./BaseInfo";
import History from "./History";
import VioletBlock from "../../components/ui/VioletBlock";
import RedBlock from "../../components/ui/RedBlock";

export default {
  name: "About",
  components: {
    BaseInfo: BaseInfo,
    History: History,
    VioletBlock: VioletBlock,
    RedBlock: RedBlock
  }
};
</script>

<style lang="scss">
@import "../../main";

.about {
  .about__top {
    display: flex;
    width: 100%;
  }
  @media only screen and (max-width: 1200px) {
    .about__top {
      display: grid;
      grid-template-columns: 50% 50%;
      grid-template-rows: auto;
      grid-template-areas:
        "base base"
        "additional other";
      * {
        width: auto;
      }

      .about__additional {
        grid-area: additional;
        margin-left: 0;
      }
      .about__other {
        grid-area: other;
        display: block;
      }
      .info--base {
        grid-area: base;
      }
    }
  }
}

.about__additional,
.about__other {
  margin-left: 2em;
  width: calc((50% - 2em) / 2);
  height: auto;
  .block--violet .list__content {
    color: #d8d8e0;
  }
  .block--red .list__content {
    color: #ffe6e7;
  }
}

.list {
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: auto;
  grid-row-gap: auto;
}

.list__el {
  @extend %text--center;
  justify-content: left;
  display: flex;
  font-weight: 600;
  font-size: 0.9em;
}

.list__title {
  width: 50%;
  color: #fafafa;
}

@media only screen and (max-width: 1350px) {
  .about__additional {
    width: 33%;
  }
  .about__other {
    display: none;
  }
}
</style>
