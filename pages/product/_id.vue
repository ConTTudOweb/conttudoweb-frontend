<template>
  <v-container
    id="product-form"
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
                  autofocus
                />
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="form.code"
                  label="Código"
                  v-bind="propsFields"
                  maxlength="20"
                />
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  v-model="form.ncm"
                  label="NCM"
                  v-bind="propsFields"
                  maxlength="8"
                />
              </v-col>
              <v-col cols="12" sm="4">
                <v-text-field
                  v-model="form.cost_price"
                  label="Preço de custo"
                  v-bind="propsFields"
                  type="number"
                  prefix="R$"
                />
              </v-col>
              <v-col cols="12" sm="4">
                <v-text-field
                  v-model="form.sale_price"
                  label="Preço de venda"
                  v-bind="propsFields"
                  type="number"
                  prefix="R$"
                />
              </v-col>
              <v-col cols="12" sm="4">
                <v-text-field
                  v-model="form.wholesale_selling_price"
                  label="Preço de venda atacado"
                  v-bind="propsFields"
                  type="number"
                  prefix="R$"
                />
              </v-col>
              <v-col cols="12">
                <v-autocomplete
                  v-model="form.subcategory"
                  label="Subcategoria"
                  v-bind="propsFields"
                  :items="subcategories.results"
                  item-text="str"
                  item-value="id"
                >
                  <template v-slot:item="{ item }">
                    <v-list-item-content>
                      <v-list-item-title v-text="item.category__description"></v-list-item-title>
                      <v-list-item-subtitle v-text="item.description"></v-list-item-subtitle>
                    </v-list-item-content>
                  </template>
                </v-autocomplete>
              </v-col>
              <v-col cols="12">
                <v-autocomplete
                  v-model="form.unit_of_measure"
                  label="Unidade de medida"
                  v-bind="propsFields"
                  :items="units_of_measure.results"
                  item-text="initials"
                  item-value="id"
                >
                  <template v-slot:item="{ item }">
                    <v-list-item-content>
                      <v-list-item-title v-text="item.initials"></v-list-item-title>
                      <v-list-item-subtitle v-text="item.description"></v-list-item-subtitle>
                    </v-list-item-content>
                  </template>
                </v-autocomplete>
              </v-col>
              <v-col cols="12">
                <v-autocomplete
                  v-model="form.product_size_register"
                  label="Grade"
                  v-bind="propsFields"
                  :items="product_size_registers.results"
                  item-text="description"
                  item-value="id"
                >
                  <template v-slot:item="{ item }">
                    <v-list-item-content>
                      <v-list-item-title v-text="item.description"></v-list-item-title>
                      <v-list-item-subtitle>
                        <span :key="i" v-for="(productsize, i) in item.productsize_set"> / {{ productsize.description }}</span>
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </template>
                </v-autocomplete>
              </v-col>
            </v-row>

            <v-card outlined>
              <v-tabs
                v-model="tab"
              >
                <v-tab
                  key="product_by_supplier"
                >
                  {{ $t('product-by-supplier') }}
                </v-tab>

                <v-tabs-items v-model="tab">
                  <v-tab-item
                    key="product_by_supplier"
                    class="pa-3"
                  >
                    <v-data-table
                      :items="form.productbysupplier_set"
                      :headers="headers_product_by_supplier"
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
                                <v-form ref="formProductBySupplier" @submit.prevent="saveProductBySupplier">
                                    <v-card-title>
                                      <span class="headline">{{ formTitle }}</span>
                                    </v-card-title>

                                    <v-card-text>
                                      <v-container>
                                        <dashboard-form>
                                            <template v-slot:fields>
                                              <v-row>
                                                <v-col cols="12">
                                                  <v-autocomplete
                                                    v-model="editedItem.supplier"
                                                    label="Fornecedor"
                                                    :rules="[rules.required]"
                                                    v-bind="propsFields"
                                                    :items="suppliers.results"
                                                    item-text="name"
                                                    item-value="id"
                                                    class="required"
                                                  ></v-autocomplete>
                                                </v-col>
                                                <v-col cols="12" sm="4">
                                                  <v-text-field
                                                    v-model="editedItem.reference"
                                                    label="Referência"
                                                    v-bind="propsFields"
                                                    maxlength="20"
                                                    autofocus
                                                  />
                                                </v-col>
                                                <v-col cols="12" sm="8">
                                                  <v-text-field
                                                    v-model="editedItem.description"
                                                    label="Descrição"
                                                    v-bind="propsFields"
                                                    maxlength="120"
                                                  />
                                                </v-col>
                                              </v-row>
                                            </template>
                                        </dashboard-form>
                                      </v-container>
                                    </v-card-text>

                                    <v-card-actions>
                                      <v-spacer></v-spacer>
                                      <dashboard-btn-cancel @click="cancelProductBySupplier()" />
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
                              @click="editProductBySupplier(item)"
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
                              @click="deleteProductBySupplier(item)"
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

    this.subcategories = await this.$nuxt.context.app.$subcategoryRepository.index()
    this.units_of_measure = await this.$nuxt.context.app.$unitOfMeasureRepository.index()
    this.product_size_registers = await this.$nuxt.context.app.$productSizeRegisterRepository.index()
    this.suppliers = await this.$nuxt.context.app.$peopleRepository.index({filters: 'supplier=true'})
  },
  data() {
    return {
      form: {
        productbysupplier_set: []
      },
      repository: this.$nuxt.context.app.$productRepository,
      name: 'product',
      subcategories: [],
      units_of_measure: [],
      product_size_registers: [],
      headers_product_by_supplier: [
        { value: 'supplier__str', text: 'FORNECEDOR' },
        { value: 'reference', text: 'REFERÊNCIA' },
        { value: 'description', text: 'DESCRIÇÃO' },
        { value: '_actions', sortable: false, align: 'center' }
      ],
      tab: null,
      dialog: false,
      editedItem: {},
      editedIndex: -1,
      suppliers: []
    }
  },
  watch: {
    dialog(value) {
      if (!value) {
        this.$refs.formProductBySupplier.resetValidation()
        this.editedItem = {}
        this.editedIndex = -1
      }
    }
  },
  methods: {
    editProductBySupplier (item) {
      this.editedIndex = this.form.productbysupplier_set.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteProductBySupplier (item) {
      const index = this.form.productbysupplier_set.indexOf(item)
      confirm(`Tem certeza que deseja deletar o registro: "${item.supplier}"?`) && this.form.productbysupplier_set.splice(index, 1)
    },

    cancelProductBySupplier () {
      this.dialog = false
    },

    saveProductBySupplier () {
      if (this.editedIndex > -1) {
        Object.assign(this.form.productbysupplier_set[this.editedIndex], this.editedItem)
      } else {
        this.form.productbysupplier_set.push(this.editedItem)
      }
      this.cancelProductBySupplier()
    },
  }
}
</script>
