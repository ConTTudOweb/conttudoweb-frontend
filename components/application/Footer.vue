<template>
  <v-footer
    :inset="!clipped"
    :dark="isDark"
    absolute
    padless
    app
    style="width: auto !important;"
  >
    <v-row justify="center" align="center" no-gutters>
      <v-btn v-for="icon in icons" :key="icon" class="mx-4" icon>
        <v-icon size="24px">{{ icon }}</v-icon>
      </v-btn>
      <small>
        &copy; 2014-{{ new Date().getFullYear() }} —
        <strong>ConTTudOweb</strong>
      </small>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  props: {
    clipped: Boolean,
    isDark: Boolean
  },
  data() {
    return {
      icons: ['mdi-facebook', 'mdi-instagram', 'mdi-linkedin', 'mdi-whatsapp']
    }
  }
}
</script>
