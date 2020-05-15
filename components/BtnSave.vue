<template>
  <v-btn
    :loading="loading"
    :disabled="disabled"
    color="blue darken-1"
    text
    type="submit"
  >
    <v-icon small>mdi-content-save</v-icon>
    <span v-if="$vuetify.breakpoint.smAndUp">Salvar</span>
  </v-btn>
</template>

<script>
export default {
  props: {
    loading: { type: Boolean, require: true },
    disabled: { type: Boolean, require: true }
  }
}
</script>
