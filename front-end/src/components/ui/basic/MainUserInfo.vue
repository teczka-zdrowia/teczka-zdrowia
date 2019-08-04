<template>
  <div
    class="user"
    v-bind:class="{ clickable: isClickable, big: isBig }"
    v-on:click="moreInfo"
  >
    <img
      class="user__img"
      :alt="data.name"
      :src="data.avatar ? `${apiUrl}/storage/avatars/${data.avatar}` : '/static/img/icons/avatar.png'"
      v-on:click="moreInfo"
    />
    <div
      class="user__name"
      v-on:click="moreInfo"
    >{{ data.name }}</div>
    <div
      class="user__phone"
      v-bind:class="{ bigphone: isBigPhone }"
    >
      <a :href="`tel:${data.phone}`">
        <span
          aria-hidden="true"
          class="fas fa-phone"
        />
        Zadzwoń
      </a>
    </div>
  </div>
</template>

<script>
import { API_URL } from "@/apollo/constants";
import { mapActions } from "vuex";

export default {
  name: "MainUserInfo",
  data: function() {
    return {
      apiUrl: API_URL
    };
  },
  props: {
    data: {
      name: {
        type: String
      },
      avatar: {
        type: String
      },
      phone: {
        type: String
      },
      id: {
        type: Number | String
      }
    },
    type: {
      type: String
    },
    isClickable: {
      type: Boolean,
      default: true
    },
    isBig: {
      type: Boolean,
      default: false
    },
    isBigPhone: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    ...mapActions({
      showModal: "modal/show"
    }),
    moreInfo: function() {
      if (this.isClickable) {
        const isDoctor = this.type === "doctor";
        const componentName = isDoctor ? "DoctorInfo" : "UserInfo";
        const data = {
          hideBorders: true,
          role: {
            user: this.data
          }
        };

        this.showModal({
          componentName: componentName,
          data: data
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../main.scss";

.user {
  display: grid;
  grid-template-columns: 3.5rem auto;
  grid-template-areas:
    "img name"
    "img phone";
  grid-column-gap: 1em;
  height: 3.5rem;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  &.clickable {
    border-radius: 0.5rem;
    &:hover {
      transform: scale(1.05);
      box-shadow: 0 0 60px 0 rgba(145, 145, 156, 0.3);
      .user__img {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
    }
    &:active {
      transform: scale(1.025);
    }
  }
  &.big {
    grid-template-columns: 4em auto;
    height: 4em;
    border-radius: 0.5rem;
    .user__img {
      height: 4em;
    }
    .user__name {
      margin: 0;
    }
  }
}

.user__img {
  grid-area: img;
  height: 3.5rem;
  margin: auto;
  transition: 0.2s ease-in-out;
  border-radius: 1rem;
  filter: drop-shadow(0 0 10px rgba(213, 213, 213, 0.3));
}

.user__name {
  grid-area: name;
  font-weight: 700;
  color: #3e3e45;
  justify-content: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  display: inline;
  margin: auto;
  margin-left: 0;
}

.user__phone {
  @extend %text--center;
  grid-area: phone;
  font-weight: 600;
  -webkit-box-pack: left;
  -ms-flex-pack: left;
  justify-content: left;
  border-radius: 0.5rem;
  background: #27ae60;
  color: #fff;
  display: flex;
  height: 2rem;
  width: 8rem;
  margin: auto;
  margin-left: 0;
  margin-top: 0;
  transition: 0.2s ease-in-out;
  a {
    color: #fff;
    margin: auto;
  }
  span {
    margin-right: 0.5rem;
  }
  &.bigphone {
    @extend %text--center;
    border-bottom-left-radius: 0;
    border-top-right-radius: 0;
    background: #27ae60;
    color: #fff;
    height: 100%;
    width: 100%;
  }
  &:hover {
    background: #229a55;
  }
}
</style>