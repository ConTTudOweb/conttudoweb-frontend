<template>
  <v-container
    id="sale-order-form"
    fluid
    tag="section"
  >
    <base-material-card :title="formTitle">
      <v-form ref="form" v-model="validateForm" @submit.prevent="save">
        <dashboard-form :title="title" :form-title="formTitle">
          <template v-slot:buttons>
            <dashboard-btn-cancel :disabled="loading" @click="cancel()"/>
            <dashboard-btn-save :loading="loading" :disabled="!validateForm"/>
          </template>
          <template v-slot:fields>
            <v-row>
              <v-col cols="12" sm="6" md="4" lg="3">
                <v-text-field
                  v-model="form.date_order"
                  label="Data de emissão"
                  :rules="[rules.required]"
                  v-bind="propsFields"
                  type="date"
                  class="required"
                  autofocus
                />
              </v-col>
              <v-col cols="12">
                <v-autocomplete
                  v-model="form.customer"
                  label="Cliente"
                  v-bind="propsFields"
                  :items="customers"
                  item-text="name"
                  item-value="id"
                >
                  <template v-slot:append-outer>
                    <v-icon color="warning" @click="loadCustomer" tabindex="-1">mdi-sync</v-icon>
                  </template>
                </v-autocomplete>
              </v-col>

              <v-col cols="12" sm="6" md="4" lg="3">
                <v-currency-field
                  v-model="form.discount_percentage"
                  label="% Desconto"
                  v-bind="propsFields"
                  prefix="%"
                />
              </v-col>

            </v-row>

            <v-row>
              <v-col>
                <v-card outlined>
                  <v-tabs
                    v-model="tab"
                  >
                    <v-tab
                      key="sale_order_items"
                    >
                      {{ $t('sale-order-items') }}
                    </v-tab>

                    <v-tabs-items v-model="tab">
                      <v-tab-item
                        key="sale_order_items"
                        class="pa-3"
                      >
                        <v-data-table
                          :items="form.saleorderitems_set"
                          :headers="headers_sale_order_items"
                          class="my-table-subgrid-list"
                        >
                          <template v-slot:body.append="{ headers }">
                            <tr>
                              <td :colspan="headers.length">

                                <v-dialog v-model="dialog" max-width="890px" persistent>
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                      text
                                      small
                                      color="info"
                                      v-bind="attrs"
                                      v-on="on"
                                      class="text-overline"
                                    >
                                      <v-icon>mdi-plus-circle</v-icon>
                                      {{ $t('add-row') }}
                                    </v-btn>
                                  </template>

                                  <v-card>
                                    <v-form ref="formSaleOrderItems" @submit.prevent="saveSaleOrderItems">
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
                                                    v-model="selectedProduct"
                                                    label="Produto"
                                                    :rules="[rules.required]"
                                                    v-bind="propsFields"
                                                    :items="products"
                                                    item-text="description"
                                                    item-value="id"
                                                    class="required"
                                                    autofocus
                                                  ></v-autocomplete>
                                                </v-col>
                                                <v-col cols="12" sm="3">
                                                  <v-currency-field
                                                    :default-value="null"
                                                    :auto-decimal-mode="false"
                                                    v-model="editedItem.quantity"
                                                    label="Quantidade"
                                                    :rules="[rules.required]"
                                                    v-bind="propsFields"
                                                    class="required"
                                                  />
                                                </v-col>
                                                <v-col cols="12" sm="4">
                                                  <v-currency-field
                                                    v-model="editedItem.price"
                                                    label="Preço"
                                                    :rules="[rules.required]"
                                                    v-bind="propsFields"
                                                    prefix="R$"
                                                    class="required"
                                                  />
                                                </v-col>
                                                <!-- <v-col cols="12" sm="4">
                                                  <v-currency-field
                                                    v-model="editedItem.discount_percentage"
                                                    label="% Desconto"
                                                    v-bind="propsFields"
                                                    prefix="%"
                                                  />
                                                </v-col> -->
                                                <v-col cols="12" sm="5">
                                                  <v-autocomplete
                                                    v-model="selectedPacking"
                                                    label="Embalagem"
                                                    v-bind="propsFields"
                                                    :items="packaging"
                                                    item-text="packaging_type__str"
                                                    item-value="id"
                                                  ></v-autocomplete>
                                                </v-col>
                                              </v-row>
                                            </template>
                                          </dashboard-form>
                                        </v-container>
                                      </v-card-text>

                                      <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <dashboard-btn-cancel @click="cancelSaleOrderItems()"/>
                                        <dashboard-btn-save/>
                                      </v-card-actions>
                                    </v-form>
                                  </v-card>
                                </v-dialog>


                              </td>
                            </tr>
                          </template>
                          <template v-slot:item.price="{ item }">
                            <span>{{ item.price | currency }}</span>
                          </template>
                          <template v-slot:item.volumes="{ item }">
                            <span v-text="getVolumes(item.quantity, item.packaging__quantity)" />
                          </template>
                          <template v-slot:item.net_total="{ item }">
                            <span>{{ item.net_total | currency }}</span>
                          </template>
                          <template v-slot:item._actions="{ item }">
                            <v-tooltip top>
                              <template v-slot:activator="{ on }">
                                <v-icon
                                  class="ma-2"
                                  color="yellow darken-2"
                                  @click="editSaleOrderItems(item)"
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
                                  @click="deleteSaleOrderItems(item)"
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
              </v-col>
            </v-row>

            <v-divider />

            <v-row>
              <v-col class="text-right body-1" cols="12">
                <small><span>TOTAL BRUTO: </span><strong>{{ valor_total_bruto_sale_order | currency }}</strong></small>
                <br>
                <span>TOTAL LÍQUIDO: </span><strong>{{ valor_total_liquido_sale_order | currency }}</strong>
              </v-col>
            </v-row>

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
  validate({params}) {
    return !isNaN(+params.id) || params.id === 'add'
  },
  async fetch() {
    const {id} = this.$route.params
    if (id > 0) {
      this.form = await this.repository.show(id)
    }
    this.loadTitle()

    await this.loadCustomer()

    const { results = [] } = await this.$nuxt.context.app.$productRepository.index()
    this.products = results
  },
  data() {
    return {
      form: {
        saleorderitems_set: []
      },
      repository: this.$nuxt.context.app.$saleOrderRepository,
      name: 'sale-order',
      customers: [],
      // menuDateOrder: false,
      headers_sale_order_items: [
        {value: 'product__str', text: 'PRODUTO'},
        {value: 'quantity', text: 'QUANTIDADE', align: 'end'},
        {value: 'price', text: 'PREÇO', align: 'end'},
        {value: 'volumes', text: 'VOLUMES', align: 'end'},
        {value: 'net_total', text: 'TOTAL LÍQUIDO', align: 'end'},
        {value: '_actions', sortable: false, align: 'center'}
      ],
      tab: null,
      dialog: false,
      editedItem: {},
      editedIndex: -1,
      selectedProduct: null,
      selectedPacking: null,
      _product: null,
      packaging: []
    }
  },

  watch: {
    dialog(value) {
      if (!value) {
        this.$refs.formSaleOrderItems.resetValidation()
        this.selectedPacking = null
        this.selectedProduct = null
        this.editedItem = {}
        this.editedIndex = -1
      }
    },
    selectedPacking(val, oldval) {
      // Entra no if caso a "embalagem tenha sido escolhida"
      // E
      // Esteja "trocando a embalagem do item"  OU  "seja um item novo"
      if (val && ((this.editedIndex > -1 && oldval) || this.editedIndex === -1)) {
        this.editedItem.packaging_type = this.packaging.find(x => x.id === val).packaging_type
        this.editedItem.packaging__quantity = this.packaging.find(x => x.id === val).quantity
      }
    },
    customers(val, oldval) {
      if (this.customers.length === 1 && this.form.customer === undefined) {
        this.form.customer = this.customers[0].id
      }
    },

    // TODO: Criar campo no cliente para definir desconto padrão
    'form.customer'(val, oldval) {
      if (val !== oldval) {
        if (val === 1 && !this.form.discount_percentage) {
          this.form.discount_percentage = 12
        } else if (oldval && val > 1 && this.form.discount_percentage) {
          this.form.discount_percentage = undefined
        }
      }
    },

    selectedProduct(val, oldval) {
      // Entra no if caso o "produto tenha sido escolhido"
      // E
      // Esteja "trocando o produto do item"  OU  "seja um item novo"
      if (val !== null && ((this.editedIndex > -1 && oldval !== null) || this.editedIndex === -1)) {
        this._product = this.products.find(x => x.id === val)
        // this._sale_price = this.products.find(x => x.id === val).sale_price
        // this._product__str = this.products.find(x => x.id === val).description
        this.packaging = this.products.find(x => x.id === val).packaging_set
        if (this.editedItem.price === 0 || confirm(`Deseja alterar o preço de venda de "${this.editedItem.price}" para "${this._product.sale_price}"`)) {
          this.editedItem.price = this._product.sale_price
        }

        if (this.packaging.length === 0) {
          this.selectedPacking = null
        }
        else if (this.packaging.length === 1) {
          this.selectedPacking = this.packaging[0].id
        }
        else if (this.selectedPacking) {
          this.selectedPacking = this.packaging.find(elem => elem.packaging_type === this.editedItem.packaging_type).id
        }
      }
    }
  },
  computed: {
    valor_total_bruto_sale_order() {
      let _total = 0
      this.form.saleorderitems_set.forEach(element => {
        _total += element.gross_total
      });
      return _total
    },
    valor_total_liquido_sale_order() {
      let _total = 0
      this.form.saleorderitems_set.forEach(element => {
        _total += element.net_total
      });
      return _total
    }
  },
  methods: {
    // getTotalBrutoSaleOrderItem(quantity, price) {
    //   return quantity * price
    // },

    getVolumes (qtdItens, capacidade) {
      if (!capacidade) return
      return qtdItens / capacidade
    },

    editSaleOrderItems(item) {
      this.editedIndex = this.form.saleorderitems_set.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.selectedProduct = this.editedItem.product
      if (this.editedItem.packing) {
        this.selectedPacking = this.editedItem.packing
      }
      this.packaging = this.products.find(x => x.id === this.selectedProduct).packaging_set
      this.dialog = true
    },

    deleteSaleOrderItems(item) {
      const index = this.form.saleorderitems_set.indexOf(item)
      confirm(`Tem certeza que deseja deletar o registro: "${item.id}"?`) && this.form.saleorderitems_set.splice(index, 1)
    },

    cancelSaleOrderItems() {
      this.dialog = false
    },

    saveSaleOrderItems() {
      if (this.$refs.formSaleOrderItems.validate()) {
        if (this.editedItem.product !== this.selectedProduct) {
          this.editedItem.product = this.selectedProduct
          this.editedItem.product__str = this._product.description
        }
        if (this.editedItem.packing !== this.selectedPacking) {
          this.editedItem.packing = this.selectedPacking
        }

        if (this.editedIndex > -1) {
          Object.assign(this.form.saleorderitems_set[this.editedIndex], this.editedItem)
        } else {
          this.form.saleorderitems_set.push(this.editedItem)
        }
        this.cancelSaleOrderItems()
      }
    },

    async loadCustomer() {
      const { results = [] } = await this.$nuxt.context.app.$peopleRepository.index({filters: 'customer=true'})
      this.customers = results
    }
  }
}
</script>
