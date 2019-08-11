<script>
import { mapActions } from "vuex";

export default {
  name: "ForgotPassword",
  methods: {
    ...mapActions({
      showModal: "modal/show"
    })
  },
  created: function() {
    this.router.push({ name: "Auth" });
    this.showModal({
      componentName: "UpdateForgottenPassword",
      data: {
        token: this.$route.params.token,
        email: this.$route.params.email
      }
    });
  }
};
</script>