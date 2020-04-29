<template>
  <v-layout column justify-center align-center>
    <h1>
      {{ this.$nuxt.context.app.$federativeUnitRepository.props().title }}
    </h1>
    <p v-if="$fetchState.error">
      Erro ao carregar Federative Units: {{ $fetchState.error.message }}
    </p>
    <v-data-table
      v-else
      :items="federativeUnits"
      :headers="headers"
      :loading="$fetchState.pending"
    ></v-data-table>
  </v-layout>
</template>

<script>
export default {
  async fetch() {
    this.federativeUnits = await this.$nuxt.context.app.$federativeUnitRepository.index()
  },
  data() {
    return {
      federativeUnits: [],
      headers: [
        { text: 'Sigla', value: 'initials' },
        { text: 'Nome', value: 'name' }
      ]
    }
  }
}
</script>
