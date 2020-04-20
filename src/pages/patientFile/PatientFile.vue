<template>
  <div class="patientfile">
    <div class="about">
      <div class="about__top">
        <MainBaseInfo
          class="about__base"
          v-if="patient"
          :canEdit="false"
          :canShowPesel="false"
          :data="patient"
        />
      </div>
    </div>
    <div class="history">
      <PatientHistory
        v-if="patient"
        :patient="patient"
      />
    </div>
    <GreyBlock
      class="patientfile__info patientfile__info--loading"
      v-if="!patient"
    >Ładowanie
      <MainLoading color="#67676e"/>
    </GreyBlock>
  </div>
</template>

<script>
import { apolloClient } from '@/apollo'
import { USER_BY_ID_QUERY } from '@/graphql/queries/_index'
import MainBaseInfo from '../../components/ui/basic/MainBaseInfo'
import PatientHistory from './PatientHistory'
import MainLoading from '../../components/ui/basic/MainLoading'
import GreyBlock from '../../components/ui/blocks/GreyBlock'

export default {
  name: 'PatientFile',
  data: function () {
    return {
      patient: null
    }
  },
  mounted: function () {
    apolloClient
      .query({
        query: USER_BY_ID_QUERY,
        variables: {
          id: this.$route.params.id
        }
      })
      .then(data => data.data.user)
      .then(user => {
        if (user) {
          this.patient = user
        } else {
          throw new Error('User does not exist')
        }
      })
      .catch(error => {
        console.error(error)
        this.$toasted.error('Nie znaleziono użytkownika')
        this.$router.go(-1)
      })
  },
  components: {
    MainBaseInfo,
    PatientHistory,
    MainLoading,
    GreyBlock
  }
}
</script>

<style lang="scss">
  @import "../../main";

  .patientfile__info {
    height: unset;
    padding: 1rem;

    &--loading {
      svg {
        height: 2rem;
        width: 2rem;
        margin-left: 1rem;
      }
    }
  }

  .about__top {
    display: flex;
    width: 100%;
  }

  .about__actions {
    margin-left: 2em;
    width: calc(37% - 2em);
    height: auto;

    .block__content {
      height: 100%;
      display: flex;
      flex-direction: column;

      & > span {
        height: calc(33% + 1rem);
        margin-bottom: 1rem;
        width: 100%;

        &::after {
          content: "Ustawienia";
          margin-left: 0.75em;
          font-family: Montserrat;
          font-weight: 600;
          font-size: 0.75em;
        }
      }
    }
  }

  .actions__settings {
    @extend %text--center;
    background: #eeeef3;
    height: 100%;
    width: 33%;
    font-size: 1.5em;
    color: #3e3e45;
    cursor: pointer;
    border-radius: 0.5rem;
    margin-right: 1rem;

    &::before {
      transition: transform 0.2s ease-in-out;
    }

    &:hover {
      &::before {
        transform: rotate(90deg);
      }
    }
  }

  .actions__buttons {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
  }

  .action {
    width: 100%;
    height: 100%;
    border-radius: 0.5rem;
    background: #eeeef3;
    display: flex;
    font-weight: 600;
    overflow: hidden;
    cursor: pointer;
    transition: 0.2s ease-in-out;

    span {
      @extend %text--center;
      background: #9394eb;
      color: #fafafc;
      padding: 0 1rem;
    }

    .action__title {
      @extend %text--center;
      color: #6a6ee1;
      margin: auto;
    }

    &:not(:last-child) {
      margin-bottom: 1rem;
    }

    &.action--red {
      @extend %text--center;
      background: transparent;
      color: #d91e18;
      font-weight: 700;
      border: 3px solid #d91e18;
      width: calc(100% - 6px);
      height: calc(100% - 6px);
      transition: 0.2s ease-in-out;

      &:hover {
        background: #d91e18;
        color: #fafafc;
      }
    }

    &:hover {
      background: #9394eb;

      i:before {
        content: "\f023";
      }

      .action__title {
        color: #fafafc;
      }
    }
  }

  @media only screen and (max-width: 959px) {
    .about__top {
      display: block;
    }
    .about__actions {
      margin-left: 0;
      width: calc(100% - 4rem);

      .block__content {
        height: 12em;
      }
    }
  }
</style>
