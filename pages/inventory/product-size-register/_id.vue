<template>
  <v-container
    id="product-size-register-form"
    fluid
    tag="section"
  >
    <base-material-card :title="formTitle">
      <v-form ref="form" v-model="validateForm" @submit.prevent="save">
        <dashboard-form :title="title" :form-title="formTitle">
          <template v-slot:buttons>
            <dashboard-btn-cancel :disabled="loading" @click="cancel()" />
            <dashboard-btn-save :loading="loading" :disabled="!validateForm" />
          </template>
          <template v-slot:fields>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="form.description"
                  label="Descrição"
                  :rules="[rules.required]"
                  v-bind="propsFields"
                  maxlength="120"
                  class="required"
                />
              </v-col>
            </v-row>

            <v-card outlined>
              <v-tabs
                v-model="tab"
              >
                <v-tab
                  key="product_size"
                >
                  {{ $t('product-sizes') }}
                </v-tab>

                <v-tabs-items v-model="tab">
                  <v-tab-item
                    key="product_size"
                    class="pa-3"
                  >
                    <v-data-table
                      :items="form.productsize_set"
                      :headers="headers_product_size"
                      class="my-table-subgrid-list"
                    >
                      <template v-slot:body.append="{ headers }">
                        <tr>
                          <td :colspan="headers.length">






                            <v-dialog v-model="dialog" max-width="500px" persistent>
                              <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                  text
                                  small
                                  color="info"
                                  v-bind="attrs"
                                  v-on="on"
                                  class="text-overline"
                                ><v-icon>mdi-plus-circle</v-icon>{{ $t('add-row') }}</v-btn>
                              </template>


                              <v-card>
                                <v-form ref="formProductSize" @submit.prevent="saveProductSize">
                                    <v-card-title>
                                      <span class="headline">{{ formTitle }}</span>
                                    </v-card-title>

                                    <v-card-text>
                                      <v-container>
                                        <dashboard-form>
                                            <template v-slot:fields>
                                              <v-row>
                                                <v-col cols="12" sm="6" md="4">
                                                  <v-text-field
                                                    v-model="editedItem.description"
                                                    label="Descrição"
                                                    :rules="[rules.required]"
                                                    v-bind="propsFields"
                                                    maxlength="6"
                                                    class="required"
                                                    autofocus
                                                  />
                                                </v-col>
                                              </v-row>
                                            </template>
                                        </dashboard-form>
                                      </v-container>
                                    </v-card-text>

                                    <v-card-actions>
                                      <v-spacer></v-spacer>
                                      <dashboard-btn-cancel @click="cancelProductSize()" />
                                      <dashboard-btn-save />
                                    </v-card-actions>
                                </v-form>
                              </v-card>
                            </v-dialog>





                          </td>
                        </tr>
                      </template>
                      <template v-slot:item._actions="{ item }">
                        <v-tooltip top>
                          <template v-slot:activator="{ on }">
                            <v-icon
                              class="ma-2"
                              color="yellow darken-2"
                              @click="editProductSize(item)"
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
                              class="ma-2"
                              color="red lighten-2"
                              @click="deleteProductSize(item)"
                              v-on="on"
                            >
                              mdi-delete
                            </v-icon>
                          </template>
                          <span>Remover</span>
                        </v-tooltip>
                      </template>
                    </v-data-table>
                  </v-tab-item>
                </v-tabs-items>
              </v-tabs>
            </v-card>

          </template>
        </dashboard-form>
      </v-form>
    </base-material-card>
  </v-container>
</template>

<script>
import crudMixin from "@/mixins/crud";
import formMixin from "@/mixins/form";

export default {
  layout: 'Admin',
  components: {
    DashboardForm: () => import('~/components/Form'),
    DashboardBtnCancel: () => import('~/components/BtnCancel'),
    DashboardBtnSave: () => import('~/components/BtnSave')
  },
  mixins: [crudMixin, formMixin],
  validate({ params }) {
    return !isNaN(+params.id) || params.id === 'add'
  },
  async fetch() {
    const { id } = this.$route.params
    if (id > 0) {
      this.form = await this.repository.show(id)
    }
    this.loadTitle()
  },
  data() {
    return {
      form: {
        productsize_set: []
      },
      repository: this.$nuxt.context.app.$productSizeRegisterRepository,
      name: 'product-size-register',
      headers_product_size: [
        { value: 'description', text: 'DESCRIÇÃO' },
        { value: '_actions', sortable: false, align: 'center' }
      ],
      tab: null,
      dialog: false,
      editedItem: {},
      editedIndex: -1
    }
  },
  watch: {
    dialog(value) {
      if (!value) {
        this.$refs.formProductSize.resetValidation()
        this.editedItem = {}
        this.editedIndex = -1
      }
    }
  },
  methods: {
    editProductSize (item) {
      this.editedIndex = this.form.productsize_set.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteProductSize (item) {
      const index = this.form.productsize_set.indexOf(item)
      confirm(`Tem certeza que deseja deletar o registro: "${item.description}"?`) && this.form.productsize_set.splice(index, 1)
    },

    cancelProductSize () {
      this.dialog = false
    },

    saveProductSize () {
      if (this.editedIndex > -1) {
        Object.assign(this.form.productsize_set[this.editedIndex], this.editedItem)
      } else {
        this.form.productsize_set.push(this.editedItem)
      }
      this.cancelProductSize()
    },
  }
}
</script>
