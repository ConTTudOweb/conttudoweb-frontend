import baseMixin from "@/mixins/base";

export default {
  mixins: [
    baseMixin
  ],

  data() {
    return {
      repository: null,
      title: '',
      // headers: [],
      // items: [],
      // fields: [],
      // dialog: false,
      // form: Object.assign({}, {}),
      // validateForm: false,
      loading: false,
      // editedIndex: -1,
      booleanFieldsSlots: [],
      // errorMessage: ''
    }
  },
  // computed: {
  //   formTitle() {
  //     return this.editedIndex === -1 ? 'Novo Item' : 'Editar Item'
  //   }
  // },
  // watch: {
  //   dialog(value) {
  //     if (!value) {
  //       this.$refs.form.resetValidation()
  //       this.form = {}
  //       this.editedIndex = -1
  //     }
  //   }
  // },
  methods: {
    // close() {
    //   this.dialog = false
    // },
    // async load() {
    //   this.items = await this.repository.index()
    // },
    loadTitle() {
      this.title = this.repository.props().title
    }
    // async loadData() {
    //   // this.title = this.repository.props().title
    //   this.loadTitle()
    //   this.headers = this.repository.displayFields()
    //   // this.fields = this.repository.formFields()
    //   this.booleanFieldsSlots = this.repository.booleanDisplayFields()
    //   await this.load()
    // },
    // getItemSlot(field) {
    //   return `item.${field}`
    // },
    // async save() {
    //   if (this.$refs.form.validate()) {
    //     this.loading = true
    //     try {
    //       if (this.editedIndex > -1) {
    //         await this.repository.update(this.form.id, this.form)
    //       } else {
    //         await this.repository.create(this.form)
    //       }
    //       await this.load()
    //       this.loading = false
    //       this.close()
    //       this.$toasted.global.success_save()
    //     } catch (e) {
    //       this.loading = false
    //       this.$toast.global.error_save(e)
    //     }
    //   }
    // },
    // editItem(item) {
    //   this.editedIndex = this.items.indexOf(item)
    //   this.form = Object.assign({}, item)
    //   // this.dialog = true
    // },
    // async deleteItem(item) {
    //   const id = item.id
    //   if (confirm(`Tem certeza que deseja deletar o registro de ID: ${id}?`)) {
    //     await this.repository.delete(id)
    //     await this.load()
    //   }
    // }
  },
  head() {
    return {
      title: this.$t(this.$route.name)
    }
  }
}
