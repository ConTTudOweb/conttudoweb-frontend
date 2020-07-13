<template>
  <v-container class="py-0">
    <slot name="fields" />

    <v-row>
      <v-col cols="12" sm="6">
        <span class="required my-auto">
          <small><label></label> Campos obrigatórios.</small>
        </span>
      </v-col>
      <v-col cols="12" sm="6" class="text-right">
        <slot name="buttons" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CBreakpoint from '~/components/application/Breakpoint'

export default {
  components: {
    CBreakpoint
  },
  // props: ['title', 'formTitle'],
  props: {
    title: {
      type: String,
      required: true
    },
    formTitle: {
      type: String,
      required: true
    }
  }
}
</script>

<style>
.required label::after {
  content: ' *';
  color: darkred;
}
</style>
