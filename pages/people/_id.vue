<template>
  <v-form ref="form" v-model="validateForm" @submit.prevent="save">
    <c-form :title="title" :form-title="formTitle">
      <template v-slot:buttons>
        <c-btn-cancel :disabled="loading" @click="cancel()" />
        <c-btn-save :loading="loading" :disabled="!validateForm" />
      </template>
      <template v-slot:fields>
        <v-row>
          <v-col cols="6">
            <v-checkbox
              ref="firstItem"
              v-model="form.customer"
              label="Cliente?"
              v-bind="propsFields"
            />
          </v-col>
          <v-col cols="6">
            <v-checkbox
              v-model="form.supplier"
              label="Fornecedor?"
              v-bind="propsFields"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="form.name"
              label="Nome"
              :rules="[rules.required]"
              v-bind="propsFields"
              maxlength="60"
              class="required"
              autofocus
            />
          </v-col>
          <v-col cols="12">
            <v-radio-group
              v-model="form.person_type"
              label="Tipo"
              v-bind="propsFields"
              :row="$vuetify.breakpoint.smAndUp"
            >
              <v-radio label="Pessoa Física" value="F"></v-radio>
              <v-radio label="Pessoa Jurídica" value="J"></v-radio>
            </v-radio-group>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="form.federation_subscription_number"
              label="CPF/CNPJ"
              v-bind="propsFields"
              maxlength="18"
            />
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="form.state_subscription_number"
              label="RG/IE"
              v-bind="propsFields"
              maxlength="18"
            />
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="form.phone"
              label="Telefone"
              v-bind="propsFields"
              maxlength="20"
            />
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="form.email"
              label="E-mail"
              :rules="[rules.email]"
              v-bind="propsFields"
              maxlength="254"
            />
          </v-col>
          <v-col cols="6">
            <v-text-field
              v-model="form.zip_code"
              label="CEP"
              v-bind="propsFields"
              maxlength="10"
            />
          </v-col>
          <v-col cols="12" sm="10">
            <v-text-field
              v-model="form.address"
              label="Logradouro"
              v-bind="propsFields"
              maxlength="255"
            />
          </v-col>
          <v-col cols="12" sm="2">
            <v-text-field
              v-model="form.address_number"
              label="Número"
              v-bind="propsFields"
              maxlength="60"
            />
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="form.complement"
              label="Complemento"
              v-bind="propsFields"
              maxlength="60"
            />
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="form.neighborhood"
              label="Bairro"
              v-bind="propsFields"
              maxlength="60"
            />
          </v-col>
          <v-col cols="12">
            <v-autocomplete
              v-model="form.city"
              label="Cidade"
              v-bind="propsFields"
              :items="cities"
              item-text="name"
              item-value="id"
            ></v-autocomplete>
          </v-col>
          <v-col cols="12">
            <v-textarea
              v-model="form.observation"
              label="Observação"
              v-bind="propsFields"
            ></v-textarea>
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
    this.cities = await this.$nuxt.context.app.$cityRepository.index()
  },
  data() {
    return {
      repository: this.$nuxt.context.app.$peopleRepository,
      name: 'people',
      cities: []
    }
  }
}
</script>
