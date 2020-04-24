<template>
  <v-app-bar
    :color="!clipped ? 'primary' : ''"
    :clipped-left="clipped"
    :dark="isDark"
    fixed
    app
  >
    <v-app-bar-nav-icon @click.stop="$emit('toggle-drawer')" />
    <img
      v-if="clipped"
      src="@/assets/img/logo_800.png"
      contain
      height="100%"
      class="px-4"
    />
    <v-divider class="mr-4" inset vertical></v-divider>
    <v-toolbar-title v-text="title" />
  </v-app-bar>
</template>

<script>
export default {
  props: {
    clipped: Boolean,
    isDark: Boolean,
    title: {
      type: String,
      default: () => ''
    }
  }
}
</script>
