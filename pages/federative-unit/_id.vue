<template>
  <v-form ref="form" v-model="validateForm" @submit.prevent="save">
    <c-form :title="title" :form-title="formTitle">
      <template v-slot:buttons>
        <c-btn-cancel :disabled="loading" @click="cancel()" />
        <c-btn-save :loading="loading" :disabled="!validateForm" />
      </template>
      <template v-slot:fields>
        <v-row>
          <v-col cols="6" sm="2">
            <v-text-field
              v-model="form.initials"
              label="Sigla"
              :rules="[rules.required]"
              v-bind="propsFields"
              maxlength="2"
              class="required"
              autofocus
            />
          </v-col>
          <v-col cols="12" sm="10">
            <v-text-field
              v-model="form.name"
              label="Nome"
              :rules="[rules.required]"
              v-bind="propsFields"
              maxlength="255"
              class="required"
            />
          </v-col>
        </v-row>
      </template>
    </c-form>
  </v-form>
</template>

<script>
import CForm from '~/components/Form'
import CBtnCancel from '~/components/BtnCancel'
import CBtnSave from '~/components/BtnSave'
import crudMixin from '~/mixins/crud'
import formMixin from '~/mixins/form'

export default {
  components: {
    CForm,
    CBtnCancel,
    CBtnSave
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
      repository: this.$nuxt.context.app.$federativeUnitRepository,
      name: 'federative-unit'
    }
  }
}
</script>
