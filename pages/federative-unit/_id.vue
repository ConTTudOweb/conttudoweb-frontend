<template>
  <v-form ref="form" v-model="validateForm" @submit.prevent="save">
    <v-card shaped>
      <v-toolbar flat color="primary">
        <v-toolbar-title>
          {{ title }}<br />
          <small>{{ formTitle }}</small>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <c-btn-cancel :disabled="loading" @click="cancel()" />
          <c-btn-save :loading="loading" :disabled="!validateForm" />
        </v-toolbar-items>
      </v-toolbar>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="2">
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
            <v-col cols="10">
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
        </v-container>
      </v-card-text>
      <v-card-actions>
        <div class="required">
          <small><label></label> Campos obrigatórios.</small>
        </div>
        <v-spacer />
        <c-breakpoint /><v-spacer />
        <c-btn-cancel :disabled="loading" @click="cancel" />
        <c-btn-save :loading="loading" :disabled="!validateForm" />
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
import CBreakpoint from '~/components/application/Breakpoint'
import CBtnCancel from '~/components/BtnCancel'
import CBtnSave from '~/components/BtnSave'
import crudMixin from '~/mixins/crud'
import formMixin from '~/mixins/form'

export default {
  components: {
    CBreakpoint,
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

<style>
.required label::after {
  content: ' *';
  color: darkred;
}
</style>
