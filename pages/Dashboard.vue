<template>
  <v-container
    id="dashboard"
    fluid
    tag="section"
  >
    <base-v-component
      :heading="`Olá ${this.$auth.user.first_name}.`"
    />
  </v-container>
</template>

<script>
export default {
  name: "Dashboard",
  layout: 'Admin',
  auth: true,
  head() {
    return {
      title: this.$t('menu.dashboard')
    }
  }
}
</script>
