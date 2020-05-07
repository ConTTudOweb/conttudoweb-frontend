<template>
  <v-navigation-drawer
    v-model="drawer"
    :mini-variant="miniVariant"
    :clipped="clipped"
    fixed
    app
    :dark="false"
    color="primary darken-4"
  >
    <v-list nav dense class="py-0">
      <v-divider :inset="false" class="py-1"></v-divider>
      <v-subheader>CADASTROS</v-subheader>
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        :to="item.to"
        router
        exact
      >
        <v-list-item-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title v-text="item.title" />
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => []
    },
    clipped: Boolean,
    miniVariant: {
      type: Boolean,
      default: () => false
    },
    isDark: Boolean
  },
  data() {
    return {
      drawer: null,
      image_logo: require('~/assets/img/logo_800.png')
    }
  }
}
</script>
