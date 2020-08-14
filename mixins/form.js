export default {
  data() {
    const props_fields = {
      outlined: true,
      dense: true,
      // placeholder: ' ',
      hideDetails: 'auto',
      autoSelectFirst: true
      // chips: true,
      // deletableChips: true
    }
    return {
      form: Object.assign({}, {}),
      validateForm: false,
      propsFields: {
        outlined: true,
        dense: true,
        // placeholder: ' ',
        hideDetails: 'auto',
        autoSelectFirst: true,
        // chips: true,
        // deletableChips: true
      },
      propsAutocomplete: Object.assign({}, props_fields, {
        // clearable: true
      }),
      rules: {
        required: (value) => !!value || 'Campo obrigatório.',
        email: (v) => !v || /.+@.+\..+/.test(v) || 'E-mail inválido.'
      }
    }
  },
  computed: {
    formTitle() {
      const _type = this.$route.params.id > 0 ? 'edit-item' : 'new-item'
      return this.$t(_type) + ' ' + this.$t(this.$route.name)
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
          // No Vuetify quando limpa um combo por exemplo ele coloca o valor undefined ao invés de null
          let _form = this.form
          Object.keys(_form).forEach(function(key) {
            if (_form[key] === undefined) {
              _form[key] = null
            }
          })

          if (this.$route.params.id > 0) {
            await this.repository.update(_form.id, _form)
          } else {
            await this.repository.create(_form)
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
