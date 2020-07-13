<template>
  <v-btn
    :disabled="disabled"
    color="error"
    tabindex="-1"
    text
    small
    @click="$emit('click')"
  >
    <v-icon small>mdi-cancel</v-icon>
    <span>Cancelar</span>
  </v-btn>
</template>

<script>
export default {
  props: {
    disabled: { type: Boolean, require: true }
  }
}
</script>
