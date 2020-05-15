<template>
  <v-btn
    :disabled="disabled"
    color="red darken-1"
    tabindex="-1"
    text
    @click="$emit('click')"
  >
    <v-icon small>mdi-cancel</v-icon>
    <span v-if="$vuetify.breakpoint.smAndUp">Cancelar</span>
  </v-btn>
</template>

<script>
export default {
  props: {
    disabled: { type: Boolean, require: true }
  }
}
</script>
