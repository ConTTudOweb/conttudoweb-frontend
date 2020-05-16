<template>
  <v-app-bar :clipped-left="clipped" :dark="isDark" fixed app>
    <v-app-bar-nav-icon v-if="clipped" @click.stop="$emit('toggle-drawer')" />
    <img
      src="@/assets/img/logo_800.png"
      height="100%"
      class="px-4"
      alt="Logotipo"
    />
    <v-divider
      v-if="$vuetify.breakpoint.smAndUp"
      class="mr-4"
      inset
      vertical
    ></v-divider>
    <v-toolbar-title v-if="$vuetify.breakpoint.smAndUp" v-text="title" />
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
