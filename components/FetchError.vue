<template>
  <v-alert
    v-if="fetchState.error"
    text
    prominent
    type="error"
    icon="mdi-cloud-alert"
    border="left"
    dismissible
  >
    Erro ao carregar {{ title }}:
    <strong>{{ fetchState.error.message }}</strong>
  </v-alert>
</template>

<script>
export default {
  props: ['fetchState']
}
</script>
