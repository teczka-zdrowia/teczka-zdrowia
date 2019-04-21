<template>
  <div>
    <div class="patients__actions">
      <MainBtn
        class="actions__btn"
        v-on:click.native="addNewPatient"
      >
        <span
          aria-hidden="true"
          class="fas fa-plus"
        />
        Nowy
      </MainBtn>
      <MainSearch class="patients__search">
        <input
          class="input"
          slot="input"
          type="text"
          placeholder="  Szukaj"
        >
        <div
          class="select"
          slot="select"
        >
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
    <div class="actions__patients">
      <MainUser
        :name="'Jan Iksiński'"
        :img="'https://www.mendeley.com/careers/getasset/c475b7c0-d36c-4c73-be33-a34030b6ca82/'"
        :phone="'111222333'"
        :isClickable="false"
        :userId="1"
        :editAffiliation="true"
      />
      <MainUser
        :name="'Jan Iksiński'"
        :img="'https://www.mendeley.com/careers/getasset/c475b7c0-d36c-4c73-be33-a34030b6ca82/'"
        :phone="'111222333'"
        :isClickable="false"
        :userId="1"
        :editAffiliation="true"
      />
      <MainUser
        :name="'Jan Iksiński'"
        :img="'https://www.mendeley.com/careers/getasset/c475b7c0-d36c-4c73-be33-a34030b6ca82/'"
        :phone="'111222333'"
        :isClickable="false"
        :userId="1"
        :editAffiliation="true"
      />
      <MainUser
        :name="'Jan Iksiński'"
        :img="'https://www.mendeley.com/careers/getasset/c475b7c0-d36c-4c73-be33-a34030b6ca82/'"
        :phone="'111222333'"
        :isClickable="false"
        :userId="1"
        :editAffiliation="true"
      />
      <MainUser
        :name="'Jan Iksiński'"
        :img="'https://www.mendeley.com/careers/getasset/c475b7c0-d36c-4c73-be33-a34030b6ca82/'"
        :phone="'111222333'"
        :isClickable="false"
        :userId="1"
        :editAffiliation="true"
      />
      <MainUser
        :name="'Jan Iksiński'"
        :img="'https://www.mendeley.com/careers/getasset/c475b7c0-d36c-4c73-be33-a34030b6ca82/'"
        :phone="'111222333'"
        :isClickable="false"
        :userId="1"
        :editAffiliation="true"
      />
      <MainUser
        :name="'Jan Iksiński'"
        :img="'https://www.mendeley.com/careers/getasset/c475b7c0-d36c-4c73-be33-a34030b6ca82/'"
        :phone="'111222333'"
        :isClickable="false"
        :userId="1"
        :editAffiliation="true"
        :isActive="false"
      />
      <MainUser
        :name="'Jan Iksiński'"
        :img="'https://www.mendeley.com/careers/getasset/c475b7c0-d36c-4c73-be33-a34030b6ca82/'"
        :phone="'111222333'"
        :isClickable="false"
        :userId="1"
        :editAffiliation="true"
        :isActive="false"
      />
    </div>
  </div>
</template>

<script>
import MainBtn from "../../components/ui/basic/MainBtn";
import MainSearch from "../../components/ui/basic/MainSearch";
import MainUser from "../../components/ui/basic/MainUser";

import { mapActions, mapGetters } from "vuex";

export default {
  name: "Patients",
  computed: {
    ...mapGetters({
      selectedPlace: "userPlaces/selected"
    })
  },
  methods: {
    ...mapActions({
      showModal: "modal/show",
      setAddPatientPlace: "addPatient/setPlace"
    }),
    addNewPatient: function() {
      this.setAddPatientPlace(this.selectedPlace);
      this.showModal({
        componentName: "AddPatient"
      });
    }
  },
  components: {
    MainUser,
    MainSearch,
    MainBtn
  }
};
</script>

<style lang="scss" scoped>
@import "../../main";

.patients__actions {
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
  span {
    margin-right: 0.75rem;
  }
}

.actions__patients {
  display: grid;
  grid-template-columns: 100%;
  grid-column-gap: 1em;
  row-gap: 1em;
}

.actions__patient {
  @extend %text--center;
  position: relative;
  font-weight: 700;
  color: #3e3e45;
  width: auto;
  overflow: unset;
  text-overflow: unset;
  transition: all 0.2s ease-in-out;
  justify-content: left;
  white-space: nowrap;
  color: #67676e;
  cursor: pointer;
  height: 3.5rem;
  width: calc(100% - 2em);
  padding: 1em;
  border-radius: 0.5em;
  box-shadow: 0 0 20px 0px rgba(213, 213, 213, 0.3);
  background: #fafafc;
  span {
    margin-left: auto;
    padding: 0.5em;
    font-size: 1.5em;
    width: 1em;
    height: 1em;
    text-align: center;
    color: #6a6ee1;
    background: #e6e6e8;
    border-radius: 0.5em;
  }
  &:hover {
    transform: scale(1.025);
    box-shadow: 0 0 60px 0 rgba(145, 145, 156, 0.3);
  }
  &:active {
    transform: scale(1.0125);
  }
  &.disabled {
    background: #eeeef3;
    filter: grayscale(100%);
    i:hover {
      &::before {
        content: "";
      }
    }
  }
}

.options__select {
  display: flex;
  border-radius: 0.5em;
  overflow: hidden;
  width: 50%;
  &:not(:last-child) {
    margin-right: 2em;
  }
}

.select__title,
.select__content {
  width: 50%;
}

.select__title {
  @extend %text--center;
  padding: 0.75rem 1.5rem;
  background: #fafafc;
  color: #6a6ee1;
  font-weight: 600;
}
.select__content {
  font-weight: 600;
  padding: 0.75rem 1.5rem;
  color: #fafafc;
  background: #6a6ee1;
  background: -webkit-gradient(
    linear,
    left top,
    right top,
    from(#9394eb),
    to(#6a6ee1)
  );
  background: linear-gradient(to right, #9394eb, #6a6ee1);
  -webkit-filter: drop-shadow(0 0 10px rgba(213, 213, 213, 0.3));
  filter: drop-shadow(0 0 10px rgba(213, 213, 213, 0.3));
  border: 0;
  option {
    font-weight: 600;
    background: #6a6ee1;
  }
}

@media only screen and (min-width: 960px) {
  .actions__patients {
    grid-template-columns: 1fr 1fr;
  }
  .options__btn {
    &::after {
      content: "Nowy pacjent";
    }
    width: auto;
    padding: 0 1.5rem;
    height: auto;
  }
  .options__select {
    width: unset;
  }
  .select__title,
  .select__content {
    width: unset;
  }
}
</style>