<template>
  <v-container
    id="accounting-classification-center-form"
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
              <v-col cols="6">
                <v-checkbox
                  ref="firstItem"
                  v-model="form.cost_center"
                  label="Centro de custo?"
                  v-bind="propsFields"
                />
              </v-col>
              <v-col cols="6">
                <v-checkbox
                  v-model="form.revenue_center"
                  label="Centro de receita?"
                  v-bind="propsFields"
                />
              </v-col>

              <v-col cols="12">
                <v-text-field
                  v-model="form.name"
                  label="Nome"
                  :rules="[rules.required]"
                  v-bind="propsFields"
                  maxlength="30"
                  class="required"
                  autofocus
                />
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
      repository: this.$nuxt.context.app.$accountingClassificationCenterRepository
    }
  }
}
</script>
