<script>
import { mapActions } from 'vuex'

export default {
  name: 'PasswordReset',
  methods: {
    ...mapActions({
      showModal: 'modal/show'
    })
  },
  mounted: function () {
    this.showModal({
      componentName: 'UpdateForgottenPassword',
      data: {
        token: this.$route.params.token,
        email: this.$route.params.email
      }
    })
    this.$router.push({ name: 'Auth' })
  }
}
</script>
