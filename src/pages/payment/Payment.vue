<template>
  <div>
    <div class="payment--info">
      <VioletBlock
        class="info__content"
        v-if="isPaymentValid"
      >
        Opłacono do
        <b>{{ paidUntil }}</b>
        ({{daysUntil}})
      </VioletBlock>
      <RedBlock
        class="info__content"
        v-if="!isPaymentValid"
      >Nieopłacony</RedBlock>
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
            <span>XXX zł/msc</span>
          </div>
        </div>
      </div>
      <div class="payment__container">
        <div class="payment__choose">
          <div class="choose__title">Wybierz sposób płatności:</div>
          <div class="choose__options">
            <div
              class="choose__option"
              style="color: #253b7f;"
            >
              <span
                aria-hidden="true"
                class="fab fa-paypal"
              />
              PayPal
            </div>
          </div>
          <div class="choose__options">
            <div class="choose__option">
              <span
                aria-hidden="true"
                class="far fa-credit-card"
              />
              Karta
            </div>
          </div>
          <div class="choose__options">
            <div class="choose__option">
              <span
                aria-hidden="true"
                class="fas fa-money-check"
              />
              Przelew
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VioletBlock from "../../components/ui/blocks/VioletBlock";
import RedBlock from "../../components/ui/blocks/RedBlock";
import { mapGetters } from "vuex";

let moment = require("moment");
moment.locale("pl");

export default {
  name: "Payment",
  computed: {
    ...mapGetters({
      isPaymentValid: "userInfo/isPaymentValid"
    }),
    paidUntil: function() {
      return moment(
        this.$store.getters["userInfo/paidUntil"],
        "YYYY-MM-DD"
      ).format("DD.MM.YYYY");
    },
    daysUntil: function() {
      let days = moment(
        this.$store.getters["userInfo/paidUntil"],
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
  width: 50rem;
  height: auto;
  display: flex;
  margin-bottom: 1em;
}
.info__content {
  padding: 2.5%;
  text-align: center;
}

.payment {
  margin: auto;
  margin-bottom: 1em;
  width: 50rem;
  height: auto;
  background: #fafafc;
  border-radius: 0.5em;
  overflow: hidden;
  box-shadow: 0 0 20px 0px $lightgrey;
  display: flex;
  & > div {
    width: 50%;
    padding: 2rem 0;
    overflow: hidden;
  }
}

.payment__about {
  text-align: center;
  font-size: 1.25em;
  color: #fafafc;
  background: #7f83e8;
  .about__title {
    font-weight: 600;
    margin-bottom: 2rem;
    width: 100%;
  }
  .about__func {
    width: 100%;
    @extend %text--center;
    height: 2.5em;
    padding: 0.5rem;
    font-weight: 600;
    background: #6e72e2;
    transform: rotate(-3deg);
    margin-left: -0.5rem;
    &:nth-child(even) {
      background: #7f83e8;
    }
  }
  .about__cost {
    margin-top: 2rem;
    width: 100%;
    font-weight: 600;
    @extend %text--center;
    span {
      margin-left: auto;
      border-top-left-radius: 0.5em;
      border-bottom-left-radius: 0.5em;
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
      width: 6.5em;
      display: inline-block;
      border-radius: 0.5em;
      padding: 0.5em;
      font-size: 1.25em;
      background: #eaeef7;
      font-weight: 700;
      cursor: pointer;
      span {
        vertical-align: middle;
        margin-right: 0.5em;
      }
      &:not(:last-child) {
        margin-bottom: 0.5em;
      }
    }
  }
}

@media only screen and (max-width: 56rem) {
  .payment--info,
  .payment {
    width: 100%;
    .block--violet {
      width: 100%;
      padding: 1em;
    }
  }
}

@media only screen and (max-width: 600px) {
  .payment {
    display: block;
    .payment__about,
    .payment__container {
      width: 90%;
    }
  }
}
</style>