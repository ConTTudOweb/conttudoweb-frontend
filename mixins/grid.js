export default {
  data() {
    return {
      headers: [],
      items: []
    }
  },
  methods: {
    async load() {
      this.items = await this.repository.index()
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
        await this.repository.delete(id)
        await this.load()
      }
    }
  }
}
