<template>
  <v-layout column justify-center align-center>
    Olá!!!
  </v-layout>
</template>

<script>
export default {
  layout: 'public',
  auth: 'guest',
  middleware({ store, redirect }) {
    if (store.state.subDomain) {
      return redirect('/dashboard')
    }
  }
}
</script>
