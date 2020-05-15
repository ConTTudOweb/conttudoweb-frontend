<template>
  <v-footer
    :inset="true"
    :dark="isDark"
    absolute
    padless
    app
    style="width: auto !important;"
  >
    <v-row justify="center" align="center">
      <v-btn
        v-for="rede in this.$g('social')"
        :key="rede.icon"
        :href="rede.link"
        target="_blank"
        class="mx-4"
        icon
        x-large
      >
        <v-icon size="24px">{{ rede.icon }}</v-icon>
      </v-btn>
      <small>
        &copy; 2014-{{ new Date().getFullYear() }} —
        <strong>{{ $g('empresa.nome') }}</strong>
      </small>
    </v-row>
  </v-footer>
</template>

<script>
export default {
  props: {
    isDark: Boolean
  }
}
</script>
