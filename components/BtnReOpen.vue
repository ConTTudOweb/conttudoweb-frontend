<template>
  <v-btn
    :disabled="disabled"
    color="info"
    tabindex="-1"
    text
    small
    @click="$emit('click')"
  >
    <v-icon small>mdi-undo</v-icon>
    <span>Estornar</span>
  </v-btn>
</template>

<script>
export default {
  props: {
    disabled: { type: Boolean, require: true }
  }
}
</script>
