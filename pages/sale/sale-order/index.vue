<template>
  <v-container
    id="sale-order"
    fluid
    tag="section"
  >
    <dashboard-error :message="errorMessage" />

    <base-material-card
      icon="mdi-clipboard-text"
    >
      <template v-slot:button>
        <v-btn color="info" outlined :to="$route.path + '/add'">
          <v-icon>mdi-plus-circle</v-icon>Adicionar
        </v-btn>
      </template>
      <v-data-table
        :items="items"
        :headers="headers"
        :options.sync="options"
        :server-items-length="totalItems"
        :search="search"
        :loading="loading"
        class="my-table-grid-list"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Pesquisar"
              single-line
              hide-details
            ></v-text-field>
          </v-toolbar>
        </template>

        <template v-slot:item.id="{ item }">
          <span>{{ formatSaleOrderId(item.id) }}</span>
        </template>

        <template v-slot:item.date_order="{ item }">
          <span>{{ $dateFns.format(item.date_order, 'dd/MM/yyyy') }}</span>
        </template>

        <template v-slot:item.gross_total="{ item }">
          <small><span>{{ item.gross_total | currency }}</span></small>
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
                class="ma-2"
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
    </base-material-card>
  </v-container>
</template>

<script>
import crudMixin from "@/mixins/crud";
import gridMixin from "@/mixins/grid";

export default {
  layout: 'Admin',
  components: {
    DashboardError: () => import('~/components/Error')
  },
  mixins: [
    crudMixin,
    gridMixin
  ],
  async fetch() {
    await this.loadData()
  },
  data() {
    return {
      repository: this.$nuxt.context.app.$saleOrderRepository
    }
  },

  methods: {
    // getValorTotalSaleOrder(sale_order) {
    //   let _total = 0
    //   sale_order.saleorderitems_set.forEach(element => {
    //     _total += element.net_total
    //   });
    //   return _total
    // },

    // getTotalBrutoSaleOrderItem(quantity, price) {
    //   return quantity * price
    // },

    formatSaleOrderId(id) {
      return '#' + id.toString().padStart(6, '0')
    }
  },

  head() {
    return {
      title: this.$t('menu.sale.sale-orders')
    }
  }
}
</script>
