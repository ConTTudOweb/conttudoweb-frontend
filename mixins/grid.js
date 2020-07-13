export default {
  data() {
    return {
      headers: [],
      items: [],
      totalItems: 0,
      options: {},
      search: ''
    }
  },
  watch: {
    options: {
      async handler() {
        await this.load()
      },
      deep: true
    },
    search: {
      async handler() {
        await this.load()
      },
      deep: true
    }
  },
  methods: {
    async load() {
      const { sortBy, sortDesc, page, itemsPerPage } = this.options
      const { results, count } = await this.repository.index(
        page,
        itemsPerPage,
        sortBy,
        sortDesc,
        this.search
      )
      this.items = results
      this.totalItems = count
    },
    async loadData() {
      this.loadTitle()
      this.headers = this.repository.displayFields()
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
