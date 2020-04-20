<template>
  <div
    class="attachment"
    v-on:click="show"
  >
    <span
      aria-hidden="true"
      :class="icon.class"
    />
    {{ data.title }}
  </div>
</template>

<script>
import { API_URL } from '@/apollo/constants'

export default {
  name: 'MainAttachment',
  props: {
    data: {
      type: Object
    }
  },
  methods: {
    show: function () {
      const authorId = this.data.author.id
      const fileName = this.data.file_name
      const path = `${API_URL}/storage/files/${authorId}/${fileName}`
      window.open(path, '_blank')
    }
  },
  computed: {
    icon: function () {
      const icons = [
        {
          type: 'IMAGE',
          class: 'far fa-file-image'
        },
        {
          type: 'VIDEO',
          class: 'far fa-file-video'
        },
        {
          type: 'DOCUMENT',
          class: 'far fa-file-alt'
        },
        {
          type: 'COMPRESSED',
          class: 'far fa-file-archive'
        },
        {
          type: 'OTHER',
          class: 'far fa-file'
        }
      ]

      return icons.find(icon => icon.type === this.data.file_type)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "../../../main.scss";

  .attachment {
    @extend %text--center;
    justify-content: left;
    transition: ease-in-out 0.2s;
    border-radius: 0.5em;
    overflow: hidden;
    cursor: pointer;

    span {
      @extend %text--center;
      width: 1.5rem;
      margin-left: 0;
      margin-right: 1rem;
      padding: 0.5em;
      font-size: 1.5em;
      color: #6a6ee1;
      background: #eeeef3;
      border-radius: 0.5em;
    }

    &:not(:last-child) {
      margin-bottom: 1em;
    }

    &:hover {
      background: #eeeef3;
    }
  }
</style>
