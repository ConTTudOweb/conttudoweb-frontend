<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <v-row align="center" justify="center">
        <div class="section-header text-center mb-12">
          <div class="text-uppercase caption mb-4 grey--text text--darken-2">
            Bem vindo!
          </div>
          <h2 class="display-1 font-weight-light">
            Criamos <strong>softwares</strong> para que você ofereça <strong>soluções para seus clientes</strong>.
          </h2>
          <v-divider class="my-3 mx-auto"></v-divider>
          <p class="title font-weight-light mx-auto" style="max-width: 700px;">
            Trabalhamos com a criação de sistemas modernos e funcionais. Sabemos
            que o mais importante no mundo atual é trazer soluções rápidas e
            descomplicadas sem perder a qualidade que você merece!
          </p>
        </div>
        <v-col cols="9" sm="6" md="4">
          <img src="@/assets/img/welcome-monitor.png" width="100%" contain />
        </v-col>
      </v-row>
    </v-flex>
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
