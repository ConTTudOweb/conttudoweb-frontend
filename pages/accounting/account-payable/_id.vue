<template>
  <v-container
    id="account-payable-form"
    fluid
    tag="section"
  >
    <base-material-card :title="formTitle">
      <v-form ref="form" v-model="validateForm" @submit.prevent="save" :disabled="form.liquidated_date && form.liquidated_date !== null">
        <dashboard-form :title="title" :form-title="formTitle">
          <template v-slot:buttons>
            <dashboard-btn-cancel :disabled="loading" @click="cancel()" />

            <dashboard-btn-re-open v-if="form.liquidated_date && form.liquidated_date !== null" :disabled="loading" @click="estornar()" />
            <dashboard-btn-save v-else :loading="loading" :disabled="!validateForm" />
          </template>
          <template v-slot:fields>
            <v-row>
              <v-col cols="12" md="6">
                <v-radio-group 
                  v-model="form.type"
                  label="Tipo"
                  v-bind="propsFields"
                  :row="$vuetify.breakpoint.smAndUp"
                  :rules="[rules.required]"
                  class="required"
                  :mandatory="true"
                >
                  <v-radio label="Normal" value="nor"></v-radio>
                  <v-radio label="Parcelada" value="par"></v-radio>
                </v-radio-group>
              </v-col>
              <template v-if="form.type !== 'nor'">
                <v-col cols="6" md="3">
                  <v-select
                    v-model="form.frequency"
                    label="Frequência"
                    v-bind="propsFields"
                    :items="frequencyOptions"
                    item-text="display_name"
                    item-value="value"
                  />
                </v-col>
                <v-col cols="6" md="3">
                  <v-text-field
                    v-model="form.number_of_parcels"
                    label="Nro. de parcelas"
                    v-bind="propsFields"
                    type="number"
                  />
                </v-col>
              </template>

              <v-col cols="12">
                <v-text-field
                  v-model="form.description"
                  label="Descrição"
                  :rules="[rules.required]"
                  v-bind="propsFields"
                  maxlength="255"
                  class="required"
                  autofocus
                />
              </v-col>

              <v-col cols="12" sm="6" md="4" lg="3">
                <v-text-field
                  v-model="form.due_date"
                  label="Data de vencimento"
                  :rules="[rules.required]"
                  v-bind="propsFields"
                  type="date"
                  class="required"
                />
              </v-col>
              <v-col cols="12" sm="6" md="4" lg="3">
                <v-currency-field
                  :default-value="null"
                  v-model="form.amount"
                  label="Valor"
                  :rules="[rules.required]"
                  v-bind="propsFields"
                  prefix="R$"
                  class="required"
                />
                <v-checkbox
                  v-if="!form.id"
                  v-model="form.liquidated"
                  label="Já paga?"
                  v-bind="propsFields"
                />
              </v-col>
              <v-col cols="12" md="4" lg="6">
                <v-autocomplete
                  v-model="form.expected_deposit_account"
                  label="Pagar por"
                  v-bind="propsFields"
                  :items="depositAccounts"
                  item-text="name"
                  item-value="id"
                >
                  <template v-slot:append-outer>
                    <v-icon color="warning" @click="loadDepositAccount" tabindex="-1">mdi-sync</v-icon>
                  </template>
                </v-autocomplete>
              </v-col>

              <v-col cols="12" sm="6" md="4" lg="3">
                <v-text-field
                  v-model="form.document_emission_date"
                  label="Data de emissão"
                  v-bind="propsFields"
                  type="date"
                />
              </v-col>
              <v-col cols="12" sm="6" md="4" lg="3">
                <v-text-field
                  v-model="form.document"
                  label="Documento"
                  v-bind="propsFields"
                  maxlength="60"
                />
              </v-col>
              <v-col cols="12" md="4" lg="6">
                <v-autocomplete
                  v-model="form.category"
                  label="Categoria"
                  v-bind="propsFields"
                  :items="categories"
                  item-text="description"
                  item-value="id"
                >
                  <template v-slot:append-outer>
                    <v-icon color="warning" @click="loadCategory" tabindex="-1">mdi-sync</v-icon>
                  </template>
                </v-autocomplete>
              </v-col>

              <v-col cols="12" md="6">
                <v-autocomplete
                  v-model="form.person"
                  label="Fornecedor"
                  v-bind="propsFields"
                  :items="suppliers"
                  item-text="name"
                  item-value="id"
                >
                  <template v-slot:append-outer>
                    <v-icon color="warning" @click="loadSupplier" tabindex="-1">mdi-sync</v-icon>
                  </template>
                </v-autocomplete>
              </v-col>
              <v-col cols="12" md="6">
                <v-autocomplete
                  v-model="form.classification_center"
                  label="Centro de custo"
                  v-bind="propsFields"
                  :items="costCenters"
                  item-text="name"
                  item-value="id"
                >
                  <template v-slot:append-outer>
                    <v-icon color="warning" @click="loadCostCenter" tabindex="-1">mdi-sync</v-icon>
                  </template>
                </v-autocomplete>
              </v-col>

            </v-row>
          </template>
        </dashboard-form>
      </v-form>
    </base-material-card>
  </v-container>
