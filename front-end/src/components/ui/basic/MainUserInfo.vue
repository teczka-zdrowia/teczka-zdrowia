<template>
  <div class="user" v-bind:class="{ clickable: isClickable, big: isBig }" v-on:click="moreInfo(userId)">
    <img class="user__img" v-bind:src="img"/>
    <div class="user__name">{{ name }}</div>
    <div class="user__phone" v-bind:class="{ bigphone: isBigPhone }">
      <a :href="`tel:${phone}`">
        <i class="fas fa-phone"></i>
        Zadzwoń
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "MainUserInfo",
  props: {
    name: {
      type: String
    },
    img: {
      type: String
    },
    phone: {
      type: String
    },
    userId: {
      type: Number
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
    moreInfo: function(id) {
      // TODO
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
    border-radius: .5rem;
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
    border-radius: .5rem;
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
  @extend %text--center;
  grid-area: name;
  font-weight: 700;
  color: #3e3e45;
  justify-content: left;
  max-width: 10em;
  margin-top: auto;
  margin-bottom: 0.33em;
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
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  height: 2rem;
  width: 8rem;
  margin: auto;
  margin-left: 0;
  margin-top: 0;
  a {
    color: #fff;
    margin: auto;
  }
  i {
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
}

</style>