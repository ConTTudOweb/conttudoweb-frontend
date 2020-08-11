<template>
  <v-container
    id="category-form"
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
              <v-col cols="12" sm="10">
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
              <v-col cols="6" sm="2">
                <v-text-field
                  v-model="form.code"
                  label="Código"
                  v-bind="propsFields"
                  maxlength="20"
                />
              </v-col>
              <v-col cols="12">
                <v-autocomplete
                  v-model="form.parent"
                  label="Categoria"
                  v-bind="propsFields"
                  :items="categories.results"
                  item-text="str"
                  item-value="id"
                ></v-autocomplete>
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

    this.categories = await this.repository.index()
  },
  data() {
    return {
      repository: this.$nuxt.context.app.$categoryRepository,
      name: 'category',
      categories: []
    }
  }
}
</script>
