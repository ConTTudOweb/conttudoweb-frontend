<template>
  <v-img
    :src="require('@/assets/img/laptop-3174729_1920.jpg')"
    gradient="to top left, rgba(234,234,234,.99), rgba(173,173,173,.7)"
    aspect-ratio="16/9"
  >
    <v-container>
      <v-layout column justify-center align-center class="px-4">
        <v-flex xs12 sm8 md6>
          <v-row align="center" justify="center">
            <div class="section-header text-center mb-12">
              <div class="text-uppercase caption mb-4 grey--text text--darken-2 font-weight-black">
                Bem vindo!
              </div>
              <span class="display-1 font-weight-medium">
                A <strong>solução</strong> que você precisa<br>
                está a um <strong>software</strong> de distância!
<!--                Criamos <strong>softwares</strong> para que você ofereça <strong>soluções para seus clientes</strong>.-->
              </span>
              <v-divider class="my-3 mx-auto"></v-divider>
              <p class="title font-weight-regular mx-auto" style="max-width: 700px;">
                Trabalhamos com a criação de sistemas modernos e funcionais. Sabemos
                que o mais importante no mundo atual é trazer soluções rápidas e
                descomplicadas sem perder a qualidade que você merece!
              </p>
            </div>
          </v-row>
          <v-row align="center" justify="space-around">
            <v-col cols="9" sm="6" md="4">
              <img src="@/assets/img/welcome-monitor.png" width="100%" contain />
            </v-col>
          </v-row>
          <v-divider class="my-3 mx-auto"></v-divider>
          <section>
            <v-row align="center" justify="center">
              <v-col cols="12" align="center">
                <p class="display-2">Conheça nossos serviços</p>
              </v-col>
              <v-col cols="12" sm="6" md="4" lg="3">
                <v-card>
                  <v-card-title>Sistemas web</v-card-title>
                  <v-card-subtitle>Feitos sob medida!</v-card-subtitle>
                  <v-card-text>Todos os softwares são desenvolvidos com base nas reais necessidade do cliente.
                    Respeitando sempre os mais modernos padrões de projeto e garantindo a manutenção do sistema ao longo do tempo!</v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" sm="6" md="4" lg="3">
                <v-card>
                  <v-card-title>Sistemas web</v-card-title>
                  <v-card-subtitle>Feitos sob medida!</v-card-subtitle>
                  <v-card-text>Todos os softwares são desenvolvidos com base nas reais necessidade do cliente.
                    Respeitando sempre os mais modernos padrões de projeto e garantindo a manutenção do sistema ao longo do tempo!</v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" sm="6" md="4" lg="3">
                <v-card>
                  <v-card-title>Sistemas web</v-card-title>
                  <v-card-subtitle>Feitos sob medida!</v-card-subtitle>
                  <v-card-text>Todos os softwares são desenvolvidos com base nas reais necessidade do cliente.
                    Respeitando sempre os mais modernos padrões de projeto e garantindo a manutenção do sistema ao longo do tempo!</v-card-text>
                </v-card>
              </v-col>
              <v-col cols="12" sm="6" md="4" lg="3">
                <v-card>
                  <v-card-title>Sistemas web</v-card-title>
                  <v-card-subtitle>Feitos sob medida!</v-card-subtitle>
                  <v-card-text>Todos os softwares são desenvolvidos com base nas reais necessidade do cliente.
                    Respeitando sempre os mais modernos padrões de projeto e garantindo a manutenção do sistema ao longo do tempo!</v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </section>
        </v-flex>
      </v-layout>
    </v-container>
  </v-img>
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