</template>

<script>
import crudMixin from '~/mixins/crud'
import formMixin from '~/mixins/form'

export default {
  layout: 'Admin',
  components: {
    DashboardForm: () => import('~/components/Form'),
    DashboardBtnCancel: () => import('~/components/BtnCancel'),
    DashboardBtnSave: () => import('~/components/BtnSave'),
    DashboardBtnReOpen: () => import('~/components/BtnReOpen')
  },
  mixins: [crudMixin, formMixin],
  validate({ params }) {
    return !isNaN(+params.id) || params.id === 'add'
  },
  async fetch() {
    const { id } = this.$route.params
    if (id > 0) {
      this.form = await this.repository.show(id)
    } else {
      this.form.due_date = new Date().toISOString().substr(0, 10)
      this.form.payment_receivement = 'p'
    }
    this.loadTitle()

    await this.loadCategory()
    await this.loadDepositAccount()
    await this.loadSupplier()
    await this.loadCostCenter()
  },
  data() {
    return {
      repository: this.$nuxt.context.app.$accountPayableRepository,
      // name: 'people',
      categories: [],
      depositAccounts: [],
      suppliers: [],
      costCenters: [],
      frequencyOptions: [
        {
            value: "weekly",
            display_name: "Semanal"
        },
        {
            value: "biweekly",
            display_name: "Quinzenal"
        },
        {
            value: "monthly",
            display_name: "Mensal"
        },
        {
            value: "bimonthly",
            display_name: "Bimestral"
        },
        {
            value: "quarterly",
            display_name: "Trimestral"
        },
        {
            value: "semiannual",
            display_name: "Semestral"
        },
        {
            value: "annual",
            display_name: "Anual"
        }
      ]
    }
  },
  
  methods: {
    async loadCategory() {
      const { results = [] } = await this.$nuxt.context.app.$accountingCategoryRepository.index()
      this.categories = results
    },

    async loadDepositAccount() {
      const { results = [] } = await this.$nuxt.context.app.$accountingDepositAccountRepository.index()
      this.depositAccounts = results
    },

    async loadSupplier() {
      const { results = [] } = await this.$nuxt.context.app.$peopleRepository.index({filters: 'supplier=true'})
      this.suppliers = results
    },

    async loadCostCenter() {
      const { results = [] } = await this.$nuxt.context.app.$accountingClassificationCenterRepository.index({filters: 'cost_center=true'})
      this.costCenters = results
    },

    estornar() {
      this.form.liquidated = false
      this.form.liquidated_date = null
    }
  }
}
</script>
