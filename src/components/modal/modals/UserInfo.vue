<template>
  <div class="modal--ui">

    <div class="modal--ui__content">
      <div class="modal--ui__top">
        <img
          class="modal--ui__img"
          :alt="user.name"
          :src="user.avatar ? `${apiUrl}/storage/avatars/${user.avatar}` : '/static/img/icons/avatar.png'"
        >
        <div class="modal--ui__name">
          <span>{{ user.name }}</span>
        </div>
      </div>
      <div class="modal--ui__info">
        <div class="modal--ui__info__el">
          <span
            aria-hidden="true"
            class="fas fa-phone"
          />
          <a :href="`tel:${ user.phone }`">
            {{ user.phone }}</a>
        </div>
        <div class="modal--ui__info__el">
          <span
            aria-hidden="true"
            class="far fa-envelope"
          />
          <a :href="`mailto:${ user.email }`">
            {{ user.email }}</a>
        </div>

        <div class="modal--ui__info__el">
          <router-link
            :to="`/PatientFile/${user.id}`"
            v-on:click.native="hideModal"
          >
            <span
              aria-hidden="true"
              class="fas fa-file-medical"
            />
            Kartkoteka</router-link>
        </div>

        <div
          class="modal__actions fullwidth modal--ui__info__el"
          v-if="data.role.permission_type && !viewerIsUser"
        >
          <MainSelect
            class="modal--ui__select"
            :disable="loading.permission"
            v-on:change.native="changePermissionType($event)"
          >
            <option
              :selected="data.role.permission_type === 'ADMIN'"
              value="ADMIN"
            >&#xf521;&nbsp;&nbsp;&nbsp;Administrator</option>
            <option
              :selected="data.role.permission_type === 'EMPLOYEE'"
              value="EMPLOYEE"
            >&#xf007;&nbsp;&nbsp;&nbsp;Pracownik</option>
          </MainSelect>
        </div>
      </div>
      <MainBtn
        v-if="data.role.permission_type && !viewerIsUser"
        :loading="loading.delete"
        :disable="loading.delete"
        color="#fafafa"
        v-on:click.native="deleteRole"
        class="modal__btn fullwidth modal__btn--red"
      >Usuń</MainBtn>
      <MainBtn
        v-if="data.editAffiliation && !data.role.is_active && !viewerIsUser"
        :loading="loading.activate"
        :disable="loading.activate"
        color="#fafafa"
        v-on:click.native="activateRole"
        class="modal__btn fullwidth modal__btn--green"
      >Aktywuj</MainBtn>
      <MainBtn
        v-if="data.editAffiliation && data.role.is_active && !viewerIsUser"
        :loading="loading.activate"
        :disable="loading.activate"
        color="#fafafa"
        v-on:click.native="deactivateRole"
        class="modal__btn fullwidth modal__btn--violet"
      >Dezaktywuj</MainBtn>
      <MainBtn
        class="modal__btn fullwidth modal__btn--grey"
        type="button"
        v-on:click.native="hideModal"
      >Zamknij</MainBtn>
    </div>
  </div>
</template>

<script>
import MainSelect from '../../ui/basic/MainSelect'
import MainBtn from '../../ui/basic/MainBtn'
import { API_URL } from '@/apollo/constants'
import { mapActions, mapGetters } from 'vuex'
import '../modal.scss'

