export default {
  data() {
    return {
      headers: [],
      items: [],
      options: {}
    }
  },
  watch: {
    options: {
      async handler() {
        await this.load()
      },
      deep: true,
    },
  },
  methods: {
    async load() {
      console.log('load...')
      const { sortBy, sortDesc, page, itemsPerPage } = this.options
      console.log('sortBy'+sortBy)
      console.log('sortDesc'+sortDesc)
      console.log('page'+page)
      console.log('itemsPerPage'+itemsPerPage)
      this.items = await this.repository.index(page, itemsPerPage)
    },
    async loadData() {
      // this.title = this.repository.props().title
      this.loadTitle()
      this.headers = this.repository.displayFields()
      // this.fields = this.repository.formFields()
      this.booleanFieldsSlots = this.repository.booleanDisplayFields()
      await this.load()
    },
    getItemSlot(field) {
      return `item.${field}`
    },
    editItem(item) {
      // this.editedIndex = this.items.indexOf(item)
      // this.form = Object.assign({}, item)
      this.$router.push({ path: `${this.$route.path}/${item.id}` })
    },
    async deleteItem(item) {
      const id = item.id
      if (confirm(`Tem certeza que deseja deletar o registro de ID: ${id}?`)) {
        this.loading = true
        try {
          await this.repository.delete(id)
          await this.load()
          this.loading = false
          this.$toasted.global.success_delete()
        } catch (e) {
          this.loading = false
          this.$toast.global.error_delete(e)
        }
      }
    }
  }
}
