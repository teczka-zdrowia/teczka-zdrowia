<template>
  <div class="modal--cp">
    <CreatePlaceComponent />
  </div>
</template>

<script>
import CreatePlaceComponent from "../../ui/CreatePlaceComponent";

import { mapActions, mapGetters } from "vuex";

import "../modal.scss";

export default {
  name: "CreatePlace",
  components: {
    CreatePlaceComponent
  },
  computed: {
    ...mapGetters({
      data: "modal/data"
    })
  },
  methods: {
    ...mapActions({
      hideModal: "modal/hide"
    })
  }
};
</script>