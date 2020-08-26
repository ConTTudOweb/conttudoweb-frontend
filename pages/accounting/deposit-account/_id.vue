<template>
  <v-container
    id="accounting-deposit-account-form"
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
                <v-radio-group 
                  v-model="form.type"
                  label="Tipo"
                  v-bind="propsFields"
                  :rules="[rules.required]"
                  class="required"
                  :mandatory="true" 
                  row
                  autofocus
                >
                  <v-radio label="Conta corrente" value="cur"></v-radio>
                  <v-radio label="Dinheiro" value="mon"></v-radio>
                  <v-radio label="Conta de investimento" value="inv"></v-radio>
                </v-radio-group>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="form.name"
                  label="Descrição"
                  :rules="[rules.required]"
                  v-bind="propsFields"
                  maxlength="30"
                  class="required"
                />
              </v-col>

              <template v-if="showFieldsBank">
                <v-col cols="12">
                  <v-autocomplete
                    v-model="form.bank"
                    label="Banco"
                    v-bind="propsFields"
                    :items="banks"
                    item-text="str"
                    item-value="id"
                  >
                    <template v-slot:append-outer>
                      <v-icon color="warning" @click="loadBank" tabindex="-1">mdi-sync</v-icon>
                    </template>
                  </v-autocomplete>
                </v-col>

                <v-col cols="10">
                  <v-text-field
                    v-model="form.agency_number"
                    label="Número da agência"
                    v-bind="propsFields"
                  />
                </v-col>
                <v-col cols="2">
                  <v-text-field
                    v-model="form.agency_digit"
                    label="Dígito da agência"
                    v-bind="propsFields"
                  />
                </v-col>

                <v-col cols="10">
                  <v-text-field
                    v-model="form.account_number"
                    label="Número da conta"
                    v-bind="propsFields"
                  />
                </v-col>
                <v-col cols="2">
                  <v-text-field
                    v-model="form.account_digit"
                    label="Dígito da conta"
                    v-bind="propsFields"
                  />
                </v-col>
              </template>

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
      // this.banks = [{
      //   id: this.form.bank,
      //   str: this.form.bank__str
      // }]
    }
    this.loadTitle()

    await this.loadBank()
  },

  data() {
    return {
      repository: this.$nuxt.context.app.$accountingDepositAccountRepository,
      banks: [],
      // searchBanks: null
    }
  },

  computed: {
    showFieldsBank() {
      return this.form.type && this.form.type !== 'mon'
    }
  },

  // watch: {
  //   async searchBanks(val) {
  //     console.log(val, this.banks)
  //     val && !this.banks.filter(f => f.str === val).length && this.loadBank({search: val})
  //   }
  // },
  
  methods: {
    async loadBank() {
      const { results = [] } = await this.$nuxt.context.app.$accountingBankRepository.index()
      this.banks = results
    }
  }
}
</script>
