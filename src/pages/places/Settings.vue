<template>
  <div class="settings">
    <div class="settings__el">
      <div class="settings__title">
        <span>Nazwa</span>
      </div>
      <div
        class="settings__content"
        v-if="!isEdit"
      >
        {{ selectedPlace.name }}
      </div>
      <input
        v-if="isEdit"
        v-model="newData.name"
        class="settings__content"
        type="text"
        name="name"
        minlength="4"
        placeholder="MedMax"
        required
      />
    </div>
    <div class="settings__el">
      <div class="settings__title">
        <span>Adres</span>
      </div>
      <div
        class="settings__content"
        v-if="!isEdit"
      >
        {{ selectedPlace.address }}
      </div>
      <input
        v-if="isEdit"
        v-model="newData.address"
        class="settings__content"
        type="text"
        name="name"
        minlength="4"
        placeholder="Kwiatowa 4"
        required
      />
    </div>
    <div class="settings__el">
      <div class="settings__title">
        <span>Miasto</span>
      </div>
      <div
        class="settings__content"
        v-if="!isEdit"
      >
        {{ selectedPlace.city }}
      </div>
      <input
        v-if="isEdit"
        v-model="newData.city"
        class="settings__content"
        type="text"
        name="name"
        minlength="4"
        placeholder="Kwiatowa 4"
        required
      />
    </div>
    <div class="settings__el">
      <div class="settings__title">
        <span>Zgoda</span>
      </div>
      <MainBtn
        class="settings__content settings__content--fullcolor"
        v-if="!isEdit && selectedPlace.agreement"
        v-on:click.native="showAgreement"
      ><span
        aria-hidden="true"
        class="fas fa-file-contract"
      /> Zobacz
        szablon
      </MainBtn>
      <div
        class="settings__content"
        v-if="!isEdit && !selectedPlace.agreement"
      >
        Brak szablonu
      </div>
      <div
        class="settings__content settings__content--withbutton"
        v-if="isEdit && newData.agreement"
      >
        <div class="settings__content--withbutton__info">
          {{ agreementInfo }}
        </div>
        <button
          class="settings__content--withbutton__btn"
          v-on:click="deleteAgreement"
        >
          <span
            class="fas fa-times"
            aria-hidden="true"
          />
        </button>
      </div>
      <label
        v-if="isEdit && !newData.agreement"
        class="settings__content fileinput settings__content--fullcolor"
      >
        <input
          type="file"
          name="agreement"
          accept="image/*"
          v-on:change="processAgreement($event)"
          required
        />
        <span
          aria-hidden="true"
          class="fas fa-file-contract"
        />
        Prześlij zdjęcie/skan szablonu
      </label>
    </div>
    <div class="settings__actions">
      <MainBtn
        class="settings__action settings__action--edit"
        v-on:click.native="isEdit = true"
        v-if="!isEdit"
      >
        <span
          aria-hidden="true"
          class="fas fa-pen"
        />
        Edytuj
      </MainBtn>
      <MainBtn
        class="settings__action settings__action--cancel"
        v-on:click.native="isEdit = false"
        v-if="isEdit"
      >
        <span
          aria-hidden="true"
          class="fas fa-times"
        />
        Anuluj
      </MainBtn>
      <MainBtn
        class="settings__action settings__action--save"
        color="#27ae60"
        :loading="loading.update"
        :disabled="loading.update"
        v-on:click.native="updatePlace"
        v-if="isEdit"
      >
        <span
          aria-hidden="true"
          class="fas fa-check"
        />
        Zapisz
      </MainBtn>
    </div>
    <div
      class="settings__actions"
      v-on:click="deactivatePlace"
    >
      <MainBtn class="settings__action settings__action--lock">
        <span
          aria-hidden="true"
          class="fas fa-lock"
        />
        Dezaktywuj gabinet
      </MainBtn>
    </div>
  </div>
</template>

