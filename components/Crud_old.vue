<template>
  <v-layout column justify-center align-center>
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
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>
            <h1 v-text="title" />
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-dialog v-model="dialog">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark class="mb-2" v-on="on"
                >Adicionar</v-btn
              >
            </template>
            <v-form ref="form" v-model="validateForm" @submit.prevent="save">
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>

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
                        <component
                          :is="f.type"
                          v-model="form[f.field]"
                          :rules="f.rules"
                          :label="f.label"
                          :class="['my-field', { 'my-focus': i === 0 }]"
                        ></component>
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
        <v-icon small class="mr-2" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon small @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
  </v-layout>
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
    // this.items = await this.repository.index()
    this.load()
  },
  data() {
    return {
      title: '',
      headers: [],
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
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error(e)
          // this.erro = true
          this.loading = false
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
  }
}
</script>

<style>
.my-table-grid-list thead {
  text-transform: uppercase;
}

.my-field label {
  text-transform: capitalize;
}
</style>
