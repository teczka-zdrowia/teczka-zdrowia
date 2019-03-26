<template>
  <div class="management">
    <div>
      <Block class="management__block" title="Ustawienia">
        <div class="settings">
          <div class="settings__el">
            <div class="settings__title">
              <span>Nazwa</span>
            </div>
            <div class="settings__content" v-if="!isEdit">{{ data.name }}</div>
            <input
              v-if="isEdit"
              v-model="newData.name"
              class="settings__content"
              type="text"
              name="name"
              placeholder="MedMax"
              required
            >
          </div>
          <div class="settings__el">
            <div class="settings__title">
              <span>Adres</span>
            </div>
            <div class="settings__content" v-if="!isEdit">{{ data.address }}</div>
            <input
              v-if="isEdit"
              v-model="newData.address"
              class="settings__content"
              type="text"
              name="name"
              placeholder="Kwiatowa 4"
              required
            >
          </div>
          <div class="settings__el">
            <div class="settings__title">
              <span>Miasto</span>
            </div>
            <div class="settings__content" v-if="!isEdit">{{ data.city }}</div>
            <input
              v-if="isEdit"
              v-model="newData.city"
              class="settings__content"
              type="text"
              name="name"
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
              <i class="fas fa-pen"></i>
              Edytuj
            </MainBtn>
            <MainBtn
              class="settings__action settings__action--cancel"
              v-on:click.native="isEdit = false"
              v-if="isEdit"
            >
              <i class="fas fa-times"></i>
              Anuluj
            </MainBtn>
            <MainBtn
              class="settings__action settings__action--save"
              v-on:click.native="isEdit = false"
              v-if="isEdit"
            >
              <i class="fas fa-check"></i>
              Zapisz
            </MainBtn>
          </div>
          <div class="settings__actions">
            <MainBtn
              class="settings__action settings__action--lock"
            >
              <i class="fas fa-lock"></i>
              Ukryj
            </MainBtn>
            <MainBtn class="settings__action settings__action--delete">
              <i class="far fa-trash-alt"></i>
              Usuń
            </MainBtn>
          </div>
        </div>
      </Block>
      <Block class="management__block" title="Statystyki">
        <div class="stats">
          <MainSelect class="stats__select">
            <option selected>Ten tydzień</option>
            <option>Poprzedni tydzień</option>
            <option>Ostatnie 30 dni</option>
            <option>Ostatnie 90 dni</option>
            <option>Ostatni rok</option>
          </MainSelect>
          <div class="stats__el">
            <div class="stats__title">Obsłużonych pacjentów:</div>
            <div class="stats__data">32</div>
          </div>
          <div class="stats__el">
            <div class="stats__title">Wizyt:</div>
            <div class="stats__data">48</div>
          </div>
          <div class="stats__el">
            <div class="stats__title">Najaktywniejszy pracownik:</div>
            <div class="stats__data">Anna Kowalska</div>
          </div>
        </div>
      </Block>
    </div>
    <div class="management__workers">
      <div class="workers__block">Pracownicy</div>
      <div class="workers__actions">
        <MainBtn class="actions__btn">
          <i class="fas fa-plus"></i>
          Nowy
        </MainBtn>
        <MainSearch class="workers__search">
          <input class="input" slot="input" type="text" placeholder="  Szukaj">
          <div class="select" slot="select">
            <label>
              Sortuj:
              <select>
                <option selected>A - Z</option>
                <option>Z - A</option>
              </select>
            </label>
          </div>
        </MainSearch>
      </div>
      <MainUser :userType="1"/>
      <MainUser :userType="1"/>
      <MainUser :userType="2"/>
      <MainUser :userType="2"/>
      <MainUser :userType="2"/>
      <MainUser :userType="2"/>
    </div>
  </div>
</template>

<script>
import MainBtn from "../../components/ui/basic/MainBtn";
import MainSearch from "../../components/ui/basic/MainSearch";
import MainUser from "../../components/ui/basic/MainUser";
import MainSelect from "../../components/ui/basic/MainSelect";
import WhiteFunctionalBlock from "../../components/ui/blocks/WhiteFunctionalBlock";

export default {
  name: "Management",
  components: {
    Block: WhiteFunctionalBlock,
    MainSelect,
    MainUser,
    MainSearch,
    MainBtn
  },
  data: function() {
    return {
      isEdit: false,
      data: {},
      newData: {}
    };
  },
  mounted() {
    this.data = Object.assign({}, this.$store.getters.selectedPlace);
  },
  watch: {
    isEdit: function(val) {
      if (val === true) {
        this.newData = Object.assign({}, this.data);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../main";

.management {
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 2rem;
}

.workers__block {
  padding: 1rem;
  width: calc(100% - 2rem);
  margin-bottom: 1rem;
  background: #fdfdfd;
  box-shadow: 0 0 20px 0px rgba(213, 213, 213, 0.3);
  border-radius: 0.5rem;
  color: #3e3e45;
  text-align: center;
  font-weight: 700;
  font-size: 1.5em;
}

.management__block {
  padding: 1rem;
  &:not(:last-child) {
    margin-bottom: 1rem;
  }
  .block__top {
    margin-bottom: 1rem;
  }
}

.management__workers {
  & > div:not(:last-child) {
    margin-bottom: 1rem;
  }
}

.workers__actions {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  width: calc(100% - 2rem);
  margin-bottom: 1rem;
  background: #fdfdfd;
  box-shadow: 0 0 20px 0px rgba(213, 213, 213, 0.3);
  border-radius: 0.5rem;
}

.actions__btn {
  height: 100%;
  padding: 0.75rem;
  margin-right: 1rem;
  i {
    margin-right: 0.75rem;
  }
}

.settings,
.stats {
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
    color: #eeeef3 !important;
    background: #67676e !important;
  }
  &--delete {
    background: #e74c3c !important;
    color: #fafafa !important;
  }
  i {
    margin-right: 1em;
  }
}

.stats__select {
  border-bottom-left-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
  width: 100%;
  text-align-last: center;
}

.stats__el {
  display: flex;
  flex-direction: column;
  font-weight: 600;
  background: #eeeef3;
  &:not(:last-child) {
    border-bottom: 1px solid rgba(213, 213, 213, 0.6);
  }
  &:last-child {
    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
  }
}

.stats__title,
.stats__data {
  padding: 0.75rem 0;
  text-align: center;
}

.stats__title {
  color: #67676e;
}

.stats__data {
  color: #3e3e45;
}

@media only screen and (min-width: 960px) {
  .management {
    grid-template-columns: 1fr 1fr;
    grid-gap: 1rem;
  }
}
</style>