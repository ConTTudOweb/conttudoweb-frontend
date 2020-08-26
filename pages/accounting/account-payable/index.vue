<template>
  <v-container
    id="account-payable"
    fluid
    tag="section"
  >
    <dashboard-error :message="errorMessage" />

    <base-material-card
      icon="mdi-clipboard-text"
    >
      <template v-slot:button>
        <v-btn color="info" outlined :to="$route.path + '/add'">
          <v-icon>mdi-plus-circle</v-icon>Adicionar
        </v-btn>
      </template>
      <v-data-table
        :items="items"
        :headers="headers"
        :options.sync="options"
        :server-items-length="totalItems"
        :search="search"
        :loading="loading"
        class="my-table-grid-list"
        :item-class="row_classes"
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
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Pesquisar"
              single-line
              hide-details
            ></v-text-field>
          </v-toolbar>
        </template>

        <template v-slot:item.due_date="{ item }">
          <span>{{ $dateFns.format(item.due_date, 'dd/MM/yyyy') }}</span>
        </template>

        <template v-slot:item.liquidated_date="{ item }">
          <span v-if="item.liquidated_date">{{ $dateFns.format(item.liquidated_date, 'dd/MM/yyyy') }}</span>
        </template>

        <template v-slot:item.amount="{ item }">
          <span>{{ item.amount | currency }}</span>
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
    </base-material-card>
  </v-container>
</template>

<script>
import crudMixin from '~/mixins/crud'
import gridMixin from '~/mixins/grid'

export default {
  layout: 'Admin',
  components: {
    DashboardError: () => import('~/components/Error')
  },
  mixins: [crudMixin, gridMixin],
  async fetch() {
    await this.loadData()
  },
  data() {
    return {
      repository: this.$nuxt.context.app.$accountPayableRepository
    }
  },

  methods: {
    row_classes(item) {
        if (item.liquidated_date) {
          return ["success--text", "disabled"]; //can also return multiple classes e.g ["orange","disabled"]
        } 
    }
  },

  head() {
    return {
      title: this.$t('menu.accounting.account-payable')
    }
  }
}
</script>
