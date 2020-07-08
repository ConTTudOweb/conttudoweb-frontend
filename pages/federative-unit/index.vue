<template>
  <section class="federative-unit">
    <c-fetch-error :fetch-state="$fetchState" />

    <v-data-table
      :items="items"
      :headers="headers"
      :options.sync="options"
      :server-items-length="totalItems"
      :search="search"
      :loading="$fetchState.pending"
      class="my-table-grid-list"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title v-text="title" />
          <v-spacer></v-spacer>
          <v-btn color="primary" outlined :to="$route.path + '/add'">
            <v-icon>mdi-plus-circle</v-icon>
            <span v-if="$vuetify.breakpoint.smAndUp">Adicionar</span>
          </v-btn>

          <template v-slot:extension>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Pesquisar"
              single-line
              hide-details
            ></v-text-field>
          </template>

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
import CFetchError from '~/components/FetchError'
import crudMixin from '~/mixins/crud'
import gridMixin from '~/mixins/grid'

export default {
  components: {
    CFetchError
  },
  mixins: [crudMixin, gridMixin],
  async fetch() {
    await this.loadData()
  },
  data() {
    return {
      repository: this.$nuxt.context.app.$federativeUnitRepository
    }
  }
}
</script>
