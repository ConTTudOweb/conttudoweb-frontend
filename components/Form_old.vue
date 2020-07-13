<template>
  <v-card outlined>
    <v-toolbar flat dark>
      <v-toolbar-title>
        {{ title }}<br />
        <small>{{ formTitle }}</small>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <slot name="buttons" />
      </v-toolbar-items>
    </v-toolbar>

    <v-card-text>
      <v-container>
        <slot name="fields" />
      </v-container>
    </v-card-text>

    <v-card-actions>
      <div class="required">
        <small><label></label> Campos obrigatórios.</small>
      </div>
      <v-spacer />
      <c-breakpoint /><v-spacer />
      <slot name="buttons" />
    </v-card-actions>
  </v-card>
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
