export default {
  data() {
    return {
      form: Object.assign({}, {}),
      validateForm: false,
      propsFields: {
        outlined: true,
        dense: true,
        placeholder: ' ',
        hideDetails: 'auto'
      },
      rules: {
        required: (value) => !!value || 'Campo obrigatório.',
        email: (v) => !v || /.+@.+\..+/.test(v) || 'E-mail inválido.'
      }
    }
  },
  computed: {
    formTitle() {
      return this.$route.params.id > 0 ? 'edit-item' : 'new-item'
    }
  },
  methods: {
    loadData() {
      this.loadTitle()
    },
    cancel() {
      this.$router.push({ name: this.$route.name.replace(/-id/i, '') })
    },
    async save() {
      if (this.$refs.form.validate()) {
        this.loading = true
        try {
          if (this.$route.params.id > 0) {
            await this.repository.update(this.form.id, this.form)
          } else {
            await this.repository.create(this.form)
          }
          // await this.load()
          this.loading = false
          // this.close()
          this.$toasted.global.success_save()
          this.$router.push({ name: this.$route.name.replace(/-id/i, '') })
        } catch (e) {
          this.loading = false
          this.$toast.global.error_save(e)
        }
      }
    }
  }
}
