<template>
  <div>
    <v-row>
      <v-col>
        <p v-if="$fetchState.error">
          Erro ao carregar {{ title }}:
          {{ $fetchState.error.message }}
        </p>
        <v-data-table
          v-else
          :items="items"
          :headers="headers"
          :loading="$fetchState.pending"
          class="my-table-grid-list"
        >
          <template
            v-for="(field, i) in booleanFieldsSlots"
            v-slot:[getItemSlot(field)]="{ item }"
          >
            <template v-if="item[field] === true">
              <v-icon :key="`${i}-${item.id}`" color="green">mdi-check</v-icon>
            </template>
            <template v-else>
              <v-icon :key="`${i}-${item.id}`" color="red">mdi-close</v-icon>
            </template>
          </template>
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title v-text="title" />
              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" fullscreen scrollable>
                <template v-slot:activator="{ on }">
                  <v-btn color="primary" v-on="on"
                    ><v-icon>mdi-plus-circle</v-icon>Adicionar</v-btn
                  >
                </template>
                <v-form
                  ref="form"
                  v-model="validateForm"
                  @submit.prevent="save"
                >
                  <v-card title>
                    <v-toolbar flat color="primary">
                      <v-btn icon @click="dialog = false">
                        <v-icon>mdi-close</v-icon>
                      </v-btn>
                      <v-toolbar-title
                        >{{ title }}<br />
                        <small>{{ formTitle }}</small></v-toolbar-title
                      >
                      <v-spacer></v-spacer>
                      <v-toolbar-items>
                        <v-btn
                          :loading="loading"
                          :disabled="!validateForm"
                          color="blue darken-1"
                          text
                          type="submit"
                        >
                          Salvar
                        </v-btn>
                      </v-toolbar-items>
                    </v-toolbar>

                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-col
                            v-for="(f, i) in repository.formFields()"
                            :key="i"
                            :cols="f.xs || 12"
                            :sm="f.sm"
                            :md="f.md"
                            :lg="f.lg"
                            :xl="f.xl"
                          >
                            <v-text-field
                              v-if="f.type === 'v-text-field'"
                              v-model="form[f.field]"
                              :rules="f.rules"
                              :label="f.label"
                              :autofocus="f.autofocus"
                              placeholder=" "
                              class="my-field"
                              outlined
                              dense
                            ></v-text-field>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        :disabled="loading"
                        color="red darken-1"
                        text
                        @click="close"
                      >
                        Cancelar
                      </v-btn>
                      <v-btn
                        :loading="loading"
                        :disabled="!validateForm"
                        color="blue darken-1"
                        text
                        type="submit"
                      >
                        Salvar
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-form>
              </v-dialog>
            </v-toolbar>
          </template>
          <template v-slot:item._actions="{ item }">
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-icon small class="mr-2" @click="editItem(item)" v-on="on">
                  mdi-pencil
                </v-icon>
              </template>
              <span>Editar</span>
            </v-tooltip>
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-icon small @click="deleteItem(item)" v-on="on">
                  mdi-delete
                </v-icon>
              </template>
              <span>Remover</span>
            </v-tooltip>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  props: {
    repository: {
      type: Object,
      required: true
    }
  },
  fetch() {
    this.title = this.repository.props().title
    this.headers = this.repository.displayFields()
    this.booleanFieldsSlots = this.repository.booleanDisplayFields()
    this.load()
  },
  data() {
    return {
      // repository: this.$nuxt.context.app.$federativeUnitRepository,
      title: '',
      headers: [],
      booleanFieldsSlots: [],
      items: [],
      dialog: false,
      loading: false,
      editedIndex: -1,
      form: {},
      validateForm: false
    }
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Novo Item' : 'Editar Item'
    }
  },
  watch: {
    dialog(value) {
      if (!value) {
        this.$refs.form.resetValidation()
      }
    }
  },
  methods: {
    getItemSlot(field) {
      return `item.${field}`
    },
    async load() {
      this.items = await this.repository.index()
    },
    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.form = {}
        this.editedIndex = -1
      })
    },
    async save() {
      if (this.$refs.form.validate()) {
        this.loading = true
        try {
          if (this.editedIndex > -1) {
            await this.repository.update(this.form.id, this.form)
          } else {
            await this.repository.create(this.form)
          }
          await this.load()
          this.loading = false
          this.close()
          this.$toasted.global.success_save()
        } catch (e) {
          this.loading = false
          this.$toast.global.error_save(e)
        }
      }
    },
    editItem(item) {
      this.editedIndex = this.items.indexOf(item)
      this.form = Object.assign({}, item)
      this.dialog = true
    },
    async deleteItem(item) {
      const id = item.id
      if (confirm(`Tem certeza que deseja deletar o registro de ID: ${id}?`)) {
        await this.repository.delete(id)
        await this.load()
      }
    }
  },
  head() {
    return {
      title: this.repository.props().title
    }
  }
}
</script>

<style>
.my-field label {
  text-transform: capitalize;
}
</style>
