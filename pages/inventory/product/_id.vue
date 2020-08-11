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
                <v-currency-field
                  v-model="form.cost_price"
                  label="Preço de custo"
                  v-bind="propsFields"
                  prefix="R$"
                />
              </v-col>
              <v-col cols="12" sm="4">
                <v-currency-field
                  v-model="form.sale_price"
                  label="Preço de venda"
                  v-bind="propsFields"
                  prefix="R$"
                />
              </v-col>
              <v-col cols="12" sm="4">
                <v-currency-field
                  v-model="form.wholesale_selling_price"
                  label="Preço de venda atacado"
                  v-bind="propsFields"
                  prefix="R$"
                />
              </v-col>
              <v-col v-if="hasCategoryViewPermission()" cols="12">
                <v-autocomplete
                  v-model="form.category"
                  label="Categoria"
                  v-bind="propsFields"
                  :items="categories.results"
                  item-text="str"
                  item-value="id"
                >
                  <template v-slot:append-outer>
                    <v-icon color="warning" @click="loadCategory" tabindex="-1">mdi-sync</v-icon>
                  </template>
                </v-autocomplete>
              </v-col>
              <v-col v-if="hasUnitOfMeasureViewPermission()" cols="12">
                <v-autocomplete
                  v-model="form.unit_of_measure"
                  label="Unidade de medida"
                  v-bind="propsFields"
                  :items="units_of_measure.results"
                  item-text="initials"
                  item-value="id"
                >
                  <template v-slot:append-outer>
                    <v-icon color="warning" @click="loadUnitOfMeasure" tabindex="-1">mdi-sync</v-icon>
                  </template>
                  <template v-slot:item="{ item }">
                    <v-list-item-content>
                      <v-list-item-title v-text="item.initials"></v-list-item-title>
                      <v-list-item-subtitle v-text="item.description"></v-list-item-subtitle>
                    </v-list-item-content>
                  </template>
                </v-autocomplete>
              </v-col>
              <v-col v-if="hasProductSizeRegisterViewPermission()" cols="12">
                <v-autocomplete
                  v-model="form.product_size_register"
                  label="Grade"
                  v-bind="propsFields"
                  :items="product_size_registers.results"
                  item-text="description"
                  item-value="id"
                >
                  <template v-slot:append-outer>
                    <v-icon color="warning" @click="loadProductSizeRegister" tabindex="-1">mdi-sync</v-icon>
                  </template>
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
                  v-if="hasProductBySupplierViewPermission()"
                  key="product_by_supplier"
                >
                  {{ $t('product-by-supplier') }}
                </v-tab>
                <v-tab
                  key="packaging"
                >
                  {{ $t('packaging') }}
                </v-tab>

                <v-tabs-items v-model="tab">
                  <v-tab-item
                    v-if="hasProductBySupplierViewPermission()"
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

                  <v-tab-item
                    key="packaging"
                    class="pa-3"
                  >
                    <v-data-table
                      :items="form.packaging_set"
                      :headers="headers_packaging"
                      class="my-table-subgrid-list"
                    >
                      <template v-slot:body.append="{ headers }">
                        <tr>
                          <td :colspan="headers.length">
                            <v-dialog v-model="dialogPackaging" max-width="500px" persistent>
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
                                <v-form ref="formPackaging" @submit.prevent="savePackaging">
                                  <v-card-title>
                                    <span class="headline">{{ formTitle }}</span>
                                  </v-card-title>

                                  <v-card-text>
                                    <v-container>
                                      <dashboard-form>
                                        <template v-slot:fields>
                                          <v-row>
                                            <v-col cols="12" sm="8">
                                              <v-autocomplete
                                                v-model="editedItem.packaging_type"
                                                label="Tipo de embalagem"
                                                :rules="[rules.required]"
                                                v-bind="propsFields"
                                                :items="packaging_types.results"
                                                item-text="description"
                                                item-value="id"
                                                class="required"
                                                autofocus
                                              ></v-autocomplete>
                                            </v-col>
                                            <v-col cols="12" sm="4">
                                              <v-currency-field
                                                v-model="editedItem.quantity"
                                                label="Quantidade"
                                                v-bind="propsFields"
                                                maxlength="20"
                                              />
                                            </v-col>
                                          </v-row>
                                        </template>
                                      </dashboard-form>
                                    </v-container>
                                  </v-card-text>

                                  <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <dashboard-btn-cancel @click="cancelPackaging()" />
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
                              @click="editPackaging(item)"
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
                              @click="deletePackaging(item)"
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

    if (this.hasCategoryViewPermission()) {
      // this.subcategories = await this.$nuxt.context.app.$subcategoryRepository.index()
      await this.loadCategory()
    }

    if (this.hasUnitOfMeasureViewPermission()) {
      // this.units_of_measure = await this.$nuxt.context.app.$unitOfMeasureRepository.index()
      await this.loadUnitOfMeasure()
    }

    if (this.hasProductSizeRegisterViewPermission()) {
      // this.product_size_registers = await this.$nuxt.context.app.$productSizeRegisterRepository.index()
      await this.loadProductSizeRegister()
    }

    if (this.hasProductBySupplierViewPermission() && this.hasPeopleViewPermission()) {
      this.suppliers = await this.$nuxt.context.app.$peopleRepository.index({filters: 'supplier=true'})
    }

    this.packaging_types = await this.$nuxt.context.app.$packagingTypeRepository.index()
  },
  data() {
    return {
      form: {
        productbysupplier_set: [],
        packaging_set: []
      },
      repository: this.$nuxt.context.app.$productRepository,
      name: 'product',
      categories: [],
      units_of_measure: [],
      product_size_registers: [],
      headers_product_by_supplier: [
        { value: 'supplier__str', text: 'FORNECEDOR' },
        { value: 'reference', text: 'REFERÊNCIA' },
        { value: 'description', text: 'DESCRIÇÃO' },
        { value: '_actions', sortable: false, align: 'center' }
      ],
      headers_packaging: [
        { value: 'packaging_type__str', text: 'TIPO DE EMBALAGEM' },
        { value: 'quantity', text: 'QUANTIDADE' },
        { value: '_actions', sortable: false, align: 'center' }
      ],
      tab: null,
      dialog: false,
      dialogPackaging: false,
      editedItem: {},
      editedIndex: -1,
      suppliers: [],
      packaging_types: []
    }
  },
  watch: {
    dialog(value) {
      if (!value) {
        this.$refs.formProductBySupplier.resetValidation()
        this.editedItem = {}
        this.editedIndex = -1
      }
    },
    dialogPackaging(value) {
      if (!value) {
        this.$refs.formPackaging.resetValidation()
        this.editedItem = {}
        this.editedIndex = -1
      }
    }
  },
  methods: {
    hasCategoryViewPermission () {
      return (this.$auth.user.user_permissions.some(elem => elem === 'inventory.view_category'))
    },
    hasUnitOfMeasureViewPermission () {
      return (this.$auth.user.user_permissions.some(elem => elem === 'inventory.view_unitofmeasure'))
    },
    hasProductSizeRegisterViewPermission () {
      return (this.$auth.user.user_permissions.some(elem => elem === 'inventory.view_productsizeregister'))
    },
    hasProductBySupplierViewPermission () {
      return (this.$auth.user.user_permissions.some(elem => elem === 'inventory.view_productbysupplier'))
    },
    hasPeopleViewPermission () {
      return (this.$auth.user.user_permissions.some(elem => elem === 'core.view_people'))
    },

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

    editPackaging (item) {
      this.editedIndex = this.form.packaging_set.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogPackaging = true
    },

    deletePackaging (item) {
      const index = this.form.packaging_set.indexOf(item)
      confirm(`Tem certeza que deseja deletar o registro: "${item.packaging_type}"?`) && this.form.packaging_set.splice(index, 1)
    },

    cancelPackaging () {
      this.dialogPackaging = false
    },

    savePackaging () {
      if (this.editedIndex > -1) {
        Object.assign(this.form.packaging_set[this.editedIndex], this.editedItem)
      } else {
        this.form.packaging_set.push(this.editedItem)
      }
      this.cancelPackaging()
    },

    async loadCategory () {
      this.categories = await this.$nuxt.context.app.$categoryRepository.index()
    },

    async loadUnitOfMeasure () {
      this.units_of_measure = await this.$nuxt.context.app.$unitOfMeasureRepository.index()
    },

    async loadProductSizeRegister () {
      this.product_size_registers = await this.$nuxt.context.app.$productSizeRegisterRepository.index()
    }
  }
}
</script>
