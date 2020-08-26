<template>
    <v-main>
    <nuxt />

    <dashboard-core-footer />
  </v-main>
</template>

<script>
  export default {
    name: 'DashboardCoreView',

    components: {
      DashboardCoreFooter: () => import('./Footer'),
    },
  }
</script>