export default {
  name: 'PatientInfo',
  data: function () {
    return {
      apiUrl: API_URL,
      loading: {
        delete: false,
        activate: false,
        permission: false
      }
    }
  },
  components: {
    MainSelect,
    MainBtn
  },
  computed: {
    ...mapGetters({
      data: 'modal/data',
      loggedInUser: 'userInfo/full'
    }),
    user: function () {
      return this.data.role.user
    },
    viewerIsUser: function () {
      return this.loggedInUser.id === this.user.id
    }
  },
  methods: {
    ...mapActions({
      hideModal: 'modal/hide',
      updatePatientRole: 'placePatients/updateRole',
      deletePatientRole: 'placePatients/deleteRole',
      updateEmployeeRole: 'placeEmployees/updateRole',
      deleteEmployeeRole: 'placeEmployees/deleteRole'
    }),
    updateRole: async function (payload) {
      const updateEmployee = this.data.role.permission_type !== undefined

      if (updateEmployee) {
        await this.updateEmployeeRole(payload)
          .then(() => {
            this.$toasted.success('Pomyślnie zaktualizowano pracownika')
          })
          .catch(error => {
            console.error(error)
            this.$toasted.error('Wystąpił błąd')
          })
      } else {
        await this.updatePatientRole(payload)
          .then(() => {
            this.$toasted.success('Pomyślnie zaktualizowano pacjenta')
          })
          .catch(error => {
            console.error(error)
            this.$toasted.error('Wystąpił błąd')
          })
      }
    },
    deleteRoleById: async function (payload) {
      const updateEmployee = this.data.role.permission_type !== undefined

      if (updateEmployee) {
        await this.deleteEmployeeRole(payload)
          .then(() => {
            this.$toasted.success('Pomyślnie usunięto pracownika')
          })
          .catch(error => {
            console.error(error)
            this.$toasted.error('Wystąpił błąd')
          })
      } else {
        await this.deletePatientRole(payload)
          .then(() => {
            this.$toasted.success('Pomyślnie usunięto pacjenta')
          })
          .catch(error => {
            console.error(error)
            this.$toasted.error('Wystąpił błąd')
          })
      }
    },
    activateRole: async function () {
      const payload = {
        id: this.data.role.id,
        data: {
          is_active: true
        }
      }

      this.loading.activate = true

      await this.updateRole(payload)

      this.loading.activate = false
    },
    deactivateRole: async function () {
      const payload = {
        id: this.data.role.id,
        data: {
          is_active: false
        }
      }

      this.loading.activate = true

      await this.updateRole(payload)

      this.loading.activate = false
    },
    deleteRole: async function () {
      this.loading.delete = true

      await this.deleteRoleById(this.data.role.id)

      this.loading.delete = false
      this.hideModal()
    },
    changePermissionType: async function (event) {
      const newPermission = event.target.value
      const payload = {
        id: this.data.role.id,
        data: {
          permission_type: newPermission
        }
      }

      this.loading.permission = true

      await this.updateRole(payload)

      this.loading.permission = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../main";

.modal--ui {
  &__top {
    padding: 1rem;
    width: calc(100% - 2rem);
    color: #3e3e45;
    font-weight: 700;
    text-align: center;
    background: #ececec;
    font-size: 1.5rem;
    display: flex;
    height: 6rem;
  }
  &__img {
    display: block;
    width: 4rem;
    margin: auto 0;
    border-radius: 1rem;
    border: 5px solid #fafafa;
    margin-right: 1rem;
  }
  &__name {
    @extend %text--center;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
  }
  &__content {
    border-radius: 0.5em;
    box-shadow: 0 0 20px 0px rgba(213, 213, 213, 0.3);
    background: #fafafc;
    overflow: hidden;
  }
  &__info {
    padding: 1.5rem;
    &__title {
      font-size: 1.25rem;
      font-weight: 600;
      padding-bottom: 0.5rem;
    }
    &__el {
      padding: 0.5rem 0;
      display: flex;
      & > span {
        padding: 1rem;
        border-radius: 0.5rem;
        background: #ececec;
      }
      a {
        margin-left: 1rem;
        font-weight: 600;
        padding: 1rem;
        border-radius: 0.5rem;
        background: #f5f5f5;
        width: 100%;
        transition: 0.2s ease-in-out;
        &:only-child {
          margin-left: 0;
          background: #ececec;
          text-align: center;
          span {
            margin-right: 1rem;
          }
        }
        &:hover {
          filter: brightness(95%);
        }
      }
    }
  }
  &__select {
    font-family: $font-awesome, Montserrat;
    width: 100%;
    &--gold {
      color: #f1c40f !important;
    }
    &--violet {
      color: #6a6ee1 !important;
    }
    option {
      font-weight: 600;
      &::first-letter {
        margin-right: 1rem;
      }
    }
    &::first-letter {
      margin-right: 1rem;
    }
  }
}
</style>