<script>
import MainBtn from '../../components/ui/basic/MainBtn'
import { API_URL } from '@/apollo/constants'
import imageCompression from 'browser-image-compression'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Settings',
  components: {
    MainBtn
  },
  data: function () {
    return {
      isEdit: false,
      newData: {
        name: '',
        city: '',
        address: '',
        agreement: ''
      },
      loading: {
        update: false
      }
    }
  },
  computed: {
    ...mapGetters({
      selectedRole: 'userRoles/selected'
    }),
    selectedPlace: function () {
      return this.selectedRole.place
    },
    agreementInfo: function () {
      const agreement = this.newData.agreement
      const agreementIsString = typeof agreement === 'string'

      return agreementIsString
        ? agreement
        : `${agreement.name} | ${this.getOriginalFileSizeInMegabytes(
          agreement
        )}`
    }
  },
  watch: {
    isEdit: function (val) {
      if (val === true) {
        Object.keys(this.selectedPlace)
          .filter(key => key in this.newData)
          .forEach(key => {
            this.newData[key] = this.selectedPlace[key]
          })
      }
    }
  },
  methods: {
    ...mapActions({
      showModal: 'modal/show',
      updateUserPlace: 'userRoles/updatePlace'
    }),
    updatePlace: async function () {
      this.loading.update = true

      let newData = this.newData
      const agreementIsString = typeof newData.agreement === 'string'
      newData.agreement = agreementIsString ? undefined : newData.agreement

      const payload = {
        id: this.selectedPlace.id,
        data: newData
      }

      await this.updateUserPlace(payload).catch(error => {
        const graphQLErrors = error.graphQLErrors
        const validation = graphQLErrors
          ? graphQLErrors[0].extensions.validation
          : null
        const errorMessage = validation
          ? validation[Object.keys(validation)[0]][0]
          : 'Wystąpił nieznany błąd'
        this.$toasted.error(errorMessage)
        console.error(error)
      })

      this.isEdit = false
      this.loading.update = false
    },
    deactivatePlace: function () {
      this.showModal({
        componentName: 'DeactivatePlace',
        data: {
          id: this.selectedPlace.id,
          name: this.selectedPlace.name
        }
      })
    },
    processAgreement: async function (event) {
      let file = event.target.files[0]
      if (this.isImage(file)) {
        await this.compressImage(file)
        this.newData.agreement = file
      } else {
        this.$toasted.error('Dozwolone są jedynie obrazy')
      }
    },
    deleteAgreement: function () {
      this.newData.agreement = null
    },
    showAgreement: function () {
      const path = `${API_URL}/storage/files/${this.selectedPlace.agreement}`
      window.open(path, '_blank')
    },
    getOriginalFileSizeInMegabytes: function (file) {
      const fileSizeInMegabytes = file.size / 1000 / 1000
      const sizeIsSmallerThanOne = fileSizeInMegabytes < 1.0
      const fileSizeInfo = sizeIsSmallerThanOne
        ? fileSizeInMegabytes.toFixed(2)
        : fileSizeInMegabytes.toFixed(1)
      return `${fileSizeInfo} MB`
    },
    isImage (file) {
      return file.type.split('/')[0] === 'image'
    },
    compressImage (file) {
      this.$toasted.info('Kompresowanie...')
      const options = {
        maxSizeMB: 5
      }
      return imageCompression(file, options)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../main";

  .settings {
    margin-top: -1rem;
  }

  .settings__el {
    width: 100%;
    display: flex;
    border-radius: 0.5rem;
    overflow: hidden;

    &:not(:last-child) {
      margin-bottom: 1em;
    }
  }

  .settings__title,
  .settings__content {
    padding: 1rem;
    font-weight: 600;
  }

  .settings__title {
    @extend %text--center;
    width: 6rem;
    background: #9394eb;
    color: #fafafc;
  }

  .settings__content {
    @extend %text--center;
    width: calc(100% - 2rem);
    background: #eeeef3;
    color: #91919c;

    span {
      margin-right: 1rem;
    }

    &.settings__pesel {
      @extend %text--center;
      background: #9394eb;
      color: #fafafc;
      cursor: pointer;
    }

    &.button {
      width: 100%;
      background: #9394eb;
      color: #fafafc;
      border-top-left-radius: 0 !important;
      border-bottom-left-radius: 0 !important;
    }

    &.fileinput {
      cursor: pointer;

      input {
        display: none;
      }

      span {
        margin-right: 1rem;
      }
    }

    &--fullcolor {
      background: #9394eb;
      color: #fafafc;
    }

    &--withbutton {
      display: grid;
      grid-template-columns: calc(100% - 4rem) 4rem;
      padding: 0;

      &__info {
        padding: 0.5rem;
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
  }

  input.settings__content {
    color: #3e3e45;
  }

  .settings__actions {
    display: flex;
    width: 100%;

    & > *:not(:first-child) {
      margin-left: 1rem;
    }

    &:not(:last-child) {
      margin-bottom: 1rem;
    }
  }

  .settings__action {
    padding: 1rem !important;
    width: 100% !important;
    background: #eeeef3 !important;
    font-weight: 600;

    &--edit {
      color: #6a6ee1 !important;
    }

    &--cancel {
      color: #c0392b !important;
    }

    &--save {
      color: #27ae60 !important;
    }

    &--lock {
      color: #67676e !important;
    }

    &--delete {
      background: #e74c3c !important;
      color: #fafafa !important;
    }

    span {
      margin-right: 1em;
    }
  }
</style>
