<template>
  <v-btn
    :loading="loading"
    :disabled="disabled"
    color="success"
    class="mr-0"
    type="submit"
  >
    <v-icon small>mdi-content-save</v-icon>
    <span>Salvar</span>
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
