<template>
  <section class="people">
    <v-alert
      v-if="$fetchState.error"
      text
      prominent
      type="error"
      icon="mdi-cloud-alert"
      border="left"
      dismissible
    >
      Erro ao carregar {{ title }}:
      <strong>{{ $fetchState.error.message }}</strong>
    </v-alert>

    <v-data-table
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
        <v-toolbar flat>
          <v-toolbar-title v-text="title" />
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" fullscreen scrollable>
            <template v-slot:activator="{ on }">
              <v-btn color="primary" v-on="on"
                ><v-icon>mdi-plus-circle</v-icon>Adicionar</v-btn
              >
            </template>
            <v-form ref="form" v-model="validateForm" @submit.prevent="save">
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
                          :required="f.required"
                          :maxlength="f.maxlength"
                          :autofocus="f.autofocus"
                          placeholder=" "
                          hide-details="auto"
                          class="my-field"
                          v-bind="propsFields"
                        ></v-text-field>
                        <v-autocomplete
                          v-if="f.type === 'v-autocomplete'"
                          v-model="form[f.field]"
                          :items="cities"
                          :rules="f.rules"
                          :label="f.label"
                          :autofocus="f.autofocus"
                          item-text="name"
                          item-value="id"
                          placeholder=" "
                          hide-details="auto"
                          class="my-field"
                          v-bind="propsFields"
                        ></v-autocomplete>
                        <v-checkbox
                          v-else-if="f.type === 'v-checkbox'"
                          v-model="form[f.field]"
                          :rules="f.rules"
                          :label="f.label"
                          :autofocus="f.autofocus"
                          class="my-field"
                          v-bind="propsFields"
                        ></v-checkbox>
                        <v-radio-group
                          v-else-if="f.type === 'v-radio-group'"
                          v-model="form[f.field]"
                          :rules="f.rules"
                          :label="f.label"
                          :autofocus="f.autofocus"
                          class="my-field"
                          v-bind="propsFields"
                          :row="$vuetify.breakpoint.smAndUp"
                        >
                          <v-radio
                            v-for="c in f.choices"
                            :key="`${i}-${c.value}`"
                            :label="c.display_name"
                            :value="c.value"
                          ></v-radio>
                        </v-radio-group>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <c-breakpoint />
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
            <v-icon
              small
              class="mx-1"
              color="yellow darken-2"
              @click="editItem(item)"
              v-on="on"
            >
              mdi-pencil
            </v-icon>
          </template>
          <span>Editar</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-icon
              small
              class="mx-1"
              color="red lighten-2"
              @click="deleteItem(item)"
              v-on="on"
            >
              mdi-delete
            </v-icon>
          </template>
          <span>Remover</span>
        </v-tooltip>
      </template>
    </v-data-table>
  </section>
</template>

<script>
import CBreakpoint from '~/components/application/Breakpoint'
import fieldsMixin from '~/mixins/fields'

export default {
  components: {
    CBreakpoint
  },
  mixins: [fieldsMixin],
  async fetch() {
    await this.load()
    this.cities = await this.$nuxt.context.app.$cityRepository.index()
  },
  data() {
    return {
      // propsFields: {
      //   outlined: true,
      //   dense: true
      // },
      repository: this.$nuxt.context.app.$peopleRepository,
      title: 'Cliente / Fornecedor',
      headers: [
        {
          value: 'id',
          text: 'ID',
          sortable: true
        },
        {
          value: 'customer',
          text: 'CLIENTE?',
          sortable: true
        },
        {
          value: 'supplier',
          text: 'FORNECEDOR?',
          sortable: true
        },
        {
          value: 'name',
          text: 'NOME',
          sortable: true
        },
        {
          value: 'phone',
          text: 'TELEFONE',
          sortable: true
        },
        {
          value: 'email',
          text: 'EMAIL',
          sortable: true
        },
        {
          value: '_actions',
          text: '',
          sortable: false
        }
      ],
      items: [],
      cities: [],
      dialog: false,
      form: {},
      validateForm: false,
      loading: false,
      booleanFieldsSlots: ['customer', 'supplier']
    }
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'Novo Item' : 'Editar Item'
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
      title: this.title
    }
  }
}
</script>
