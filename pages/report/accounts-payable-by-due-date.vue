<template>
  <v-container
    id="accounts-payable-report"
    fluid
    tag="section"
  >
    <dashboard-error :message="errorMessage" />

    <base-material-card
      icon="mdi-clipboard-text"
      :title="`Relatório de ${$t('menu.report.accounts-payable-by-due-date')}`"
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
                label="Data de Vencimento inicial"
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
                label="Data de Vencimento final"
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

      <div id="accountsPayableReportTable">
        <v-simple-table dense>
          <caption id="accountsPayableReportTable_title">{{ `Relatório de ${$t('menu.report.accounts-payable-by-due-date')}` }}</caption>
          <thead>
            <tr>
              <th class="primary--text text-right">
                VENCIMENTO
              </th>
              <th class="primary--text">
                DESCRIÇÃO
              </th>
              <th class="primary--text text-right">
                VALOR
              </th>
            </tr>
          </thead>

          <tbody>
            <tr class="account-line-item" :key="`account-line-${i}`" v-for="(item, i) in items">
              <td class="text-right">{{ $dateFns.format(item.due_date, 'dd/MM/yyyy') }}</td>
              <td>{{ item.description }}</td>
              <td class="text-right">{{ item.amount | currency({symbolSpacing: false}) }}</td>
            </tr>
            <br>
            <tr class="account-line-item-detail">
              <td class="success--text text-right" colspan="2"><strong>TOTAl >>></strong></td>
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
      repository: this.$nuxt.context.app.$accountsPayableByDueDateRepository,
      menuStartDate: false,
      menuEndDate: false,
      startDate: null,
      endDate: null,
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
      await this.load({filters: `start_date=${this.startDate}&end_date=${this.endDate}`})
      this.vlrTotal = 0
      for (const item of this.items) {
        this.vlrTotal += item.amount
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

    printTable() {
      window.print();
    }
  },

  head() {
    return {
      title: this.$t('menu.report.accounts-payable-by-due-date')
    }
  }
}
</script>

<style lang="SCSS">
tr.account-line-item>td {
  border-top-style: dashed !important;
  border-top-width: thin !important;
  border-top-color: rgba(0, 0, 0, 0.5);
}

tr.account-line-item-detail>td {
  border-style: hidden !important;
}

#accountsPayableReportTable_title {
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

    #accountsPayableReportTable, #accountsPayableReportTable * {
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
