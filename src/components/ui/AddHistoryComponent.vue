<template>
  <div class="addhistory">
    <MainUserInfo
      class="addhistory__patient"
      v-if="patient"
      :data="patient"
      :isClickable="false"
      :isBig="true"
    />
    <MainSelect
      :disabled="loading.roles"
      class="addhistory__select"
      v-on:change.native="selectPlace($event)"
    >
      Gdzie?
      <option
        v-if="loading.roles"
        selected
        disabled
        :value="null"
      >Ładowanie gabinetów</option>
      <option
        v-else
        selected
        disabled
        :value="null"
      >Wybierz gabinet</option>
      <option
        v-for="(role, index) in roles"
        :key="index"
        :value="role.place.id"
      >{{ role.place.name }}</option>
    </MainSelect>
    <MainInput
      class="addhistory__date"
      v-if="placeSelected"
    >
      Data
      <input
        type="datetime-local"
        :value="date"
        v-on:change="setFormattedDate($event)"
        :required="true"
      >
    </MainInput>
    <MainTextarea
      class="addhistory__note"
      v-if="placeSelected"
    >
      Notatka
      <textarea
        v-on:input="resizeTextarea($event)"
        v-model="data.note"
        :required="true"
      ></textarea>
    </MainTextarea>
    <MainTextarea
      class="addhistory__treatments"
      v-if="placeSelected"
    >
      Wykonane zabiegi
      <textarea
        v-on:input="resizeTextarea($event)"
        v-model="data.treatments"
        :required="true"
      ></textarea>
    </MainTextarea>
    <Block
      class="addhistory__block addhistory__recommendations"
      title="Zalecenia"
      v-if="placeSelected"
    >
      <div
        class="addhistory__recommendation"
        v-for="(recommendation, index) in data.recommendations"
        :key="index"
      >
        <div class="addhistory__recommendation__top">
          <div>
            <input
              class="addhistory__recommendation__title"
              v-model="recommendation.title"
              type="text"
              placeholder="Tytuł"
              required
            />
            <input
              class="addhistory__recommendation__description"
              v-model="recommendation.description"
              type="text"
              placeholder="Opis"
              required
            />
          </div>
          <button
            class="addhistory__recommendation__btn"
            v-on:click="deleteRecommendation(index)"
          >
            <span
              class="fas fa-times"
              aria-hidden="true"
            />
          </button>
        </div>
        <div class="addhistory__recommendation__date">
          <div class="addhistory__recommendation__date__title">
            Rozpoczęcie
          </div>
          <input
            class="addhistory__recommendation__date__input"
            type="date"
            v-on:input="setFormattedRecommendationDate($event, index)"
            :value="recommendationDates[index]"
          />
        </div>
        <div
          class="addhistory__recommendation__days"
          v-if="recommendation.days > 0"
        >
          <div class="addhistory__recommendation__days__title">
            Dni
          </div>
          <input
            class="addhistory__recommendation__days__input"
            type="number"
            v-model="recommendation.days"
          />
        </div>
        <div
          class="addhistory__recommendation__days addhistory__recommendation__days--undefined"
          v-on:click="recommendation.days = 1"
          v-if="recommendation.days == 0"
        >
          <div class="addhistory__recommendation__days__title addhistory__recommendation__days__title--undefined fullwidth">
            Czas nieokreślony
          </div>
          <div class="addhistory__recommendation__days__checkbox">
            <span
              class="fas fa-times"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
      <MainBtn
        type="button"
        class="addhistory__block__btn"
        v-on:click.native="showNewRecommendation"
      ><span
          class="fas fa-plus"
          aria-hidden="true"
        />Dodaj</MainBtn>
    </Block>
    <Block
      class="addhistory__block addhistory__attachments"
      title="Załączniki"
      v-if="placeSelected"
    >
      <div
        class="addhistory__attachment"
        v-for="(attachment, index) in data.attachments"
        :key="index"
      >
        <div>
          <input
            class="addhistory__attachment__title"
            v-model="attachment.title"
            type="text"
            placeholder="Tytuł"
            required
          />
          <div class="addhistory__attachment__info">
            {{ attachment.file.name }} | {{ getOriginalFileSizeInMegabytes(attachment.file) }}
          </div>
        </div>
        <button
          class="addhistory__attachment__btn"
          v-on:click="deleteAttachment(index)"
        >
          <span
            class="fas fa-times"
            aria-hidden="true"
          />
        </button>
      </div>
      <label
        class="addhistory__block__btn"
        for="attachmentInput"
      >
        <input
          id="attachmentInput"
          type="file"
          v-on:change="processAttachments($event)"
          multiple
        />
        <span
          aria-hidden="true"
          class="fas fa-file-upload"
        />
        Prześlij pliki
      </label>
    </Block>
    <Block
      class="addhistory__block addhistory__agreement"
      title="Zgoda na wykonanie zabiegu"
      v-if="placeSelected"
    >
      <div
        class="addhistory__attachment"
        v-if="data.agreement"
      >
        <div class="addhistory__attachment__info">
          {{ data.agreement.name }} | {{ getOriginalFileSizeInMegabytes(data.agreement) }}
        </div>
        <button
          class="addhistory__attachment__btn"
          v-on:click="deleteAgreement"
        >
          <span
            class="fas fa-times"
            aria-hidden="true"
          />
        </button>
      </div>
      <div
        v-bind:class="{ addhistory__buttons : isMobile && selectedPlace.agreement }"
        v-if="!data.agreement"
      >
        <button
          class="addhistory__block__btn"
          type="button"
          v-on:click="showAgreementModal"
          v-if="isMobile && selectedPlace.agreement"
        >
          <span
            aria-hidden="true"
            class="fas fa-pen-square"
          />
          Z szablonu
        </button>
        <label
          class="addhistory__block__btn"
          for="agreementInput"
        >
          <input
            id="agreementInput"
            type="file"
            v-on:change="processAgreement($event)"
          />
          <span
            aria-hidden="true"
            class="fas fa-file-contract"
          />
          Prześlij plik
        </label>
      </div>
    </Block>
  </div>
