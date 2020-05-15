<template>
  <section class="people">
    <v-alert
      v-if="$fetchState.error"
      text
      prominent
      type="error"
      icon="mdi-cloud-alert"
      border="left"
      dismissible
    >
      Erro ao carregar {{ title }}:
      <strong>{{ $fetchState.error.message }}</strong>
    </v-alert>

    <v-data-table
      :items="items"
      :headers="headers"
      :loading="$fetchState.pending"
      class="my-table-grid-list"
    >
      <template
        v-for="(field, i) in booleanFieldsSlots"
        v-slot:[getItemSlot(field)]="{ item }"
      >
        <template v-if="item[field] === true">
          <v-icon :key="`${i}-${item.id}`" color="green">mdi-check</v-icon>
        </template>
        <template v-else>
          <v-icon :key="`${i}-${item.id}`" color="red">mdi-close</v-icon>
        </template>
      </template>
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title v-text="title" />
          <v-spacer></v-spacer>
          <v-btn color="primary" outlined :to="$route.path + '/add'">
            <v-icon>mdi-plus-circle</v-icon>
            <span v-if="$vuetify.breakpoint.smAndUp">Adicionar</span>
          </v-btn>
          <!--<v-dialog v-model="dialog" fullscreen scrollable>-->
          <!--  <template v-slot:activator="{ on }">-->
          <!--    <v-btn color="primary" outlined v-on="on">-->
          <!--      <v-icon>mdi-plus-circle</v-icon>-->
          <!--      <span v-if="$vuetify.breakpoint.smAndUp">Adicionar</span>-->
          <!--    </v-btn>-->
          <!--  </template>-->
          <!--  <v-form ref="form" v-model="validateForm" @submit.prevent="save">-->
          <!--    <v-card title>-->
          <!--      <v-toolbar flat color="primary">-->
          <!--        <v-btn icon @click="dialog = false">-->
          <!--          <v-icon>mdi-close</v-icon>-->
          <!--        </v-btn>-->
          <!--        <v-toolbar-title-->
          <!--          >{{ title }}<br />-->
          <!--          <small>{{ formTitle }}</small>-->
          <!--        </v-toolbar-title>-->
          <!--        <v-spacer></v-spacer>-->
          <!--        <v-toolbar-items>-->
          <!--          <v-btn-->
          <!--            :loading="loading"-->
          <!--            :disabled="!validateForm"-->
          <!--            color="blue darken-1"-->
          <!--            text-->
          <!--            type="submit"-->
          <!--          >-->
          <!--            Salvar-->
          <!--          </v-btn>-->
          <!--        </v-toolbar-items>-->
          <!--      </v-toolbar>-->

          <!--      <v-card-text>-->
          <!--        <v-container>-->
          <!--          <v-row>-->
          <!--            <v-col cols="6">-->
          <!--              <v-checkbox-->
          <!--                ref="firstItem"-->
          <!--                v-model="form.customer"-->
          <!--                label="Cliente?"-->
          <!--                v-bind="propsFields"-->
          <!--              />-->
          <!--            </v-col>-->
          <!--            <v-col cols="6">-->
          <!--              <v-checkbox-->
          <!--                v-model="form.supplier"-->
          <!--                label="Fornecedor?"-->
          <!--                v-bind="propsFields"-->
          <!--              />-->
          <!--            </v-col>-->
          <!--            <v-col cols="12">-->
          <!--              <v-text-field-->
          <!--                v-model="form.name"-->
          <!--                label="Nome"-->
          <!--                :rules="[rules.required]"-->
          <!--                v-bind="propsFields"-->
          <!--                maxlength="60"-->
          <!--                class="required"-->
          <!--              />-->
          <!--            </v-col>-->
          <!--            <v-col cols="12">-->
          <!--              <v-radio-group-->
          <!--                v-model="form.person_type"-->
          <!--                label="Tipo"-->
          <!--                v-bind="propsFields"-->
          <!--                :row="$vuetify.breakpoint.smAndUp"-->
          <!--              >-->
          <!--                <v-radio label="Pessoa Física" value="F"></v-radio>-->
          <!--                <v-radio label="Pessoa Jurídica" value="J"></v-radio>-->
          <!--              </v-radio-group>-->
          <!--            </v-col>-->
          <!--            <v-col cols="12" sm="6">-->
          <!--              <v-text-field-->
          <!--                v-model="form.federation_subscription_number"-->
          <!--                label="CPF/CNPJ"-->
          <!--                v-bind="propsFields"-->
          <!--                maxlength="18"-->
          <!--              />-->
          <!--            </v-col>-->
          <!--            <v-col cols="12" sm="6">-->
          <!--              <v-text-field-->
          <!--                v-model="form.state_subscription_number"-->
          <!--                label="RG/IE"-->
          <!--                v-bind="propsFields"-->
          <!--                maxlength="18"-->
          <!--              />-->
          <!--            </v-col>-->
          <!--            <v-col cols="12" sm="6">-->
          <!--              <v-text-field-->
          <!--                v-model="form.phone"-->
          <!--                label="Telefone"-->
          <!--                v-bind="propsFields"-->
          <!--                maxlength="20"-->
          <!--              />-->
          <!--            </v-col>-->
          <!--            <v-col cols="12" sm="6">-->
          <!--              <v-text-field-->
          <!--                v-model="form.email"-->
          <!--                label="E-mail"-->
          <!--                :rules="[rules.email]"-->
          <!--                v-bind="propsFields"-->
          <!--                maxlength="254"-->
          <!--              />-->
          <!--            </v-col>-->
          <!--            <v-col cols="6">-->
          <!--              <v-text-field-->
          <!--                v-model="form.zip_code"-->
          <!--                label="CEP"-->
          <!--                v-bind="propsFields"-->
          <!--                maxlength="10"-->
          <!--              />-->
          <!--            </v-col>-->
          <!--            <v-col cols="12" sm="10">-->
          <!--              <v-text-field-->
          <!--                v-model="form.address"-->
          <!--                label="Logradouro"-->
          <!--                v-bind="propsFields"-->
          <!--                maxlength="255"-->
          <!--              />-->
          <!--            </v-col>-->
          <!--            <v-col cols="12" sm="2">-->
          <!--              <v-text-field-->
          <!--                v-model="form.address_number"-->
          <!--                label="Número"-->
          <!--                v-bind="propsFields"-->
          <!--                maxlength="60"-->
          <!--              />-->
          <!--            </v-col>-->
          <!--            <v-col cols="12" sm="6">-->
          <!--              <v-text-field-->
          <!--                v-model="form.complement"-->
          <!--                label="Complemento"-->
          <!--                v-bind="propsFields"-->
          <!--                maxlength="60"-->
          <!--              />-->
          <!--            </v-col>-->
          <!--            <v-col cols="12" sm="6">-->
          <!--              <v-text-field-->
          <!--                v-model="form.neighborhood"-->
          <!--                label="Bairro"-->
          <!--                v-bind="propsFields"-->
          <!--                maxlength="60"-->
          <!--              />-->
          <!--            </v-col>-->
          <!--            <v-col cols="12">-->
          <!--              <v-autocomplete-->
          <!--                v-model="form.city"-->
          <!--                label="Cidade"-->
          <!--                v-bind="propsFields"-->
          <!--                :items="cities"-->
          <!--                item-text="name"-->
          <!--                item-value="id"-->
          <!--              ></v-autocomplete>-->
          <!--            </v-col>-->
          <!--            <v-col cols="12">-->
          <!--              <v-textarea-->
          <!--                v-model="form.observation"-->
          <!--                label="Observação"-->
          <!--                v-bind="propsFields"-->
          <!--              ></v-textarea>-->
          <!--            </v-col>-->
          <!--          </v-row>-->
          <!--        </v-container>-->
          <!--      </v-card-text>-->
          <!--      <v-card-actions>-->
          <!--        <div class="required">-->
          <!--          <small><label></label> Campos obrigatórios.</small>-->
          <!--        </div>-->
          <!--        <v-spacer></v-spacer>-->
          <!--        <c-breakpoint /><v-spacer></v-spacer>-->
          <!--        <v-btn-->
          <!--          :disabled="loading"-->
          <!--          color="red darken-1"-->
          <!--          tabindex="-1"-->
          <!--          text-->
          <!--          @click="close"-->
          <!--        >-->
          <!--          Cancelar-->
          <!--        </v-btn>-->
          <!--        <v-btn-->
          <!--          :loading="loading"-->
          <!--          :disabled="!validateForm"-->
          <!--          color="blue darken-1"-->
          <!--          text-->
          <!--          type="submit"-->
          <!--        >-->
          <!--          Salvar-->
          <!--        </v-btn>-->
          <!--      </v-card-actions>-->
          <!--    </v-card>-->
          <!--  </v-form>-->
          <!--</v-dialog>-->
        </v-toolbar>
      </template>
      <template v-slot:item._actions="{ item }">
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-icon
              class="ma-2"
              color="yellow darken-2"
              @click="editItem(item)"
              v-on="on"
            >
              mdi-pencil
            </v-icon>
          </template>
          <span>Editar</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-icon
              small
              class="ma-2"
              color="red lighten-2"
              @click="deleteItem(item)"
              v-on="on"
            >
              mdi-delete
            </v-icon>
          </template>
          <span>Remover</span>
        </v-tooltip>
      </template>
    </v-data-table>
  </section>
</template>

<script>
// import CBreakpoint from '~/components/application/Breakpoint'
// import fieldsMixin from '~/mixins/fields'
import crudMixin from '~/mixins/crud'
import gridMixin from '~/mixins/grid'
// import CFieldForm from '~/components/fieldForm'

export default {
  components: {
    // CBreakpoint
    // CFieldForm
  },
  mixins: [crudMixin, gridMixin],
  async fetch() {
    await this.loadData()
    this.cities = await this.$nuxt.context.app.$cityRepository.index()
  },
  data() {
    return {
      repository: this.$nuxt.context.app.$peopleRepository,
      cities: []
    }
  }
}
</script>
