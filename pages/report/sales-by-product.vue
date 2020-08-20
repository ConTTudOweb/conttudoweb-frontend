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

            <!-- <br><br><br><br>
            <tr>
              <td style="border-bottom-style: dashed;" colspan="3">Produto xxx</td>
            </tr>
            <tr>
              <td class="text-right">2020/08</td>
              <td class="text-right">
                2
              </td>
              <td class="text-right">
                40
              </td>
            </tr>
            <br>

            <tr>
              <td style="border-bottom-style: dashed;" colspan="3">Produto 222</td>
            </tr>
            <tr>
              <td style="border-style: hidden !important;" class="text-right">2020/08</td>
              <td style="border-style: hidden !important;" class="text-right">
                2
              </td>
              <td style="border-style: hidden !important;" class="text-right">
                40
              </td>
            </tr>
            <tr>
              <td style="border-style: hidden !important;" class="text-right">2020/08</td>
              <td style="border-style: hidden !important;" class="text-right">
                2
              </td>
              <td style="border-style: hidden !important;" class="text-right">
                40
              </td>
            </tr>
            <br> -->

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
    await this.loadData()
  },

  data() {
    return {
      repository: this.$nuxt.context.app.$salesByProductRepository
    }
  },

  methods: {
    getVolumes(qtdItens, capacidade) {
      if (!capacidade) return
      return qtdItens / capacidade
    },

    printTable() {
      // let tableToPrint = document.getElementById("salesByProductTable");
      // alert(tableToPrint.outerHTML)
      // const newWin = window.open("");
      // newWin.document.write(tableToPrint.outerHTML);
      // newWin.print();
      // newWin.close();

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
/* tr.product-line-item>td {
  border-top-style: solid !important;
  border-top-width: thin !important;
  border-top-color: rgba(0, 0, 0, 0.5);
  border-bottom-style: dashed !important;
} */
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