</template>

<script>
import MainSearch from "../../components/ui/basic/MainSearch";
import MainInput from "../ui/basic/MainInput";
import MainSelect from "../ui/basic/MainSelect";
import MainTextarea from "../ui/basic/MainTextarea";
import MainUserInfo from "../ui/basic/MainUserInfo";
import MainBtn from "../../components/ui/basic/MainBtn";
import MainLoading from "../../components/ui/basic/MainLoading";
import GreyBlock from "../../components/ui/blocks/GreyBlock";
import WhiteFunctionalBlock from "../../components/ui/blocks/WhiteFunctionalBlock";

import imageCompression from "browser-image-compression";
import { mapGetters, mapActions } from "vuex";

const moment = require("moment");
moment.locale("pl");

export default {
  name: "AddHistoryComponent",
  data: function() {
    return {
      loading: {
        roles: false
      },
      date: "",
      recommendationDates: [],
      data: {
        place_id: null,
        patient_id: null,
        date: "",
        note: "",
        treatments: "",
        agreement: null,
        recommendations: [],
        attachments: []
      }
    };
  },
  computed: {
    ...mapGetters({
      isMobile: "window/isMobile",
      roles: "patientRoles/list",
      patient: "addHistory/patient"
    }),
    placeSelected: function() {
      return this.data.place_id !== null;
    },
    selectedPlace: function() {
      const role = this.roles.find(role => role.place.id == this.data.place_id);
      return role.place;
    }
  },
  methods: {
    ...mapActions({
      getPlacePatients: "placePatients/get",
      getPatientRoles: "patientRoles/get",
      setHistoryData: "addHistory/setData",
      showModal: "modal/show"
    }),
    getRoles: async function() {
      this.loading.roles = true;

      await this.getPatientRoles(this.patient.id).catch(error => {
        this.$toasted.error("Wystąpił błąd");
        console.error(error);
      });

      this.loading.roles = false;
    },
    selectPlace: function(event) {
      this.data.place_id = event.target.value;
    },
    setFormattedDate: function(event) {
      this.data.date = moment(event.target.value).format("YYYY-MM-DD HH:mm:ss");
    },
    setFormattedRecommendationDate: function(event, index) {
      this.data.recommendations[index] = moment(event.target.value).format(
        "YYYY-MM-DD HH:mm:ss"
      );
    },
    showNewRecommendation: function() {
      const emptyRecommendation = {
        title: "",
        description: "",
        start_date: moment().format("YYYY-MM-DD HH:mm:ss"),
        days: 0
      };
      this.recommendationDates.push(moment().format("YYYY-MM-DD"));
      this.data.recommendations.push(emptyRecommendation);
    },
    deleteRecommendation: function(recommendationIndex) {
      this.data.recommendations = this.data.recommendations.filter(
        (recommendation, index) => index !== recommendationIndex
      );
    },
    processAttachments: async function(event) {
      const files = event.target.files;
      Array.from(files).forEach(async file => {
        const fileName = file.name
          .split(".")
          .slice(0, -1)
          .join(".");
        file = this.isImage(file) ? await this.compressImage(file) : file;
        const data = {
          title: fileName,
          file: file
        };
        this.data.attachments.push(data);
      });
    },
    deleteAttachment: function(attachmentIndex) {
      this.data.attachments = this.data.attachments.filter(
        (attachment, index) => index !== attachmentIndex
      );
    },
    processAgreement: async function(event) {
      let file = event.target.files[0];
      file = this.isImage(file) ? await this.compressImage(file) : file;
      this.data.agreement = file;
    },
    deleteAgreement: function() {
      this.data.agreement = null;
    },
    getOriginalFileSizeInMegabytes: function(file) {
      const fileSizeInMegabytes = file.size / 1000 / 1000;
      const sizeIsSmallerThanOne = fileSizeInMegabytes < 1.0;
      const fileSizeInfo = sizeIsSmallerThanOne
        ? fileSizeInMegabytes.toFixed(2)
        : fileSizeInMegabytes.toFixed(1);
      return `${fileSizeInfo} MB`;
    },
    resizeTextarea(event) {
      event.target.style.height = "auto";
      event.target.style.height = event.target.scrollHeight + "px";
    },
    isImage(file) {
      return file.type.split("/")[0] === "image";
    },
    compressImage(file) {
      this.$toasted.info("Kompresowanie...");
      const options = {
        maxSizeMB: 5
      };
      return imageCompression(file, options);
    },
    showAgreementModal: function() {
      this.showModal({
        componentName: "SignAgreement",
        data: {
          hideBorders: true,
          template: this.selectedPlace.agreement
        }
      });
    }
  },
  watch: {
    data: {
      handler(val) {
        this.setHistoryData(val);
      },
      deep: true
    }
  },
  components: {
    MainInput,
    MainSelect,
    MainTextarea,
    MainUserInfo,
    MainSearch,
    MainLoading,
    GreyBlock,
    MainBtn,
    Block: WhiteFunctionalBlock
  },
  mounted() {
    if (this.patient) {
      this.data.date = moment().format("YYYY-MM-DD HH:mm:ss");
      this.date = moment().format("YYYY-MM-DDTHH:mm");

      this.data.patient_id = this.patient.id;
      if (!this.roles || this.roles.length === 0) {
        this.getRoles();
      }
    } else {
      this.$router.go(-1);
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

input[type="date"]::-webkit-clear-button {
  display: none;
  -webkit-appearance: none;
}

.addhistory {
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-areas:
    "Patient"
    "Place"
    "Date"
    "Note"
    "Treatments"
    "Recommendations"
    "Attachments"
    "Agreement";
  grid-gap: 1rem;
  padding: 1rem;
  width: calc(100% - 2rem);
  border-bottom: 1px solid rgba(145, 145, 156, 0.15);
  &__info {
    padding: 1rem;
    max-width: 20rem;
  }

  &__patient {
    grid-area: Patient;
  }

  &__select {
    grid-area: Place;
    width: 100%;
    background-color: #fdfdff !important;
  }

  &__date {
    grid-area: Date;
  }

  &__note {
    grid-area: Note;
  }

  &__treatments {
    grid-area: Treatments;
  }

  &__recommendations {
    grid-area: Recommendations;
  }

  &__attachments {
    grid-area: Attachments;
  }

  &__agreement {
    grid-area: Agreement;
  }

  &__patients,
  &__places {
    overflow: auto;
    height: 15rem;
    padding: 0 1rem;
    width: calc(100% - 2rem);
  }

  &__search {
    padding: 1rem;
    width: calc(100% - 2rem);
  }

  &__block {
    width: 90%;
    padding: 5%;
    border-radius: 0.5em;
    background: #fdfdff !important;
    display: inline-block;
    box-shadow: none;
    & /deep/ {
      .block__top {
        margin-bottom: 1rem !important;
      }
      .block__content {
        display: grid;
        grid-gap: 1rem;
      }
      .top__title {
        color: #91919c !important;
        font-size: 1rem !important;
        font-weight: 600 !important;
      }
    }
    &__btn {
      @extend %text--center;
      padding: 1rem;
      width: 100%;
      background: #e4e7ef;
      color: #91919c;
      span {
        margin-right: 0.75rem;
      }
      input {
        display: none;
      }
    }
    label.addhistory__block__btn {
      width: calc(100% - 2rem);
      font-weight: 600;
      display: flex;
      justify-content: center;
      border-radius: 0.5rem;
      cursor: pointer;
    }
  }

  &__recommendation {
    &__top {
      display: grid;
      grid-template-columns: auto 4rem;
    }
    &__title {
      padding: 0.5rem;
      background: #e4e7ef;
      color: #3e3e45;
      width: calc(100% - 1rem);
      font-weight: 700;
      border-top-left-radius: 0.5rem;
    }
    &__description {
      padding: 0.5rem;
      background: #f1f2f7;
      color: #67676e;
      width: calc(100% - 1rem);
      font-weight: 600;
    }
    &__btn {
      padding: 1rem;
      font-size: 1.5rem;
      background: #f1f2f7;
      color: #6a6ee1;
      border-top-right-radius: 0.5rem;
      cursor: pointer;
      transition: 0.2s ease-in-out;
      &:hover {
        filter: brightness(95%);
      }
    }
    &__date {
      display: grid;
      grid-template-columns: 8rem auto;
      width: 100%;
      &__title {
        padding: 0.5rem;
        background: #e4e7ef;
        font-weight: 600;
        color: #757575;
        display: flex;
        align-items: center;
      }
      &__input {
        padding: 0.5rem;
        text-align: center;
        font-weight: 600;
        color: #9191a2;
        background: #fafafc;
        width: calc(100% - 1rem);
      }
    }
    &__days {
      display: grid;
      grid-template-columns: 8rem auto;
      width: 100%;
      &--undefined {
        cursor: pointer;
        grid-template-columns: auto 2rem;
      }
      &__title {
        padding: 0.5rem;
        background: #e4e7ef;
        font-weight: 600;
        color: #757575;
        display: flex;
        align-items: center;
        border-bottom-left-radius: 0.5rem;
        &--undefined {
          background: #f1f2f7;
          width: 100%;
          text-align: center;
        }
      }
      &__input {
        padding: 0.5rem;
        text-align: center;
        font-weight: 600;
        color: #9191a2;
        background: #fafafc;
        width: calc(100% - 1rem);
        border-bottom-right-radius: 0.5rem;
      }
      &__checkbox {
        @extend %text--center;
        padding: 0.5rem;
        width: 1rem;
        color: #9191a2;
        background: #e4e7ef;
        border-bottom-right-radius: 0.5rem;
      }
    }
  }
  &__attachment {
    display: grid;
    grid-template-columns: auto 4rem;
    &__title {
      padding: 0.5rem;
      background: #e4e7ef;
      color: #3e3e45;
      width: calc(100% - 1rem);
      font-weight: 700;
      border-top-left-radius: 0.5rem;
    }
    &__info {
      padding: 0.5rem;
      background: #f1f2f7;
      color: #67676e;
      width: calc(100% - 1rem);
      font-weight: 600;
      word-break: break-word;
      border-bottom-left-radius: 0.5rem;
      &:first-child {
        display: flex;
        align-items: center;
        border-top-left-radius: 0.5rem;
      }
    }
    &__btn {
      padding: 1rem;
      font-size: 1.5rem;
      background: #f1f2f7;
      color: #6a6ee1;
      border-top-right-radius: 0.5rem;
      border-bottom-right-radius: 0.5rem;
      cursor: pointer;
      transition: 0.2s ease-in-out;
      &:hover {
        filter: brightness(95%);
      }
    }
  }

  .places__info,
  .patients__info {
    width: calc(100% - 2rem);
    padding: 1rem;
    &--loading {
      svg {
        height: 2rem;
        width: 2rem;
        margin-left: 1rem;
        margin-right: unset;
      }
    }
  }

  .patient__el {
    display: flex;
    border-radius: 0.5rem;
    overflow: hidden;
    background: #fafafc;
    &:not(:last-child) {
      margin-bottom: 1rem;
    }
    &__info {
      padding: 0.5rem;
      padding-right: 1rem;
    }
    &__checkbox {
      @extend %text--center;
      margin-left: auto;
      font-size: 1.75rem;
      height: 4.5rem;
      width: 4.5rem;
      background: #fafafc;
      cursor: pointer;
      input {
        display: none;
      }
      span {
        color: #27ae60;
        opacity: 0;
        transition: 0.2s ease-in-out;
      }
      &:hover span {
        opacity: 0.5;
      }
      &.checked span {
        opacity: 1;
      }
    }
  }

  &__buttons {
    display: grid;
    width: 100%;
    grid-template-columns: 1fr 1fr;
    & > * {
      width: 100%;
    }
    & > *:first-child {
      background: #f1f2f7;
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
    & > *:last-child {
      border-top-left-radius: 0 !important;
      border-bottom-left-radius: 0 !important;
    }
    button {
      width: 100%;
      font-weight: 600;
      display: flex;
      justify-content: center;
      border-radius: 0.5rem;
      cursor: pointer;
    }
  }
}

.places__list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 1rem;
  margin-bottom: 1rem;
  margin: 1rem;
}

.place {
  @extend %text--center;
  color: #3e3e45;
  font-weight: 600;
  width: calc(100% - 2.5rem);
  padding: 1.25rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 20px 0px rgba(213, 213, 213, 0.3);
  background: #eeeef3;
  transition: 0.2s ease-in-out;
  text-align: center;
  cursor: pointer;
  &.selected,
  &.places__title {
    background: #fafafc;
  }
  &.inactive {
    display: none;
  }
  &--selected {
    display: grid;
    grid-template-columns: 10rem auto 5rem;
    margin-bottom: 1rem;
    & > .places__title {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
    & > .place.selected {
      border-radius: 0;
      background: #efefef;
      cursor: unset;
    }
    & > .place__back {
      padding: 1rem;
      background: #8789e8;
      color: #fafafa;
      border-top-right-radius: 0.5rem;
      border-bottom-right-radius: 0.5rem;
      font-weight: 600;
      cursor: pointer;
    }
  }
}

.place__select {
  margin-left: auto;
  font-size: 1.5em;
  width: 1em;
  height: 1em;
  text-align: center;
  border-radius: 0.5em;
  transition: 0.2s ease-in-out;
  color: #6a6ee1;
}

@media only screen and (min-width: 920px) {
  .addhistory {
    grid-template-columns: 1fr 1fr;
    padding: 2rem;
    width: calc(100% - 4rem);
    grid-template-areas:
      "Patient Place"
      "Date Date"
      "Note Note"
      "Treatments Treatments"
      "Recommendations Recommendations"
      "Attachments Attachments"
      "Agreement Agreement";
    & > * {
      padding: 1rem !important;
      width: calc(100% - 2rem) !important;
      &.addhistory__select {
        width: 100% !important;
      }
    }
    &__block:not(.addhistory__agreement) {
      & /deep/ {
        .block__content {
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        }
      }
    }
  }
}

@media only screen and (max-width: 720px) and (orientation: portrait) {
  .addhistory {
    grid-template-columns: 1fr;
    height: calc(100% - 5rem);
    &__info {
      max-width: 100%;
      height: auto;
    }
  }
}
</style>
