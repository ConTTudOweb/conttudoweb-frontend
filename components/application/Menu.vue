<template>
  <v-navigation-drawer
    v-model="drawer"
    :mini-variant="miniVariant"
    :clipped="clipped"
    fixed
    app
    :dark="isDark"
  >
    <v-list nav dense class="py-0">
      <div v-if="!clipped">
        <v-list-item two-line>
          <v-list-item-content>
            <img src="@/assets/img/logo_800.png" contain width="100%" />
          </v-list-item-content>
        </v-list-item>
        <v-divider :inset="false" class="py-1"></v-divider>
      </div>
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
      drawer: null
    }
  }
}
</script>
