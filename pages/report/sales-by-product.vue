<template>
  <v-container
    id="sale-by-product"
    fluid
    tag="section"
  >
    <dashboard-error :message="errorMessage" />

    <base-material-card
      icon="mdi-clipboard-text"
      :title="`Relatório de ${$t('menu.report.sales-by-product')}`"
    >
      <template v-slot:button>
        <v-btn color="primary" outlined @click="printTable()" title="Imprimir">
          <v-icon>mdi-printer</v-icon>
        </v-btn>
      </template>

      <v-row>
        <v-col cols="6" sm="4">
          <v-menu
            v-model="menuStartDate"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="startDateFormatted"
                label="Data inicial"
                persistent-hint
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="startDate" no-title @input="menuStartDate = false" locale='pt-br'></v-date-picker>
          </v-menu>
        </v-col>

        <v-col cols="6" sm="4">
          <v-menu
            v-model="menuEndDate"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="endDateFormatted"
                label="Data final"
                persistent-hint
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="endDate" no-title @input="menuEndDate = false" locale='pt-br'></v-date-picker>
          </v-menu>
        </v-col>

        <v-spacer />

        <v-col cols="12" sm="3">
          <v-btn class="float-right my-auto" color="primary" outlined @click="search()">
            <v-icon>mdi-filter</v-icon>Pesquisar
          </v-btn>
        </v-col>
      </v-row>

      <div id="salesByProductTable">
        <v-simple-table dense>
          <caption id="salesByProductTable_title">{{ `Relatório de ${$t('menu.report.sales-by-product')}` }}</caption>
          <thead>
            <tr>
              <th colspan="4" class="primary--text">
                PRODUTO
              </th>
            </tr>
            <tr>
              <th class="primary--text text-right">
                DATA
              </th>
              <th class="primary--text text-right">
                VOLUMES
              </th>
              <th class="primary--text text-right">
                QUANTIDADE
              </th>
              <th class="primary--text text-right">
                VALOR LÍQUIDO
              </th>
            </tr>
          </thead>

          <tbody>
            <template v-for="(item, i) in items">
              <tr class="product-line-item" :key="`product-line-${i}`">
                <td colspan="4"><strong>{{ item.product__description }}</strong></td>
              </tr>
              <template v-for="(item_d, i_d) in item.details">
                <tr class="product-line-item-detail" :key="`product-line-${i}-detail-${i_d}`">
                  <td class="text-right">{{ $dateFns.format(item_d.sale_order__date_order, 'dd/MM/yyyy') }}</td>
                  <td class="text-right">{{ getVolumes(item_d.quantity, item_d.packing__quantity) }}</td>
                  <td class="text-right">{{ item_d.quantity }}</td>
                  <td class="text-right">{{ item_d.net_total | currency({symbolSpacing: false}) }}</td>
                </tr>
              </template>
              <tr class="product-line-item-detail" :key="`product-line-${i}-total`">
                <td class="text-right" colspan="2"><strong>TOTAIS >>></strong></td>
                <td class="text-right"><hr><strong>{{ item.quantity__sum }}</strong></td>
                <td class="text-right"><hr><strong>{{ item.net_total__sum | currency({symbolSpacing: false}) }}</strong></td>
              </tr>
              <br :key="i">
            </template>
            <br>
            <tr class="product-line-item-detail">
              <td class="success--text text-right" colspan="2"><strong>TOTAIS GERAIS >>></strong></td>
              <td class="success--text text-right"><hr><strong>{{ qtdTotal }}</strong></td>
              <td class="success--text text-right"><hr><strong>{{ vlrTotal | currency({symbolSpacing: false}) }}</strong></td>
            </tr>
          </tbody>
        </v-simple-table>
      </div>
    </base-material-card>
    
  </v-container>
</template>

<script>
import reportMixin from "@/mixins/report";

export default {
  layout: 'Admin',

  components: {
    DashboardError: () => import('~/components/Error')
  },

  mixins: [
    // crudMixin,
    reportMixin
  ],

  async fetch() {
    this.setDateFilters()

    await this.search()
  },

  data() {
    return {
      repository: this.$nuxt.context.app.$salesByProductRepository,
      menuStartDate: false,
      menuEndDate: false,
      startDate: null,
      endDate: null,
      qtdTotal: null,
      vlrTotal: null
    }
  },

  computed: {
    startDateFormatted () {
      return this.formatDate(this.startDate)
    },

    endDateFormatted () {
      return this.formatDate(this.endDate)
    },
  },

  methods: {
    async search() {
      await this.load({filters: `start_date_order=${this.startDate}&end_date_order=${this.endDate}`})
      this.qtdTotal = 0
      this.vlrTotal = 0
      for (const item of this.items) {
        this.qtdTotal += item.quantity__sum
        this.vlrTotal += item.net_total__sum
      }
    },

    setDateFilters() {
      let _date = new Date();
      _date.setMonth(_date.getMonth()-1)
      const y = _date.getFullYear()
      const m = _date.getMonth()

      this.startDate = new Date(y, m, 1).toISOString().substr(0, 10)
      this.endDate = new Date(y, m+1, 0).toISOString().substr(0, 10)
    },

    formatDate (date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },

    getVolumes(qtdItens, capacidade) {
      if (!capacidade) return
      return qtdItens / capacidade
    },

    printTable() {
      window.print();
    }
  },

  head() {
    return {
      title: this.$t('menu.report.sales-by-product')
    }
  }
}
</script>

<style lang="SCSS">
tr.product-line-item>td {
  border-top-style: dashed !important;
  border-top-width: thin !important;
  border-top-color: rgba(0, 0, 0, 0.5);
}

tr.product-line-item-detail>td {
  border-style: hidden !important;
}

#salesByProductTable_title {
  visibility: hidden;
}

@media print {
    * {
      visibility: hidden;
      margin: 0 !important;
    }

    .v-card--material>.d-flex {
      position: fixed;
    }

    footer {
      position: fixed !important;
    }

    /* #salesByProductTable * {
      visibility: visible;
      width: 100%;
    }
    #salesByProductTable>table{
      position: fixed;
      left: 0;
      top: 0;
    } */

    #salesByProductTable, #salesByProductTable * {
      width: 100%;
      visibility: visible;
      border-bottom: none;
    }

    main {
      padding: 0 !important;
    }

    #title {
        visibility: visible !important;
    }
}
</style>