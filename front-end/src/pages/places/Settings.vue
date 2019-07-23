<template>
  <div class="settings">
    <div class="settings__el">
      <div class="settings__title">
        <span>Nazwa</span>
      </div>
      <div
        class="settings__content"
        v-if="!isEdit"
      >{{ selectedPlace.name }}</div>
      <input
        v-if="isEdit"
        v-model="newData.name"
        class="settings__content"
        type="text"
        name="name"
        minlength="4"
        placeholder="MedMax"
        required
      >
    </div>
    <div class="settings__el">
      <div class="settings__title">
        <span>Adres</span>
      </div>
      <div
        class="settings__content"
        v-if="!isEdit"
      >{{ selectedPlace.address }}</div>
      <input
        v-if="isEdit"
        v-model="newData.address"
        class="settings__content"
        type="text"
        name="name"
        minlength="4"
        placeholder="Kwiatowa 4"
        required
      >
    </div>
    <div class="settings__el">
      <div class="settings__title">
        <span>Miasto</span>
      </div>
      <div
        class="settings__content"
        v-if="!isEdit"
      >{{ selectedPlace.city }}</div>
      <input
        v-if="isEdit"
        v-model="newData.city"
        class="settings__content"
        type="text"
        name="name"
        minlength="4"
        placeholder="Kwiatowa 4"
        required
      >
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
import MainBtn from "../../components/ui/basic/MainBtn";

import { mapActions, mapGetters } from "vuex";

export default {
  name: "Settings",
  components: {
    MainBtn
  },
  data: function() {
    return {
      isEdit: false,
      newData: {
        name: "",
        city: "",
        address: ""
      },
      loading: {
        update: false
      }
    };
  },
  computed: {
    ...mapGetters({
      selectedRole: "userRoles/selected"
    }),
    selectedPlace: function() {
      return this.selectedRole.place;
    }
  },
  watch: {
    isEdit: function(val) {
      if (val === true) {
        Object.keys(this.selectedPlace)
          .filter(key => key in this.newData)
          .forEach(key => {
            this.newData[key] = this.selectedPlace[key];
          });
      }
    }
  },
  methods: {
    ...mapActions({
      showModal: "modal/show",
      updateUserPlace: "userRoles/updatePlace"
    }),
    updatePlace: async function() {
      this.loading.update = true;

      const payload = {
        id: this.selectedPlace.id,
        data: this.newData
      };

      await this.updateUserPlace(payload).catch(error => {
        this.$toasted.error("Wystąpił błąd");
        console.error(error);
      });

      this.isEdit = false;
      this.loading.update = false;
    },
    deactivatePlace: function() {
      this.showModal({
        componentName: "DeactivatePlace",
        data: {
          id: this.selectedPlace.id,
          name: this.selectedPlace.name
        }
      });
    }
  }
};
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
  width: calc(100% - 3rem);
  background: #eeeef3;
  color: #91919c;
  &.settings__pesel {
    @extend %text--center;
    background: #9394eb;
    color: #fafafc;
    cursor: pointer;
  }
  &--fullcolor {
    background: #9394eb;
    color: #fafafc;
  }
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
