<template>
  <div>
    <div class="payment--info">
      <div class="info__title">Status płatności</div>
      <VioletBlock class="info__content" v-if="this.$store.getters.userInfo.isPaid">
        Opłacona do
        <b>{{ paidUntil }}</b>
        ({{daysUntil}})
      </VioletBlock>
      <RedBlock class="info__content" v-if="!this.$store.getters.userInfo.isPaid">Nieopłacona</RedBlock>
    </div>
    <div class="payment">
      <div class="payment__about">
        <div>
          <div class="about__title">Pakiet dla specjalistów</div>
          <div>
            <div class="about__func">Tworzenie gabinetów</div>
            <div class="about__func">Terminarz wizyt</div>
            <div class="about__func">Kartoteki pacjentów</div>
          </div>
          <div class="about__cost">
            <span>200 zł/msc</span>
          </div>
        </div>
      </div>
      <div class="payment__container">
        <div class="payment__choose">
          <div class="choose__title">Wybierz sposób płatności:</div>
          <div class="choose__options">
            <div class="choose__option" style="color: #253b7f;">
              <i class="fab fa-paypal"></i>
              PayPal
            </div>
          </div>
          <div class="choose__options">
            <div class="choose__option">Przelew</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
let moment = require("moment");
moment.locale("pl");

import VioletBlock from "../../components/ui/VioletBlock";
import RedBlock from "../../components/ui/RedBlock";

export default {
  name: "Payment",
  computed: {
    paidUntil: function() {
      return moment(
        this.$store.getters.userInfo.paidUntil,
        "YYYY-MM-DD"
      ).format("DD.MM.YYYY");
    },
    daysUntil: function() {
      let days = moment(
        this.$store.getters.userInfo.paidUntil,
        "YYYY-MM-DD"
      ).diff(moment(), "days");

      return days > 1 ? `pozostało ${days} dni` : `pozostał ${days} dzień`;
    }
  },
  components: {
    VioletBlock: VioletBlock,
    RedBlock: RedBlock
  }
};
</script>

<style lang="scss" scoped>
@import "../../main";

.payment--info {
  margin: auto;
  width: 50em;
  height: auto;
  display: flex;
  margin-bottom: 1em;
}

.info__title {
  padding: 2.5%;
  font-weight: 600;
  text-align: center;
  width: calc(33% - 5%);
  background: #fafafc;
  border-radius: 0.5em;
  overflow: hidden;
  box-shadow: 0 0 20px 0px $lightgrey;
  margin-right: 1em;
}
.info__content {
  padding: 2.5%;
  text-align: center;
}

.payment {
  margin: auto;
  width: 50em;
  height: auto;
  background: #fafafc;
  border-radius: 0.5em;
  overflow: hidden;
  box-shadow: 0 0 20px 0px $lightgrey;
  display: flex;
  & > div {
    width: 50%;
    height: 100%;
    padding: 5%;
  }
}

.payment__about {
  text-align: center;
  font-size: 1.25em;
  color: #fafafc;
  background: $darkviolet;
  background: linear-gradient(to right, $lightviolet, $darkviolet);
  .about__title {
    font-weight: 600;
    margin-bottom: 1em;
    width: 100%;
  }
  .about__func {
    width: 100%;
    @extend %text--center;
    height: 2.5em;
    &:not(:last-child) {
      border-bottom: 3px solid #fafafc;
    }
  }
  .about__cost {
    margin-top: 1em;
    width: 100%;
    font-weight: 600;
    @extend %text--center;
    span {
      margin-left: 1em;
      border-radius: 0.5em;
      background: $darkviolet;
      padding: 0.5em;
    }
  }
}
.payment__choose {
  font-weight: 600;
  color: #3e3e45;
  font-size: 1.25em;
  text-align: center;
  .choose__options {
    display: block;
    margin: auto;
    margin-top: 1.5em;
    .choose__option {
      width: 6em;
      display: inline-block;
      border-radius: 0.5em;
      padding: 0.5em;
      font-size: 1.25em;
      background: #eaeef7;
      font-weight: 700;
      cursor: pointer;
      i {
        margin-right: 0.5em;
      }
      &:not(:last-child) {
        margin-bottom: 0.5em;
      }
    }
  }
}
</style>